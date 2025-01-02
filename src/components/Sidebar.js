import React from "react";
import { Col, Row } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import useChatContext from "../hooks/useChatContext";

const Sidebar = ({ toggleSidebar }) => {
  const { addNewChat } = useChatContext();

  function handleNewChatClick() {
    addNewChat();
  }

  return (
    <Row>
      <Col className="p-0" xs={12}>
        <div
          onClick={toggleSidebar}
          className="overlay d-md-none d-block bg-dark position-absolute top-0 left-0"
        ></div>
        <Col xs={9} md={12} className="p-0 sidebar">
          <Row>
            <Col xs={12}>
              <Link onClick={handleNewChatClick} to="/">
                <h5>
                  New Chat <FaRegEdit />
                </h5>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="prev-conv">
                <Link to={"/history"}>Past Conversation</Link>
              </div>
            </Col>
          </Row>
        </Col>
      </Col>
    </Row>
  );
};

export default Sidebar;
