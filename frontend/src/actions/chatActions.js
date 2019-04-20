import {
  UPDATE_CHAT_HISTORY,
  UPDATE_CHATS_STATUS,
  UPDATE_CURRENT_COMPANION
} from "../constants/chatConstants";

export const updateChatHistory = (chatHistory, currentChatHistory) => {
  return {
    type: UPDATE_CHAT_HISTORY,
    chatHistory,
    currentChatHistory
  }
};

export const updateChatsStatus = (chatsStatus, totalMessages) => {
  return {
    type: UPDATE_CHATS_STATUS,
    chatsStatus,
    totalMessages
  }
};

export const updateCurrentCompanion = (currentCompanion) => {
  return {
    type: UPDATE_CURRENT_COMPANION,
    currentCompanion
  }
};
