import React, { useState } from 'react';
import { API } from "../constant";
import axios from '../../api/axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  async function handleSubmit (event) {
    event.preventDefault();
    console.log(email)  
    // await axios(`https://aquoipizza.com/api/auth/forgot-password  `, {
  //     method: "POST",
  //     // email: email, 
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //       'Content-Type': 'application/json',
  //     },  
  //     body: JSON.stringify(email),
  //     // email : email,
  //     // email: email, // user's email
  //   })
  //   .then(response => {
  //     console.log('Your user received an email');
  //     console.log(response)
  //   })
  //   .catch(error => {
  //     console.log('An error occurred:', error);
  //   });

  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">A password reset link has been sent to your email.</div>}
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />
      <button type="submit">Send Password Reset Link</button>
    </form>
  );
}
export default ForgotPassword;