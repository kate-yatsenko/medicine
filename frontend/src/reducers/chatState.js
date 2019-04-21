import {
  UPDATE_CHAT_HISTORY,
  UPDATE_CHATS_STATUS,
  UPDATE_CURRENT_COMPANION,
  UPDATE_NEW_MESSAGES,
  UPDATE_READ_MESSAGES
} from "../constants/chatConstants";

export const initialState = {
  chatHistory: [],
  chatsStatus: [],
  currentChatHistory: [],
  totalMessages: 0,
  currentCompanion: null,
};

const chatState = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CHAT_HISTORY:
      return {
        ...state,
        chatHistory: action.chatHistory,
        currentChatHistory: action.currentChatHistory
      };
    case UPDATE_CHATS_STATUS:
      return {
        ...state,
        chatsStatus: action.chatsStatus,
        totalMessages: action.totalMessages
      };
    case UPDATE_CURRENT_COMPANION:
      return { ...state, currentCompanion: action.currentCompanion };
    case UPDATE_NEW_MESSAGES:
      const newChatHistory = [...state.chatHistory, action.message];
      return {
        ...state,
        chatHistory: newChatHistory,
        currentChatHistory: newChatHistory.slice(-100),
      };
    case UPDATE_READ_MESSAGES:
      const updateChatHistory = state.chatHistory.map(item => {
        return {
          ...item,
          isRead: action.messages.includes(item.id) ? true : item.isRead
        };
      });

      return {
        ...state,
        chatHistory: updateChatHistory,
        currentChatHistory: updateChatHistory.slice(-100),
      };
    default:
      return state
  }
};

export default chatState