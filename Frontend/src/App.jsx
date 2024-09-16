import React, { useState } from 'react';
import './App.css'; // Import the CSS file
import logo from './assets/logo.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    studentid: '',
    batch: '',
    stream: '',
    phone: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://vivarta-form.vercel.app/register', formData);
      toast.success('Registration successful!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
      setFormData({
        firstname: '',
        lastname: '',
        studentid: '',
        batch: '',
        stream: '',
        phone: '',
        email: ''
      });
    } catch (error) {
      console.error('Error registering', error);
      toast.error('Registration failed. Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
      
    }
  };

  return (
    <div className='main'>
       <nav>
        <img src={logo} alt="Techno Vivarta Logo" />
        <h1>Techno Vivarta</h1>
        <p></p>
      </nav>
   
    <div className="form-container">
    <ToastContainer />
      
      <form className="student-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Techno Vivarta Registration</h2>
        <label> Frist Name</label>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
        />
        <label> Last Name</label>
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
        />
        <label> Student Id</label>
        <input
          type="text"
          name="studentid"
          placeholder="Student ID"
          value={formData.studentid}
          onChange={handleChange}
        />
        <label>Batch</label>
        <input
          type="text"
          name="batch"
          placeholder="Batch"
          value={formData.batch}
          onChange={handleChange}
        />
        <label> Stream</label>
        <input
          type="text"
          name="stream"
          placeholder="Stream"
          value={formData.stream}
          onChange={handleChange}
        />
        <label>Whatsapp Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default App;