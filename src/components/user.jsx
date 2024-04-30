import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardNav from "./dashboardNav";
import Notiflix from "notiflix";
import { FaEye, FaRegTrashAlt, FaEdit, FaCalendarAlt, FaTimes, FaBan  } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import UserModal from "./UserDetailsModal";
import "../style/dashboard.css";

function User() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullNames: "",
    location: "",
    backdropImage: null,
  });

  const [users, setUsers] = useState([]);
  const [editUserEmail, setEditUserEmail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("fullNames", formData.fullNames);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("backdropImage", formData.backdropImage);
  
      // Check if editUserEmail is set, indicating an update
      if (editUserEmail) {
        // Use the editUserEmail to construct the update URL
        await axios.put(`http://localhost:100/api/v1/auth/users/update/${editUserEmail}`, formDataToSend);
        Notiflix.Notify.success("USER UPDATED SUCCESSFULLY");
      } else {
        // If editUserEmail is not set, it's a new user creation
        await axios.post("http://localhost:100/api/v1/auth/signup", formDataToSend);
        Notiflix.Notify.success("USER CREATED SUCCESSFULLY");
      }
  
      // Reset form data and editUserEmail after submission
      setFormData({
        email: "",
        password: "",
        fullNames: "",
        location: "",
        backdropImage: null,
      });
      setEditUserEmail(null);
  
      // Fetch updated user list
      const response = await axios.get("http://localhost:100/api/v1/auth/users");
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error. Please try again later.");
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:100/api/v1/auth/users");
        setUsers(response.data.data);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (userEmail) => {
    try {
      await axios.delete(`http://localhost:100/api/v1/auth/users/delete/${userEmail}`);
      Notiflix.Notify.success("USER DELETED SUCCESSFULLY");
      const response = await axios.get("http://localhost:100/api/v1/auth/users");
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting user. Please try again later.");
    }
  };

  const handleEditUser = (user) => {
    setEditUserEmail(user.email);
    setFormData({
      email: user.email,
      password: user.password,
      fullNames: user.fullNames,
      location: user.location,
      backdropImage: user.backdropImage,
      // Add other fields as needed
    });
    window.scrollTo(0, 0);
  };
  
  const openModal = async (user) => {
    try {
      const response = await axios.get(`http://localhost:100/api/v1/auth/users/getOne/${user.email}`);
      setSelectedUser(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
      alert("Error fetching user details. Please try again later.");
    }
  };

  const handleBlockUser = async (userEmail) => {
    try {
      // Send a PUT request to update the user status to "blocked"
      await axios.put(`http://localhost:100/api/v1/auth/users/update/${userEmail}`, { status: "blocked" });
      Notiflix.Notify.success("USER BLOCKED SUCCESSFULLY");
  
      // Update the User state with the updated User status
      const updatedUsers = users.map(user => {
        if (user.email === userEmail) {
          return {
            ...user,
            status: "Blocked" // Assuming 'status' is the correct property for user status
          };
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error:", error);
      alert("Error blocking User. Please try again later.");
    }
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    marginRight: "50px",
  };

  const EditButtonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    marginRight: "40px",
  };

  const cancelButtonStyle = {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    marginRight: "30px",
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
                  <span className="username">User Management</span>
                </h3>
              </div>
            </div>
          </div>

          <div className="dashboard-content">
            <div className="row">
              <div className="edit-tour">
                <h2 style={{ fontSize: "24px", textAlign: "center" }}>
                  {editUserEmail ? "Edit User" : "Create New User"}
                </h2>
                <form
                  className="edit-tour-form"
                  onSubmit={handleSubmit}
                  style={{ maxWidth: "400px", margin: "0 auto" }}
                >
                  {/* Form fields */}
                  {/* Email */}
                  <div className="col-12" style={{ marginBottom: "7px", display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: "15px", marginBottom: "5px" }}>Email:</label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", padding: "8px", fontSize: "15px", boxSizing: "border-box" }}
                    />
                  </div>
                  {/* password */}
                  <div className="col-12" style={{ marginBottom: "7px", display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: "15px", marginBottom: "5px" }}>password:</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", padding: "8px", fontSize: "15px", boxSizing: "border-box" }}
                    />
                  </div>
                  {/* DafullNameste */}
                  <div className="col-12" style={{ marginBottom: "7px", display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: "15px", marginBottom: "5px" }}>fullNames:</label>
                    <input
                      type="text"
                      name="fullNames"
                      value={formData.fullNames}
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
                      style={{ width: "100%", padding: "8px", fontSize: "15px", boxSizing: "border-box" }}
                    />
                  </div>
                  {/* Photo */}
                  <div className="col-12" style={{ marginBottom: "7px", display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: "15px", marginBottom: "5px" }}>Photo:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}

                      style={{ width: "100%", padding: "8px", fontSize: "15px", boxSizing: "border-box" }}
                    />
                  </div>
                  {/* Submit Button */}
                  <div className="col-12">
                    <div className="edit-tour-btn">
                      <button type="submit" className="btn confirm-btn">
                        {editUserEmail ? "Update" : "Confirm"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              {/* Users List */}
              <div className="side-content1">
                <div className="side-content-row">
                  <div className="friend">
                    <div className="container">
                      <div className="sec-title">
                        <h4 className="h4-title">Users</h4>
                      </div>
                      <div className="friend-list">
                        <ul>
                          {users.length > 0 ? (
                            users.map((user) => (
                              <div className="friend-box" key={user.email}>
                                <li>
                                  <div>
                                    <img src={user.backdropImage} alt={user.fullNames} style={{ width: "100%" }} />
                                  </div>
                                  <div>
                                    <h3 style={{ fontSize: "24px", textAlign: "center",marginBottom: "8px" }}>{user.fullNames}</h3>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                      <p> <FaLocationDot/>{user.location}</p>
                                      <p><FaCalendarAlt/>{user.status}</p>
                                      
                                    </div>
                                    <div>
                                      <button style={buttonStyle} onClick={() => openModal(user)}><FaEye /> View</button>
                                      <button style={EditButtonStyle} onClick={() => handleEditUser(user)}><FaEdit /> Edit</button>
                                      <button style={cancelButtonStyle} onClick={() => handleBlockUser(user.email)}><FaBan /> Block</button>
                                      <button style={deleteButtonStyle} onClick={() => handleDeleteUser(user.email)}><FaRegTrashAlt /> Delete</button>
                                    </div>
                                  </div>
                                </li>
                              </div>
                            ))
                          ) : (
                            <p>No users available</p>
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
      {selectedUser && (
        <UserModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} user={selectedUser} />
      )}
    </main>
  );
}

export default User;
