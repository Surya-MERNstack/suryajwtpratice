import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const validateInputs = () => {
    let isValid = true;

    if (name == '' && email == '' && password == ''){ 
      isValid = false; 
      toast.error('FillOut the form', {
        position : toast.POSITION.TOP_RIGHT
      })

      return;
    }

    if (name.length < 5) {
      isValid = false;
      toast.error('Name must be at least 5 characters long.', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    if (email.length < 10) {
      isValid = false;
      toast.error('Email must be at least 10 characters long.', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      isValid = false;
      toast.error(
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*#?&).',
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }

    return isValid;
  };

  const handleRegister = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      // Simulating a registration request
      // Replace this with your actual registration API call
      const response = await axios.post('/api/users/register', {
        name,
        email,
        password,
      });

      // Registration successful, display a success message
      toast.success('Successfully registered!', {
        position: toast.POSITION.TOP_RIGHT,
      });

      // navigate('/login')
      setTimeout(() => {
        navigate('/login')
      },2000); // Navigate to the login page after successful registration
    } catch (error) {
      if (error.response && error.response.data) {
        const responseData = error.response.data;
        if (responseData.message === 'Mail is already exists') {
          // Email already exists, display an error message
          toast.error(' Registration failed. Please try again later', {
            position: toast.POSITION.TOP_CENTER,
          }); 
        } else {
          // Other validation errors, display an error message
          toast.error('Mail is already exists', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else {
        // Generic error, display an error message
        toast.error('This email is already registered. Please log in or use a different email', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Register</h2>
      <div className="form-group">
        <label className="label">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
      </div>
      <div className="form-group">
        <label className="label">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
      </div>
      <div className="form-group">
        <label className="label">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
      </div>
      <button onClick={handleRegister} className="button">
        Register
      </button>
      <Link to="/login" className="link">
        Already have an account? Login
      </Link>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default RegisterForm;
