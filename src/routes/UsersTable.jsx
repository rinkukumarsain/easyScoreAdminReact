import React, { useEffect, useState } from "react";
// import { FaEye } from "react-icons/fa";
import axios from "axios";
import "./css/userTable.css";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import DownloadsChart from "./DownloadsChart";
import TopThreeBox from "./TopThreeBox.jsx";
import { getUserDetailsApi } from "../apiService/user.js";
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { color } from "chart.js/helpers";

const url = "http://localhost:9191/admin/v1";

export const UsersTable = (userProps) => {
  const authToken = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [pageRefress, setPageRefress] = useState(false);
  // const [totalPages, setTotalPages] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [show, setShow] = useState(false);
  const [usersDetails, setUsersDetails] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [userState, setUserState] = useState(user);
  // const [SrNO, setSrNo] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let body = { limit, skip };

        if (search) { body.search = search; }

        const api1 = await axios.post(`${url}/user/userList`, body, { headers: { Authorization: `Bearer ${authToken}`, }, });

        setUsers(api1.data?.data);
        setTotalPages(Math.ceil(api1.data.totalUser / limit));
      } catch (err) {
        if (!err.response?.data?.success) {
          console.log(err.response.data.message, "-----");
        }
        let errMs = err?.response?.data?.message
          ? err.response.data.message
          : err.message;
        setError(errMs);
      } finally {
        setLoading(false);
      }
    };
    setPageRefress(false);
    fetchUsers();
  }, [limit, skip, search, pageRefress]);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  const paginate = (pageNumber) => {
    setLimit(10);
    setSkip((pageNumber - 1) * 10);
  };

  const changeUserStatus = async (event, userId) => {
    try {
      event.preventDefault();
      await axios.get(`${url}/user/changeUserStatus/${userId}`, {
        headers: { Authorization: `Bearer ${authToken}`, },
      });

      setPageRefress(true)
    } catch (err) {
      if (!err.response?.data?.success) {
        console.log(err?.response?.data?.message, "-----");
      }
      let errMs = err?.response?.data?.message
        ? err.response.data.message
        : err.message;
      setError(errMs);
    } finally {
      setLoading(false);
    }
  };
  const getUserDetails = async (event, userId) => {
    try {
      event.preventDefault();
      // const response = await axios.get(`${url}/user/getUserDetails/${userId}`, {
      //   headers: { Authorization: `Bearer ${authToken}`, },
      // });
      // console.log(response.data.data, "-----response");
      const res = await getUserDetailsApi(userId);
      console.log(res, "-----------------------res");
      if (res.success) {
        setUsersDetails(res.data)
        setShow(true)

      } else {
        toast(res.message)
      };

    } catch (err) {
      if (!err.response?.data?.success) {
        console.log(err?.response?.data?.message, "-----");
      }
      let errMs = err?.response?.data?.message
        ? err.response.data.message
        : err.message;
      setError(errMs);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="container">
    // (<TopThreeBox />),
    <>
      <div className="main-content">
        {userProps.type ? (
          <>
            <TopThreeBox />
          </>
        ) : (
          <></>
        )}
        <div className="stat-box" style={{ width: "100%" }}>
          <div>
            <div
              className="d-flex"
              style={{ "justify-content": "space-between" }}
            >
              <h3>Users list</h3>
              <label htmlFor="search">search</label>{" "}
              <input
                style={{ height: "max-content" }}
                type="text"
                id="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            {/* <div> */}
            <table
              style={{
                fontSize: "15px",
                width: "100%",
                top: "66px",
                left: "24px",
                gap: "0px",
                border: "1px 0px 0px 0px",
                opacity: "0px",
                border: "groove",
              }}
            >
              <thead>
                <tr>
                  <th style={{ border: "1px solid black", height: "25px" }}>
                    Sr no
                  </th>
                  <th style={{ border: "1px solid black", height: "25px" }}>
                    User Name
                  </th>
                  <th style={{ border: "1px solid black", height: "25px" }}>
                    Email
                  </th>
                  <th style={{ border: "1px solid black", height: "25px" }}>
                    Contact
                  </th>
                  <th style={{ border: "1px solid black", height: "25px" }}>
                    Country
                  </th>
                  <th style={{ border: "1px solid black", height: "25px" }}>
                    Last Logged In
                  </th>
                  <th style={{ border: "1px solid black", height: "25px" }}>
                    Status
                  </th>
                  {userProps.type ? (
                    <>
                      <th style={{ border: "1px solid black", height: "25px" }}>

                      </th>
                      <th style={{ border: "1px solid black", height: "20px", width: "148px" }}>
                        Actions
                      </th>
                    </>
                  ) : (
                    <></>
                  )}
                </tr>
              </thead>
              {!error ? (
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td style={{ border: "1px solid black", height: "30px" }}>
                        {index + 1 + skip}
                      </td>
                      <td style={{ border: "1px solid black", height: "30px" }}>
                        {user.name}
                      </td>
                      <td style={{ border: "1px solid black", height: "30px" }}>
                        {user.email}
                      </td>
                      <td style={{ border: "1px solid black", height: "30px" }}>
                        {user.phone}
                      </td>
                      <td style={{ border: "1px solid black", height: "30px" }}>
                        {user.countryId.name}
                      </td>
                      <td style={{ border: "1px solid black", height: "30px" }}>
                        {user.loginDate
                          ? moment().diff(moment(user.loginDate), "day") > 1
                            ? moment(user.loginDate).format("YYYY-MM-DD")
                            : moment().diff(moment(user.loginDate), "day") === 1
                              ? "Yesterday"
                              : `${moment().diff(
                                moment(user.loginDate),
                                "minutes"
                              )} minutes ago`
                          : ""}
                      </td>

                      <td
                        className={user?.isActive ? "active" : "inactive"}
                        style={{
                          "border-radius": "13px",
                          border: "1px solid black",
                          height: "30px",
                        }}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </td>
                      {userProps.type ? (
                        <>
                          <th
                            style={{ border: "1px solid black", height: "25px" }}
                          >
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                checked={user?.isActive ? true : false}
                                id="flexSwitchCheckDefault"
                                onClick={(e) => changeUserStatus(e, user._id)}
                              />
                            </div>
                          </th>
                          <th
                            style={{ border: "1px solid black", height: "25px" }}
                          >
                            <button type="button" value={user._id} class="btn btn" onClick={(e) => getUserDetails(e, user._id)}>
                              👁
                            </button>
                            <button type="button" value={user._id} class="btn btn">
                              ✏
                            </button>
                            <button type="button" value={user._id} class="btn btn">
                              ⛔
                            </button>
                          </th>
                        </>
                      ) : (
                        <></>
                      )}
                    </tr>
                  ))}
                </tbody>
              ) : (
                error
              )}
              <tfoot>
                <tr>
                  <th style={{ border: "1px solid black", height: "25px" }}>
                    Sr no
                  </th>
                  <th style={{ border: "1px solid black", height: "25px" }}>
                    User Name
                  </th>
                  <th style={{ border: "1px solid black", height: "25px" }}>
                    Email
                  </th>
                  <th style={{ border: "1px solid black", height: "25px" }}>
                    Contact
                  </th>
                  <th style={{ border: "1px solid black", height: "25px" }}>
                    Country
                  </th>
                  <th style={{ border: "1px solid black", height: "25px" }}>
                    Last Logged In
                  </th>

                  <th>Status</th>
                </tr>
              </tfoot>
            </table>
            {/* <div className="d-flex" style={{ "justify-content": "space-between" }}> */}
            <div
              className="d-flex"
              style={{
                "justify-content": "end",
                "padding-top": "13px",
                "margin-bottom": "-24px",
              }}
            >
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                    <button
                      key={1}
                      onClick={() => paginate(1)}
                      className="page-link"
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </button>
                  </li>
                  {Array(totalPages)
                    .fill(0)
                    .map((_, index) => (
                      <li class="page-item">
                        <button
                          key={index}
                          onClick={() => paginate(index + 1)}
                          className="page-link"
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                  <li className="page-item">
                    <button
                      key={1}
                      onClick={() => paginate(totalPages)}
                      className="page-link"
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            {/* </div> */}
          </div>
          {/* </div> */}
        </div >
      </div >
      {/* modal open  */}
      <Modal
        show={show}
        size="lg"
        onHide={handleClose} animation={false} style={{ "color": "black" }}>
        <Modal.Header closeButton>
          <Modal.Title>User details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className='row'>
            <div className="col-lg-6">
              <div className="row-lg-6" style={{ "text-align": "center" }}>
                <img src={usersDetails?.profile_image} alt='Profile Image' style={{ 'width': '150px', 'height': '150px', 'border-radius': '50%', 'margin-bottom': '10px' }} />
                <h3 style={{ 'margin-top': '0' }}>{usersDetails?.name}</h3>
                <button style={{ 'background-color': '#28a745', 'color': '#fff', 'border': 'none', 'padding': '8px 16px', 'border-radius': '5px', 'cursor': 'pointer', }}>{usersDetails?.isActive ? "Active" : "deActive"}</button>
              </div>
              <div className="row-lg-6" >
                <p style={{ 'margin-bottom': '10px' }} > Email: {usersDetails?.email}</p>
                <p style={{ 'margin-bottom': '10px' }} > Contact: {usersDetails?.phone}</p>
                <p style={{ 'margin-bottom': '10px' }} > Country: {usersDetails?.countryId?.name}</p>
                <p style={{ 'margin-bottom': '10px' }} > Last Logged In:  {usersDetails.loginDate
                  ? moment().diff(moment(usersDetails.loginDate), "day") > 1
                    ? moment(usersDetails.loginDate).format("YYYY-MM-DD")
                    : moment().diff(moment(usersDetails.loginDate), "day") === 1
                      ? "Yesterday"
                      : `${moment().diff(
                        moment(usersDetails.loginDate),
                        "minutes"
                      )} minutes ago`
                  : ""}</p>
              </div>
            </div>

            <div className='col-lg-6'>
              jhb
            </div>
          </div>


        </Modal.Body >
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal >

      {/* model close */}
    </>
  );
};

export default UsersTable;
