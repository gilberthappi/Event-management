import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardNav from "./dashboardNav";
import Notiflix from "notiflix";
import { FaEye, FaRegTrashAlt, FaEdit, FaCalendarAlt,  FaTimes  } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import BookModal from "./BookDetailsModal";

import "../style/dashboard.css";

function Book() {
  const [formData, setFormData] = useState({
    numberOfTickets: "",
    paymentMethod: "",
  });

  const [bookings, setBookings] = useState([]);
  const [editBookId, setEditBookId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, backdropImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("numberOfTickets", formData.numberOfTickets);
      formDataToSend.append("paymentMethod", formData.paymentMethod);
  
      // Update the booking using PUT request
      await axios.put(`https://event-management-api-svlr.onrender.com/api/v1/booking/${editBookId}`, formDataToSend);
      Notiflix.Notify.success("BOOKING UPDATED SUCCESSFULLY");
  
      // Update the bookings state with the updated booking details
      const updatedBookings = bookings.map(book => {
        if (book._id === editBookId) {
          return {
            ...book,
            numberOfTickets: formData.numberOfTickets,
            paymentMethod: formData.paymentMethod
            // Add other fields you want to update
          };
        }
        return book;
      });
      setBookings(updatedBookings);
  
      setFormData({
        numberOfTickets: "",
        paymentMethod: "",
      });
      setEditBookId(null);
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating Booking. Please try again later.");
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://event-management-api-svlr.onrender.com/api/v1/booking/all");
        setBookings(response.data); // Assuming the response directly contains the array of bookings
        setLoading(false); // Set loading to false after successful data retrieval
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Error fetching bookings. Please try again later."); // Set error message if there's an error
        setLoading(false); // Set loading to false even if there's an error
      }
    };
  
    fetchData(); // Call fetchData function
  }, []);
  

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`https://event-management-api-svlr.onrender.com/api/v1/booking/${bookId}`);
      Notiflix.Notify.success("BOOK DELETED SUCCESSFULLY");
      // Update the bookings state by removing the deleted booking
      setBookings(prevBookings => prevBookings.filter(book => book._id !== bookId));
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting Booking. Please try again later.");
    }
  };
  const handleEditBook = (book) => {
    setEditBookId(book._id);
    setFormData({
        numberOfTickets: book.numberOfTickets,
        paymentMethod: book.paymentMethod,

    });
    window.scrollTo(0, 0);
  };

  const openModal = async (book) => {
    try {
      const response = await axios.get(`https://event-management-api-svlr.onrender.com/api/v1/booking/${book._id}`);
      setSelectedBook(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching Booking details:", error);
      alert("Error fetching Booking details. Please try again later.");
    }
  };

// Function to handle the cancelation of the booking
const handleCancelBooking = async (bookId) => {
    try {
      // Send a PUT request to update the booking status to "canceled"
      await axios.put(`https://event-management-api-svlr.onrender.com/api/v1/booking/${bookId}`, { Status: "canceled" });
      Notiflix.Notify.success("BOOKING CANCELED SUCCESSFULLY");
  
      // Update the bookings state with the updated booking status
      const updatedBookings = bookings.map(book => {
        if (book._id === bookId) {
          return {
            ...book,
            Status: "canceled"
          };
        }
        return book;
      });
      setBookings(updatedBookings);
    } catch (error) {
      console.error("Error:", error);
      alert("Error canceling Booking. Please try again later.");
    }
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    marginRight: "8px",
  };

  const EditButtonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    marginRight: "8px",
  };

  const deleteButtonStyle = {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  };


  return (
    <main className="dashboard">
      <DashboardNav />
      <div className="main-content" style={{ marginLeft: "250px" }}>
        <div className="container">
          <div className="header-nav" style={{ textAlign: "center" }}>
            <div className="row">
              <div className="user-greeting">
                <h3 className="h3-title">
                  <span className="username">Bookings Management</span>
                </h3>
              </div>
            </div>
          </div>

          <div className="dashboard-content">
            <div className="row">
              <div className="edit-tour">
                <h2 style={{ fontSize: "24px", textAlign: "center" }}>
                  {editBookId ? "Edit Book" : "Create New Book"}
                </h2>
                <form
                  className="edit-tour-form"
                  onSubmit={handleSubmit}
                  style={{ maxWidth: "400px", margin: "0 auto" }}
                >
                  {/* Form fields */}
                  {/* numberOfTickets */}
                  <div className="col-12" style={{ marginBottom: "7px", display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: "15px", marginBottom: "5px" }}>Number of ticket:</label>
                    <input
                      type="text"
                      name="numberOfTickets"
                      value={formData.numberOfTickets}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", padding: "8px", fontSize: "15px", boxSizing: "border-box" }}
                    />
                  </div>
                  {/* paymentMethod */}
                  <div className="col-12" style={{ marginBottom: "7px", display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: "15px", marginBottom: "5px" }}>Payment Method:</label>
                    <input
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", padding: "8px", fontSize: "15px", boxSizing: "border-box" }}
                    />
                  </div>
                  {/* Submit Button */}
                  <div className="col-12">
                    <div className="edit-tour-btn">
                      <button type="submit" className="btn confirm-btn">
                        {editBookId ? "Update" : "Confirm"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              {/* Bookings List */}
<div className="side-content1">
  <div className="side-content-row">
    <div className="friend">
      <div className="container">
        <div className="sec-title">
          <h4 className="h4-title">Bookings</h4>
        </div>
        <div className="friend-list">
          <ul>
            {bookings.length > 0 ? (
              bookings.map((book) => (
                <div className="friend-box1" key={book._id}>
                  <li>
                    <div>
                      <img src={book.backdropImage} alt={book.title} style={{ width: "100%" }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "24px", textAlign: "center", marginBottom: "8px" }}>{book.title}</h3>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <h2 className="h4-title" style={{ textTransform: "uppercase"}} ><i>⭐️{book.event.title}⭐️</i></h2>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>

                        <p>Status: {book.Status}</p>
                      </div>
                      <div>
                        <button style={buttonStyle} onClick={() => openModal(book)}>
                          <FaEye /> View
                        </button>
                        <button style={EditButtonStyle} onClick={() => handleEditBook(book)}><FaEdit /> Edit</button>
                        <button style={deleteButtonStyle} onClick={() => handleDeleteBook(book._id)}><FaRegTrashAlt /> Delete</button>
                        <button style={deleteButtonStyle} onClick={() => handleCancelBooking(book._id)}><FaTimes/>Cancel</button>
                      </div>
                    </div>
                  </li>
                </div>
              ))
            ) : (
              <p>No Bookings available</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

            </div>
          </div>
        </div>
      </div>
      {selectedBook && (
        <BookModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} book={selectedBook} />
      )}
    </main>
  );
}

export default Book;