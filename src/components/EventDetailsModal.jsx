import React from "react";
import Modal from "react-modal";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const EventModal = ({ isOpen, closeModal, event }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Event Details Modal"
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
          zIndex: 9999, // ensure modal is displayed over everything
        },
        content: {
          position: "absolute",
          top: "50%", // adjust the vertical position
          left: "50%", // adjust the horizontal position
          transform: "translate(-50%, -50%)",
          maxWidth: "700px",
          width: "90%",
          height: "95%", // increase the height
          overflowY: "auto", // enable scrolling if content overflows
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // shadow effect
          background: "white",
          padding: "20px",
        },
      }}
    >
      <div>
        <img
          src={event.backdropImage}
          alt={event.title}
          style={{ width: "100%", height: "50%", marginBottom: "10px" }}
        />
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <p>
            <FaCalendarAlt /> {event.date}
          </p>
          <p>
            <FaLocationDot /> {event.location}
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Price: {event.price}$</p>
          <p>Ticket: {event.ticketsAvailable}</p>
        </div>
      </div>
      <div className="col-12">
        <div className="edit-tour-btn">
          <button className="btn confirm-btn" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EventModal;
