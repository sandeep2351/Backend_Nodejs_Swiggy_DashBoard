import React, { useState } from 'react';
import { API_URL } from '../../helpers/ApiPath';

const Login = ({ showwelcomehandler }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginhandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.error}`);
        return;
      }

      const data = await response.json();
      alert('Login Successful');
      setEmail("");
      setPassword("");
      localStorage.setItem('logintoken', data.token);

      const vendorid = data.vendorid; // Ensure vendorid is returned from the backend
      if (!vendorid) {
        throw new Error('Vendor ID not found in the login response');
      }
      console.log("Vendor ID:", vendorid);

      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorid}`, {
        headers: {
          'Authorization': `Bearer ${data.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!vendorResponse.ok) {
        const vendorErrorData = await vendorResponse.json();
        console.error("Error fetching vendor:", vendorErrorData);
        alert(`Failed to fetch vendor: ${vendorErrorData.error || 'Unknown error'}`);
        return;
      }

      const vendorData = await vendorResponse.json();
      console.log("Vendor Data:", vendorData);

      const vendorFirmId = vendorData.vendorfirmid; // Ensure this key matches the backend response
      console.log("Vendor Firm ID:", vendorFirmId);

      if (vendorFirmId) {
        const vendorfirmname=vendorData.vendor.firm[0].firmName;
       localStorage.setItem('firmId', vendorFirmId);
        localStorage.setItem('firmName',vendorfirmname);
        window.location.reload()
      }else {
        throw new Error('Vendor Firm ID not found in the vendor data');
      }

      showwelcomehandler();

    } catch (error) {
      console.error('Error during login or fetching vendor:', error);
      alert('An error occurred during login or fetching vendor.');
    }
  };

  return (
    <div className="loginsection">
      <form className="authform" onSubmit={loginhandler}>
        <h3>Vendor Login</h3>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        /><br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        /><br />
        <button type="submit" className="btnsubmit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
