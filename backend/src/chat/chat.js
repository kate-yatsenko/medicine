const socketIo = require('socket.io');

const jwt = require('../utils/jwt');
const services = require('../services');

function getCustomIdGenerator(io) {
  return req => {
    if (!req.headers.authorization) return 0;

    let id = null;
    try {
      ({ id } = jwt.verify(req.headers.authorization));
    } catch (err) {
      // TODO: error to logger
      console.error(err);
    }

    if (io.sockets.connected[id]) {
      io.sockets.connected[id].disconnect(true);
    }

    return id;
  };
}

function validateIds(socket, next) {
  if (!socket.request.headers.cookie) {
    return next(new Error('Authentication error'));
  }

  const { authorization } = socket.handshake.headers;
  let id = null;
  try {
    ({ id } = jwt.verify(authorization));
    if (id !== socket.id) throw new Error('Authentication error');
  } catch (err) {
    // TODO: error to logger
    console.error(err);
    return next(err);
  }
  return next();
}

function onMessage(io, socket) {
  return async ({ message, id }) => {
    const receiver = id;
    const sender = socket.id;

    io.to(sender).emit('processing', message);

    let meta = {};
    try {
      meta = await services.createMessage({ sender, receiver, message });
    } catch (err) {
      // TODO: add to logger
      console.error(err);
      io.to(sender).emit('error', 'Cannot create message :(');
    }

    io.to(sender).send(message, meta);

    if (io.sockets.connected[receiver]) {
      io.to(receiver).send(message, meta);
    }
  };
}

function onConnection(io) {
  return async socket => {
    socket.on('read', async ids => {
      const { id: receiver } = socket;
      let rows = null;
      try {
        rows = await services.markMessagesAsRead({ ids, receiver });
      } catch (err) {
        // TODO: add to logger
        console.error(err);
        io.to(receiver).emit('error', 'Cannot mark messages as read');
      }

      const emits = rows.reduce((acc, row) => {
        if (acc[row.sender]) {
          acc[row.sender].push(row.id);
        } else {
          acc[row.sender] = [row.id];
        }
        return acc;
      }, {});

      Object.keys(emits).forEach(sndr => {
        io.to(sndr).emit('read', emits[sndr]);
      });
    });

    socket.on('status', async () => {
      const { id } = socket;
      const status = await services.getChatStatus({ id });
      const total = status.reduce((sum, stat) => {
        // eslint-disable-next-line no-bitwise
        return sum + ~~stat.unread;
      }, 0);

      io.to(id).emit('status', { total, bySender: status });
    });

    socket.on('history', async id => {
      const { id: sender } = socket;
      const receiver = id;
      const messages = await services.getMessages({
        receiver,
        sender,
      });
      io.to(sender).emit('history', messages);
    });

    socket.on('message', onMessage(io, socket));

    // socket.on('disconnect', () => {});
  };
}

function attach(server) {
  const io = socketIo(server, {
    // CORS fun
    handlePreflightRequest: (req, res) => {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
      res.setHeader('Access-Control-Request-Method', '*');
      res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      res.setHeader('Access-Control-Allow-Headers', 'authorization');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      if (req.method === 'OPTIONS' || req.method === 'GET') {
        res.writeHead(200);
        res.end();
      }
    },
  });

  io.engine.generateId = getCustomIdGenerator(io);
  io.use(validateIds);
  io.on('connection', onConnection(io));

  return server;
}

module.exports = {
  attach,
};
