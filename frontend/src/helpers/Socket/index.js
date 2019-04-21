import socketIOClient from "socket.io-client";

function Socket(token) {
  this.socket = socketIOClient(process.env.REACT_APP_API_CHAT_URL, {
    transportOptions: {
      polling: {
        extraHeaders: {
          'authorization': token.slice(6)
        }
      }
    }
  });
}

export default Socket;