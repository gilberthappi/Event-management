import React from "react";
import Modal from "react-modal";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const UserModal = ({ isOpen, closeModal, book }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Booking Details Modal"
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 9999,
        },
        content: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "700px",
          width: "90%",
          height: "95%",
          overflowY: "auto",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          background: "white",
          padding: "20px",
        },
      }}
    >
      <div>
        <img
          src={book.event.backdropImage}
          alt={book.event.title}
          style={{ width: "100%", height: "50%", marginBottom: "10px" }}
        />
        <h2>{book.event.title}</h2>
        <p>{book.event.description}</p>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <p>
            <FaCalendarAlt /> {book.event.date}
          </p>
          <p>
            <FaLocationDot /> {book.event.location}
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Price: {book.event.price}$</p>
          <p>Tickets Available: {book.event.ticketsAvailable}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Date of Booking: {new Date(book.Date).toLocaleString()}</p>
          <p>Number of Tickets: {book.numberOfTickets}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Payment Method: {book.paymentMethod}</p>
          <p>Status: {book.Status}</p>
        </div>
        <div>
          <p>Booked by: {book.user.fullNames}</p>
          <p>Email: {book.user.email}</p>
          <p>Phone Number: {book.user.phoneNumber}</p>
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

export default UserModal;
