import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardNav from "./dashboardNav";
import Notiflix from "notiflix";
import { FaEye, FaRegTrashAlt, FaEdit, FaCalendarAlt, FaLocationDot } from "react-icons/fa";
import EventDetailsModal from "./EventDetailsModal"; // Import EventDetailsModal component
import "../style/dashboard.css";

function Event({ handleViewEvent }) { // Pass handleViewEvent function as prop
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    backdropImage: null,
    price: "",
    ticketsAvailable: "",
  });

  const [events, setEvents] = useState([]);
  const [editEventId, setEditEventId] = useState(null); // State to hold the ID of the event being edited

  // State and functions for EventDetailsModal
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("backdropImage", formData.backdropImage);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("ticketsAvailable", formData.ticketsAvailable);

      if (editEventId) {
        // If an event is being edited, update it
        await axios.put(`http://localhost:100/api/v1/event/update?fieldName=_id&value=${editEventId}`, formDataToSend);
        Notiflix.Notify.success("EVENT UPDATED SUCCESSFULLY");
      } else {
        // If not, create a new event
        await axios.post("http://localhost:100/api/v1/event/addNew", formDataToSend);
        Notiflix.Notify.success("EVENT CREATED SUCCESSFULLY");
      }
      // Clear the form after submission
      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        backdropImage: null,
        price: "",
        ticketsAvailable: "",
      });
      // Reset editEventId after submission
      setEditEventId(null);
      // Update the events list
      const response = await axios.get("http://localhost:100/api/v1/event/all");
      setEvents(response.data.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:100/api/v1/event/all"
        );
        setEvents(response.data.data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    // Fetch data on component mount
    fetchData();
  }, []);

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:100/api/v1/event/delete?fieldName=_id&value=${eventId}`);
      Notiflix.Notify.success("EVENT DELETED SUCCESSFULLY");
      // After deletion, update the events list
      const response = await axios.get("http://localhost:100/api/v1/event/all");
      setEvents(response.data.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting event. Please try again later.");
    }
  };

  const handleEditEvent = (event) => {
    // Set the state to the ID of the event being edited
    setEditEventId(event._id);
    // Populate the form fields with the event's data
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      price: event.price,
      ticketsAvailable: event.ticketsAvailable,
    });
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
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

  const editButtonStyle = {
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
                  <span className="username">Event Management</span>
                </h3>
              </div>
            </div>
          </div>

          <div className="dashboard-content">
            <div className="row">
              <div className="edit-tour">
                <h2 style={{ fontSize: "24px", textAlign: "center" }}>
                  {editEventId ? "Edit Event" : "Create New Event"}
                </h2>
                <form
                  className="edit-tour-form"
                  onSubmit={handleSubmit}
                  style={{ maxWidth: "400px", margin: "0 auto" }}
                >
                  {/* Form fields */}
                  {/* Title */}
                  <div className="col-12" style={{ marginBottom: "7px", display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: "15px", marginBottom: "5px" }}>Title:</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", padding: "8px", fontSize: "15px", boxSizing: "border-box" }}
                    />
                  </div>
                  {/* Description */}
                  <div className="col-12" style={{ marginBottom: "7px", display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: "15px", marginBottom: "5px" }}>Description:</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", padding: "8px", fontSize: "15px", boxSizing: "border-box" }}
                    />
                  </div>
                  {/* Date */}
                  <div className="col-12" style={{ marginBottom: "7px", display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: "15px", marginBottom: "5px" }}>Date:</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", padding: "8px", fontSize: "15px", boxSizing: "border-box" }}
                    />
                  </div>
                  {/* Location */}
                  <div className="col-12" style={{ marginBottom: "7px", display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: "15px", marginBottom: "5px" }}>Location:</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", padding: "8px", fontSize: "15px", boxSizing: "border-box" }}
                    />
                  </div>
                  {/* Price */}
                  <div className="col-12" style={{ marginBottom: "7px", display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: "15px", marginBottom: "5px" }}>Price:</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", padding: "8px", fontSize: "15px", boxSizing: "border-box" }}
                    />
                  </div>
                  {/* Ticket Availability */}
                  <div className="col-12" style={{ marginBottom: "7px", display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: "15px", marginBottom: "5px" }}>Ticket Availability:</label>
                    <select
                      name="ticketsAvailable"
                      value={formData.ticketsAvailable}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", padding: "8px", fontSize: "15px", boxSizing: "border-box" }}
                    >
                      <option value="">Select availability</option>
                      <option value="Available">Available</option>
                      <option value="Sold Out">Sold Out</option>
                      <option value="Not Available">Not Available</option>
                      <option value="Free">Free</option>
                    </select>
                  </div>
                  {/* Photo */}
                  <div className="col-12" style={{ marginBottom: "7px", display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: "15px", marginBottom: "5px" }}>Photo:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                      style={{ width: "100%", padding: "8px", fontSize: "15px", boxSizing: "border-box" }}
                    />
                  </div>
                  {/* Submit Button */}
                  <div className="col-12">
                    <div className="edit-tour-btn">
                      <button type="submit" className="btn confirm-btn">
                        {editEventId ? "Update" : "Confirm"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              
              {/* Events List */}
              <div className="side-content1">
                <div className="side-content-row">
                  <div className="friend">
                    <div className="container">
                      <div className="sec-title">
                        <h4 className="h4-title">Events</h4>
                      </div>
                      <div className="friend-list">
                        <ul>
                          {events.length > 0 ? (
                            events.map((event) => (
                              <div className="friend-box" key={event._id}>
                                <li>
                                  <div>
                                    <img src={event.backdropImage} alt={event.title} style={{ width: "100%" }} />
                                  </div>
                                  <div>
                                    <h3 style={{ fontSize: "24px", textAlign: "center", marginBottom: "8px" }}>{event.title}</h3>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                      <p><FaCalendarAlt />{event.date}</p>
                                      <p> <FaLocationDot />{event.location}</p>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                      <p>Price: {event.price}$</p>
                                      <p>Ticket: {event.ticketsAvailable}</p>
                                    </div>
                                    {/* Buttons */}
                                    <div>
                                      {/* View button */}
                                      <button style={buttonStyle} onClick={() => {
                                        handleViewEvent(event); // Call handleViewEvent function with the event
                                        setShowModal(true); // Open the modal
                                        setSelectedEvent(event); // Set the selected event for the modal
                                      }}><FaEye /> View</button>
                                      {/* Edit button */}
                                      <button style={editButtonStyle} onClick={() => handleEditEvent(event)}><FaEdit /> Edit</button>
                                      {/* Delete button */}
                                      <button style={deleteButtonStyle} onClick={() => handleDeleteEvent(event._id)}><FaRegTrashAlt /> Delete</button>
                                    </div>
                                  </div>
                                </li>
                              </div>
                            ))
                          ) : (
                            <p>No events available</p>
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

      {/* Render EventDetailsModal */}
      <EventDetailsModal show={showModal} onHide={handleCloseModal} event={selectedEvent} />
    </main>
  );
}

export default Event;
