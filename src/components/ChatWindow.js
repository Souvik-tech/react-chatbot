import React, { useEffect, useMemo } from "react";
import InitialChat from "./InitialChat";
import ChatInput from "./ChatInput";
import useChatContext from "../hooks/useChatContext";
import { RiMenuFill } from "react-icons/ri";

const ChatWindow = ({ toggleSidebar }) => {
  const { activeChat } = useChatContext();

  return (
    <div className="chat-window">
      <header className="d-flex gap-2">
        <RiMenuFill
          onClick={toggleSidebar}
          size={30}
          className="d-block d-md-none"
        />
        <h4>Bot AI</h4>
      </header>
      <div className="chatwrap">

        <InitialChat chat={activeChat} />
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatWindow;
