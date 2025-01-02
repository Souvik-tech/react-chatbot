import React, { useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import useChatContext from "../hooks/useChatContext";
import sampleData from "../data/sampleData.json";

const ChatInput = () => {
  const { addNewMsg, handleSaveChat } = useChatContext();
  const msgRef = useRef();

  function findReply({ text }) {
    const data = sampleData.find(
      ({ question }) =>
        question.toLocaleLowerCase() === text.toLocaleLowerCase()
    );

    const DEFAULT_REPLY = "As a AI bot I don't know the answer.";
    const reply = {
      sender: "Soul AI",
      text: DEFAULT_REPLY,
      timestamp: Date.now(),
    };

    if (data) {
      reply.text = data.response;
    }

    return reply;
  }

  function handleAsk() {
    const msg = {
      text: msgRef.current.value,
      sender: "You",
      timestamp: Date.now(),
    };
    addNewMsg(msg);
    const reply = findReply(msg);
    addNewMsg(reply);
    msgRef.current.value = "";
  }
  return (
    <div className="chat-inputWrap">
      <Container>
        <Row>
          <Col className="d-flex px-1" xs={8} lg={9}>
            <input
              className="form-control w-100"
              ref={msgRef}
              type="text"
              placeholder="type your message here..."
            />
          </Col>
          <Col className="p-0" xs={2} lg={1}>
            <button className="btn btn-primary" onClick={handleAsk}>
              Ask
            </button>
          </Col>
          <Col className="p-0" xs={2} lg={1}>
            <button onClick={handleSaveChat} className="btn btn-primary">
              Save
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChatInput;
