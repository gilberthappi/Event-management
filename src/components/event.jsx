import React, { useState } from "react";
import axios from "axios";
import DashboardNav from "./dashboardNav";
import Notiflix from "notiflix";

import "../style/dashboard.css";

function Event() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    backdropImage: null,
    price: "",
    ticketAvailability: "",
  });

  const [events, setEvents] = useState([]);

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
      formDataToSend.append("ticketAvailability", formData.ticketAvailability);

      await axios.post("http://localhost:100/api/v1/event/addNew", formDataToSend);
      Notiflix.Notify.success("EVENT CREATED SUCCESSFULLY");
      // Clear the form after submission
      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        backdropImage: null,
        price: "",
        ticketAvailability: "",
      });
    } catch (error) {
      console.error("Error creating event: ", error);
      alert("Error creating event. Please try again later.");
    }
  };

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:100/api/v1/event/all")
  //     .then((response) => {
  //       setEvents(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching events: ", error);
  //     });
  // }, []);

  
  // useEffect(() => {
  //   // Define an async function to fetch data from the API
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:100/api/v1/event/all"
  //       );
  //       setEvents(response.data); // Assuming the data is an array of tours
  //       setLoading(false);
  //     } catch (err) {
  //       setError(err);
  //       setLoading(false);
  //     }
  //   };

  //   // Call the async function to fetch data
  //   fetchData();
  // }, []);
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://holiday-api-zj3a.onrender.com/api/v1/tour/all"
  //       );
  //       setTours(response.data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError(err);
  //       setLoading(false);
  //     }
  //   };

  //   // async function to fetch data
  //   fetchData();
  // }, []);

  // if (loading) {
  //   return (
  //     <div class="loader-wrapper">
  //       <div class="loader">
  //         <div class="circle outer">
  //           <div class="circle middle">
  //             <div class="circle inner">
  //               <div class="circle inniest"></div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

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
              <h2 style={{ fontSize: "24px", textAlign: "center" }}>Create New Event</h2>
              <form
                className="edit-tour-form"
                onSubmit={handleSubmit}
                style={{ maxWidth: "400px", margin: "0 auto" }}
               >
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
                <div className="col-12" style={{ marginBottom: "7px", display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: "15px", marginBottom: "5px" }}>Ticket Availability:</label>
                  <input
                    type="number"
                    name="ticketAvailability"
                    value={formData.ticketAvailability}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "8px", fontSize: "15px", boxSizing: "border-box" }}
                  />
                </div>
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

                <div className="col-12">
                  <div className="edit-tour-btn">
                   <button type="submit" className="btn confirm-btn">
                     Confirm
                   </button>
                 </div>
                </div>
              </form>
            </div>



             <div className="side-content">
               <div className="side-content-row">
                  <div className="friend">
                    <div className="container">
                      <div className="sec-title">
                      <h4 className="h4-title">Events</h4>
                      </div>
                      <div className="friend-list">
                        <ul>
                {events.map((event) => (
                  <div className="friend-box">
                  <li key={event.id}>
                    <div>
                      <img src={event.photo} alt={event.title} />
                    </div>
                    <div>
                      <h3>{event.title}</h3>
                      <p>{event.description}</p>
                      <p>Date: {event.date}</p>
                      <p>Location: {event.location}</p>
                      <p>Price: {event.price}</p>
                      <p>Ticket Availability: {event.ticketAvailability}</p>
                      {/* Add more event details as needed */}
                    </div>
                  </li>
                  </div>
                ))}
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
  </main>
  );
}

export default Event;
