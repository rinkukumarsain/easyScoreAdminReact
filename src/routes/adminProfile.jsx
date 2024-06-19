import { React, useState, useEffect } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const url = "http://localhost:9191/admin/v1";

export const AdminProfile = () => {
  const authToken = localStorage.getItem("token");
  const [data, setData] = useState({});
  console.log(data, "---getProfile");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log(authToken, "---authToken");
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [reSet, setRe] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(`${url}/user/getProfile`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setData(res.data.data);
        setFirstName(res.data.data.firstName);
        setLastName(res.data.data.lastName);
        setEmail(res.data.data.email);
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
  }, [reSet]);

  console.log(firstName, "---firstName");
  console.log(lastName, "---lastName");
  console.log(email, "---email");

  const handelUpdateProfile = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append("firstName", "Samuel");
      formData.append("lastName", "--Cooper----");
      formData.append("email", "amuelcooper123@gmail.com");

      const head = {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "multipart/form-data",
      };
      console.log(formData, "---formData");
      const res = await axios.post(
        `${url}/user/updateProfile`,
        { firstName, lastName, email },
        { headers: head }
      );
      console.log(res, "-====================================================");

      setData(res.data.data);
      setRe(true);
      //   redirect("/adminProfile");
      // fetchReport();
    } catch (err) {
      console.log(err, "====================================================");
      let errMs = err?.response?.data?.message
        ? err.response.data.message
        : err.message;
      setError(errMs);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="main-content">
      <div className="stats">
        <div
          className="stat-box"
          style={{ margin: "auto", "margin-top": "15%" }}
        >
          <h1>Profile</h1>
          <div className="form-group">
            <img
              src={data.profile_image}
              alt="profile img"
              style={{
                width: "130px",
                height: "130px",
                top: "60px",
                left: "175px",
                gap: "0px",
                opacity: "0px",
                "border-radius": "65px",
                margin: "0px 0px 34px 153px",
              }}
            />
          </div>

          <form onSubmit={handelUpdateProfile}>
            <div className="d-flex">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Edit Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
