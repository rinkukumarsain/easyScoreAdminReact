import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// const url = "http://localhost:9191/admin/V1";
const url = "https://timme.prometteur.in/admin/V1";

function Login() {
  const naviget = useNavigate();
  console.log(localStorage.getItem("token"), "---=======");
  //   localStorage.getItem("token")?
  //   if (localStorage.getItem("token")) {
  //     console.log(11111, "---=======");
  //     naviget("/game");
  //   }
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("12345678");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you would typically send the email and password to your server for authentication
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      const response = await axios.post(`${url}/user/login`, {
        email,
        password,
        appKey: "---",
      });
      let data = response.data;
      if (data.success) {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.data.token);
        naviget("/dashboard");
      } else {
        console.error("Login failed:", data);
      }
    } catch (error) {
      console.log(error?.response, "--error?.response?");
      alert(error?.response?.data?.message);
      naviget("/");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <h1>Elevating Sports Betting Management to New Heights!</h1>
        <h2>Log in</h2>
        <p>Enter your information below to log in</p>
        <form onSubmit={handleSubmit}>
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
