import React, { useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { GrLike, GrDislike } from "react-icons/gr";
import { Rating } from "react-simple-star-rating";
import FeedbackModal from "./FeedbackModal";
import useChatContext from "../hooks/useChatContext";
import { formatTime, toastInfo } from "../utility/utils";

function ChatCard({ msg, feedback, rating, readonly, isLast }) {
  const [showRating, setShowRating] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const feedbackRef = useRef();
  const { addRating, addFeedback } = useChatContext();

  function handleLike() {
    if (readonly) return;
    setShowRating(true);
  }
  function handleDislike() {
    if (readonly) return;
    setShowFeedback(true);
  }

  function handleFeedbackSubmit() {
    const feedback = feedbackRef.current.value;
    console.log();
    addFeedback(feedback);
    setShowFeedback(false);
    toastInfo("Feedback added!");
  }

  function handleRating(rate) {
    addRating(rate);
    toastInfo("Rating added!");
  }

  return (
    <Row className="chat-card" key={msg.id}>
      <Col className="dp" md={4}>
        <img src={msg.sender === "You" ? "/user.jpg" : "/ai.png"} alt="dp" />
      </Col>
      <Col md={8}>
        <Row>
          <Col className="msg-sender">
            <p>{msg.sender}</p>
          </Col>
        </Row>
        <Row>
          <Col className="msg-txt">
            <p>{msg.text}</p>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="msg-time">
            <p>{formatTime(msg.timestamp)}</p>
          </Col>
          {msg.sender !== "You" && isLast && !readonly ? (
            <Col md={8} class="msg-like">
              <GrLike onClick={handleLike} cursor={"pointer"} className="m-2" />
              <GrDislike
                onClick={handleDislike}
                cursor={"pointer"}
                className="m-2"
              />
            </Col>
          ) : (
            <></>
          )}
        </Row>
        {(showRating || (readonly && rating > 0)) && (
          <Row>
            <Rating
              emptyColor="white"
              readonly={readonly}
              onClick={handleRating}
              size={30}
              initialValue={rating}
            />
          </Row>
        )}
      </Col>
      <Row className="msg-feedback">
        {feedback ? (
          <p className="px-4 py-4">
            <b>Feedback:</b> feedback
          </p>
        ) : (
          <></>
        )}
      </Row>
      <FeedbackModal
        onHide={() => {
          setShowFeedback(false);
        }}
        show={showFeedback}
        feedbackRef={feedbackRef}
        onSubmit={handleFeedbackSubmit}
      />
    </Row>
  );
}

export default ChatCard;
