import {
  UPDATE_CHAT_HISTORY,
  UPDATE_CHATS_STATUS,
  UPDATE_CURRENT_COMPANION,
  UPDATE_NEW_MESSAGES,
  UPDATE_READ_MESSAGES,
  CLEAR_CHAT,
  CLEAR_CHAT_HISTORY
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
      const messages = state.chatHistory.filter(item => item.id !== action.message.id);
      const newChatHistory = [...messages, action.message];
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
    case CLEAR_CHAT:
      return { ...initialState };
    case CLEAR_CHAT_HISTORY:
      return {
        ...state,
        chatHistory: initialState.chatHistory,
        currentChatHistory: initialState.currentChatHistory,
        currentCompanion: initialState.currentCompanion,
      };
    default:
      return state
  }
};

export default chatState