import {
  UPDATE_CHAT_HISTORY,
  UPDATE_CHATS_STATUS,
  UPDATE_CURRENT_CHAT_HISTORY
} from "../constants/chatConstants";

export const initialState = {
  chatHistory: [],
  chatsStatus: [],
  currentChatHistory: [],
  totalMessages: 0,
};

const chatState = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CHAT_HISTORY:
      return { ...state, chatHistory: action.chatHistory };
    case UPDATE_CHATS_STATUS:
      return {
        ...state,
        chatsStatus: action.chatsStatus,
        totalMessages: action.totalMessages
      };
    case UPDATE_CURRENT_CHAT_HISTORY:
      return { ...state, currentChatHistory: action.currentChatHistory };
    default:
      return state
  }
};

export default chatState