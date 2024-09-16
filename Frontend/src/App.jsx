import React, { useState } from 'react';
import './App.css'; // Import the CSS file
import logo from './assets/logo.png';
import axios from 'axios';

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

  const [isLoading, setIsLoading] = useState(false); // State for loading status

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when the request starts
    try {
      await axios.post('https://vivarta-form.vercel.app/register', formData);
      alert("Registration complete");
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
      alert("Registration failed");
    } finally {
      setIsLoading(false); // Set loading to false when the request is done
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
        <form className="student-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Techno Vivarta Registration</h2>
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
          />
          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
          />
          <label>Student Id</label>
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
          <label>Stream</label>
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
          
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
