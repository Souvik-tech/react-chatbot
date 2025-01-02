import React, { useRef } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Row from 'react-bootstrap';

const Home = () => {
  const sidebarRef = useRef();

  function toggleSidebar() {
    sidebarRef.current.classList.toggle("d-none");
  }

  return (
    <div>
      <Container>
        <Row className="home">
          <Col
            ref={sidebarRef}
            xs={12}
            md={4}
            className="d-none d-md-block p-0"
          >
            <Sidebar toggleSidebar={toggleSidebar} />
          </Col>
          <Col className="p-0" xs={12} md={8}>
            <ChatWindow toggleSidebar={toggleSidebar} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
