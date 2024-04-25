import React from "react";
import { Modal, Button } from "react-bootstrap";

const EventDetailsModal = ({ show, onHide, event }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{event.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <img src={event.backdropImage} alt={event.title} style={{ width: "100%" }} />
        </div>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Price:</strong> {event.price}</p>
        <p><strong>Ticket Availability:</strong> {event.ticketsAvailable}</p>
        {/* Add more event details here as needed */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventDetailsModal;
