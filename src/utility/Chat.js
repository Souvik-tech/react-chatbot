export function Chat(id, date) {
  this.id = id;
  this.date = date;
  this.messages = [];
  this.rating = 0;
  this.feedback = "";

  this.copyChats = (messages) => {
    this.messages = messages.map((msg, idx) => {
      return {
        id: Date.now().toString(36) + idx,
        sender: msg.sender,
        text: msg.text,
        timestamp: msg.timestamp
      };
    });
  };

}
