import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Rest.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

console.log(password)
  const handleResetPassword = async () => {
    try {
      // Send a POST request to reset the password with the provided token and new password
      const response = await axios.post(`/api/users/reset-password/${token}`, {
        password,
      });

      // Display the response message
    //   setMessage(response.data.message);
      toast.success(response.data.message, {
         position : toast.POSITION.TOP_RIGHT
      })
    } catch (error) {
      // Handle any errors during the reset process
      toast.error('Failed to reset password. Please try again', {
        position : toast.POSITION.TOP_RIGHT
      })
    }
  };

  return (
    <div className='reset-password-container'>
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
      <br />
      <Link to="/login">Back to Login</Link>
      
    </div>
  );
}

export default ResetPassword;

