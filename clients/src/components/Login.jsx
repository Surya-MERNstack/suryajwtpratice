import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Loginpage.css'
import { toast } from 'react-toastify';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/users/login', {
        email,
        password,
      });
      const authToken = response.data;
  
      if (!authToken) {
        // If the response does not contain an authToken, it means the login failed
        toast.error('Email or password is incorrect', {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
  
      // Login successful, save the authToken to localStorage
      localStorage.setItem('auth-token', authToken);
  
      // Clear any previous error message
      setError('');
  
      // Display a success toast notification
      toast.success('Welcome to Dashboard', {
        position: toast.POSITION.TOP_RIGHT,
      });
  
      // Navigate to the dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
     toast.error('Invalid credentials. Please try again',{
      position : toast.POSITION.TOP_RIGHT
     });
    }
  };
  

  return (
    <div className='container'>
      <div className='form-group '>
        <label className='label'>Email:</label>
        <input
        className='input'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='form-group '>
        <label className='label'>Password:</label>
        <input
        className='input'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Link to='/forgot-password'>forgot-password?</Link>
      <button onClick={handleLogin} className='button'>Login</button>
    </div>
  );
}

export default LoginForm;
