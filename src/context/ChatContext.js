import { createContext, useEffect, useReducer, useState } from "react";
import { reducer } from "../utility/reducer";
import useLocalStorage from "../hooks/useLocalStorage";
import { Chat } from "../utility/Chat";
import { formateDate, toastInfo } from "../utility/utils";
import { toast, Bounce } from "react-toastify";

export const ChatContext = createContext([]);

function getEmptyChat() {
  const timestamp = Date.now();
  const date = formateDate(timestamp);
  const chat = new Chat(timestamp, date);

  return chat;
}

function ChatContextProvider({ children }) {
  const [localChatHistory, handleUpdateLocalChatHistory] =
    useLocalStorage("chat-history");
  const [localActiveChat, handleUpdateLocalActiveChat] =
    useLocalStorage("chat-active");
  const [chatHistory, setChatHistory] = useState(localChatHistory || []);
  const [activeChat, dispatch] = useReducer(
    reducer,
    localActiveChat || getEmptyChat()
  );
  const [savingHistory, setSavingHistory] = useState(false);

  function handleSaveChat() {
    setSavingHistory(true);
    //creating a deep copy of the chats
    const chat = new Chat(activeChat.id, activeChat.date);
    chat.copyChats(activeChat.messages);
    chat.rating = activeChat.rating;
    chat.feedback = activeChat.feedback;

    setChatHistory((prev) => [chat, ...prev]);
  }

  useEffect(() => {
    //guard to prevent to save the history in initial load
    if (!savingHistory) return;
    setSavingHistory(false);
    handleUpdateLocalChatHistory(chatHistory);

    toastInfo("Saved successfully!!");

  }, [chatHistory]);

  useEffect(() => {
    handleUpdateLocalActiveChat(activeChat);
  }, [activeChat]);

  function addNewChat() {
    const chatId = Date.now();
    dispatch({
      type: "NEW_CHAT",
      chatId,
    });
  }

  function addNewMsg(msg) {
    dispatch({
      type: "ADD_MSG",
      msg,
    });
  }

  function addRating(rating) {
    dispatch({
      type: "ADD_RATE",
      rating,
    });
  }

  function addFeedback(feedback) {
    dispatch({
      type: "ADD_FBACK",
      feedback,
    });
  }

  return (
    <ChatContext.Provider
      value={{
        chatHistory,
        addNewChat,
        addNewMsg,
        activeChat,
        addRating,
        addFeedback,
        setChatHistory,
        handleSaveChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContextProvider;
