import React,{useState} from 'react'
import { API_URL } from '../../helpers/ApiPath';

const Register = ({showloginhandler}) => {
  const[username,setUsername]=useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[error,setError]=useState("");
  const[loading,setLoading]=useState("");


  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username,email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.error}`);
        return;
      }

      const data = await response.json();
      alert('Vendor Register Successful');
      setEmail("");
      setUsername("");
      setPassword("");
      showloginhandler()
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login.');
    }
  };
  return (
    <div className="registersection">
      <form action="" className="authform" onSubmit={handlesubmit}>
        <h3>Vendor Register</h3>
        <label htmlFor="email">UserName:</label>
        <input type="text" id="username" placeholder="Enter your name" value ={username}  onChange={(e) => setUsername(e.target.value)} /><br />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="Enter your email"  value={email}  onChange={(e) => setEmail(e.target.value)}/><br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="Enter your password" value={password}  onChange={(e) => setPassword(e.target.value)}/><br />
            <button type="submit" className="btnsubmit">Submit</button>
      </form>

    </div>
  )
}

export default Register