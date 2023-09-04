import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/Forgot.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('/api/users/forgot-password', {
        email,
      });
    //   setMessage(response.data.message);
      toast.success(response.data.message, {
        position : toast.POSITION.TOP_RIGHT
      })
      ;
    } catch (error) {
      toast.error('Failed to initiate password reset. Please try again', {
        position : toast.POSITION.TOP_RIGHT
      })
    }
  };

  return (
    <div className='forgot-password-container'>
      <h2>Forgot Password</h2>
      <p>Enter your email to reset your password.</p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
      <br />
      {/* <p className="message">{message}</p> */}
      <Link to="/login">Back to Login</Link>
    </div>
  );
}

export default ForgotPassword;

