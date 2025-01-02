import React, { useEffect, useRef, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import ChatCard from "../components/ChatCard";
import Sidebar from "../components/Sidebar";
import { RiMenuFill } from "react-icons/ri";
import { getRelativeDate } from "../utility/utils";
import useChatContext from "../hooks/useChatContext";

function History() {
  const { chatHistory } = useChatContext();
  const sidebarRef = useRef();
  const [filterStar, setFilterStar] = useState(0);
  function toggleSidebar() {
    sidebarRef.current.classList.toggle("d-none");
  }

  function handleChange(e) {
    console.log(e.target.value);
    setFilterStar(parseInt(e.target.value));
  }

  return (
    <Container>
      <Row className="history">
        <Col ref={sidebarRef} xs={12} md={4} className="d-none d-md-block p-0">
          <Sidebar toggleSidebar={toggleSidebar} />
        </Col>
        <Col className="past-chat" xs={12} md={8}>
          <header className="d-flex gap-2">
            <RiMenuFill
              onClick={toggleSidebar}
              size={30}
              className="d-block d-md-none"
            />
            <h4>Conversation History</h4>
          </header>
          <Col md={12}>
            <select onChange={handleChange}>
              <option value={0}>All</option>
              <option value={1}>1 Star</option>
              <option value={2}>2 Star</option>
              <option value={3}>3 Star</option>
              <option value={4}>4 Star</option>
              <option value={5}>5 Star</option>
            </select>
            {chatHistory
              .filter((chat) => chat.rating === filterStar || !filterStar)
              .map((chat) => (
                <div>
                  <div>{getRelativeDate(chat.date)}</div>
                  {chat?.messages.map((msg, idx) => {
                    if (idx === chat.messages.length - 1)
                      return (
                        <ChatCard
                          key={chat.messages.id}
                          msg={msg}
                          feedback={chat.feedback}
                          rating={chat.rating}
                          readonly={true}
                        />
                      );
                    else
                      return (
                        <ChatCard
                          key={chat.messages.id}
                          msg={msg}
                          feedback={null}
                          rating={null}
                          readonly={true}
                        />
                      );
                  })}
                </div>
              ))}
          </Col>
        </Col>
      </Row>
    </Container>
  );
}

export default History;
