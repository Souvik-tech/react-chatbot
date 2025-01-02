import React from "react";
import ChatCard from "./ChatCard";
import { Col, Row } from "react-bootstrap";

const InitialChat = ({ chat }) => {
  if (chat?.messages.length === 0) {
    return (
      <div className="emty-msg-scr">
        <Row className="justify-content-center top">
          <Col md={12}>
            <h3>How can I help you</h3>
          </Col>
          <Col className="dp-lg" md={12}>
            <img src={"/ai.png"} alt="ai" />
          </Col>
        </Row>
        <Row className="prmt-cont justify-content-center">
          <Col className="demo-prmt" md={5}>
            <h5>What is the weather today</h5>
            <p>Get Immediate AI generated response</p>
          </Col>
          <Col className="demo-prmt" md={5}>
            <h5>What is the weather today</h5>
            <p>Get Immediate AI generated response</p>
          </Col>
          <Col className="demo-prmt" md={5}>
            <h5>What is the weather today</h5>
            <p>Get Immediate AI generated response</p>
          </Col>
          <Col className="demo-prmt" md={5}>
            <h5>What is the weather today</h5>
            <p>Get Immediate AI generated response</p>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div>
      {chat?.messages.map((msg, idx) => {
        if (idx === chat.messages.length - 1)
          return (
            <ChatCard
              key={chat.messages.id}
              msg={msg}
              feedback={chat.feedback}
              rating={chat.rating}
              isLast={true}
            />
          );
        else
          return (
            <ChatCard
              key={chat.messages.id}
              msg={msg}
              feedback={null}
              rating={null}
              isLast={false}
            />
          );
      })}
    </div>
  );
};

export default InitialChat;
