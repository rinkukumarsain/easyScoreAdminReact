import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleUserLoginApi } from "../apiService/user";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
  const naviget = useNavigate();
  const [email, setEmail] = useState("");           //admin@gmail.com
  const [password, setPassword] = useState("");     //12345678

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUserLogin = async (event) => {
    event.preventDefault();
    const body = { email, password, appKey: "---", };
    console.log(body, "----body");

    try {
      const data = await handleUserLoginApi(body);

      if (data.success) {
        naviget("/");
        toast(data?.message);
      } else {
        toast(data?.data?.message);
        naviget("/login");
      };

    } catch (error) {
      toast(error?.response?.message);
      naviget("/login");
    };

  };

  return (
    <div className="container">
      <div className="login-form">
        <h1>Elevating Sports Betting Management to New Heights!</h1>
        <h2>Log in</h2>
        <p>Enter your information below to log in</p>
        <form onSubmit={handleUserLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
