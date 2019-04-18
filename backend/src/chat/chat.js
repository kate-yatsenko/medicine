const socketIo = require('socket.io');

const services = require('../services');

const { validator } = services;

function getCustomIdGenerator(io) {
  return req => {
    if (!req.headers['x-id']) return 0;

    const id = validator.checkId(req.headers['x-id']);
    if (io.sockets.connected[id]) {
      io.sockets.connected[id].disconnect(true);
    }

    return id;
  };
}

function validateIds(socket, next) {
  // TODO: authorization
  if (!socket.request.headers.cookie) {
    return next(new Error('Authentication error'));
  }

  const { headers } = socket.handshake;
  try {
    validator.checkId(headers['x-to-id']);
    validator.checkId(headers['x-id']);
  } catch (err) {
    // TODO: add to logger
    console.error(`Chat: ${err.message}`);
    return next(err);
  }
  return next();
}

function onMessage(io, socket) {
  return async message => {
    const receiver = socket.request.headers['x-to-id'];
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
    const { headers } = socket.handshake;

    socket.on('read', async ids => {
      io.emit('read', await services.markMessagesAsRead(ids));
    });

    const messages = await services.getMessages({
      receiver: socket.id,
      sender: headers['x-to-id'],
    });

    io.to(socket.id).emit('history', messages);

    socket.on('message', onMessage(io, socket));

    socket.on('disconnect', () => {
      io.to(socket.handshake.headers['x-to-id']).emit('offline', socket.id);
    });
  };
}

function attach(server) {
  const io = socketIo(server);

  io.engine.generateId = getCustomIdGenerator(io);
  io.use(validateIds);
  io.on('connection', onConnection(io));

  return server;
}

module.exports = {
  attach,
};
