import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Grid } from '@mui/material';
import axios from 'axios';
import './App.css';
import logo from './assets/logo.png';

function App() {
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
      await axios.post('http://localhost:5000/register', formData);
      alert('Registration successful');
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
      alert('Registration failed');
    }
  };

  return (
    <Container
      maxWidth="sm"
      className="form-container"
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          padding: '40px',
          backgroundColor: '#000',
          borderRadius: '20px',
          boxShadow: '0 4px 8px rgba(255,255,255,0.1)',
          color: '#fff',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Techno Vivarta Logo"
            sx={{
              width: 60,
              height: 60,
              mr: 1,
            }}
          />
          <Typography component="h1" variant="h5" sx={{ color: 'red' }}>
            Techno Vivarta Registration Form
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={10}>
              <TextField
                name="firstname"
                label="First Name*"
                variant="outlined"
                fullWidth
                required
                value={formData.firstname}
                onChange={handleChange}
                InputLabelProps={{ style: { color: '#fff' } }}
                InputProps={{ style: { color: '#fff', backgroundColor: '#333' } }}
              />
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                name="lastname"
                label="Last Name*"
                variant="outlined"
                fullWidth
                required
                value={formData.lastname}
                onChange={handleChange}
                InputLabelProps={{ style: { color: '#fff' } }}
                InputProps={{ style: { color: '#fff', backgroundColor: '#333' } }}
              />
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                name="studentid"
                label="Student ID*"
                variant="outlined"
                fullWidth
                required
                value={formData.studentid}
                onChange={handleChange}
                InputLabelProps={{ style: { color: '#fff' } }}
                InputProps={{ style: { color: '#fff', backgroundColor: '#333' } }}
              />
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                name="batch"
                label="Batch*"
                variant="outlined"
                fullWidth
                required
                value={formData.batch}
                onChange={handleChange}
                InputLabelProps={{ style: { color: '#fff' } }}
                InputProps={{ style: { color: '#fff', backgroundColor: '#333' } }}
              />
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                name="stream"
                label="Stream*"
                variant="outlined"
                fullWidth
                required
                value={formData.stream}
                onChange={handleChange}
                InputLabelProps={{ style: { color: '#fff' } }}
                InputProps={{ style: { color: '#fff', backgroundColor: '#333' } }}
              />
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                name="phone"
                label="Phone Number*"
                variant="outlined"
                fullWidth
                required
                value={formData.phone}
                onChange={handleChange}
                InputLabelProps={{ style: { color: '#fff' } }}
                InputProps={{ style: { color: '#fff', backgroundColor: '#333' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email Address*"
                variant="outlined"
                fullWidth
                required
                value={formData.email}
                onChange={handleChange}
                type="email"
                InputLabelProps={{ style: { color: '#fff' } }}
                InputProps={{ style: { color: '#fff', backgroundColor: '#333' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default App;
