import socketIOClient from "socket.io-client";

function Socket(userId) {
  this.socket = socketIOClient(process.env.REACT_APP_API_CHAT_URL, {
    transportOptions: {
      polling: {
        extraHeaders: {
          'x-id': userId,
        }
      }
    }
  });
}

export default Socket;