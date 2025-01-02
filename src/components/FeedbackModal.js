import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function FeedbackModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Provide Additional Feedback
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea className="w-100" ref={props.feedbackRef} rows={10}  />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onSubmit}>Submit Feedback</Button>
      </Modal.Footer>
    </Modal>
  );
}
