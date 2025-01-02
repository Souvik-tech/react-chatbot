import { Chat } from "./Chat";
import { formateDate } from "./utils";

export function reducer(state, action) {
  switch (action.type) {
    case "NEW_CHAT": {
      const { chatId } = action;
      const date = formateDate(chatId); //the chatId is a timestamp
      const chat = new Chat(chatId, date);
      return chat;
    }
    case "ADD_MSG": {
      const chat = new Chat(state.id, state.date);
      chat.copyChats([...state.messages, action.msg]);

      return chat;
    }
    case "ADD_RATE": {
      const chat = new Chat(state.id, state.date);
      chat.copyChats([...state.messages]);
      chat.rating = action.rating;
      chat.feedback = state.feedback;
      return chat;
    }

    case "ADD_FBACK": {
      const chat = new Chat(state.id, state.date);
      chat.copyChats([...state.messages]);
      chat.rating = state.rating;
      chat.feedback = action.feedback;
      return chat;
    }

    default:
      throw Error("Invalid type for the reducer function");
  }
}
