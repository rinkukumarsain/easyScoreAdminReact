import { React, useState, useEffect } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";
const url = "http://localhost:9191/admin/v1";
// import React from "react";

export default function Header() {
  const authToken = localStorage.getItem("token");
  const [data, setData] = useState({});
  console.log(data, "---getProfile");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log(authToken, "---authToken");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(`${url}/user/getProfile`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setData(res.data.data);
      } catch (err) {
        let errMs = err?.response?.data?.message
          ? err.response.data.message
          : err.message;
        setError(errMs);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="header">
      <div className="user-info">
        <img
          src={data.profile_image}
          alt="Avatar"
          onClick={redirect("/adminProfile")}
        />
        <span>
          {data.firstName} {data.lastName}
        </span>
      </div>
    </div>
  );
}
