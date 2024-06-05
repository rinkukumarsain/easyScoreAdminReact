import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/userTable.css";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const url = "http://localhost:9191/admin/v1";

export const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  // const [totalPages, setTotalPages] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  // const [SrNO, setSrNo] = useState(1);
  console.log(search, "---search");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const authToken = localStorage.getItem("token");

        let body = { limit, skip };

        if (search) {
          body.search = search;
        }
        const api1 = await axios.post(`${url}/user/userList`, body, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        // console.log(api1.data.data, "---api1", api1.data.totalUser); // Assuming you want to log the response data
        setUsers(api1.data.data);
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

    fetchUsers();
  }, [limit, skip, search]);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  const paginate = (pageNumber) => {
    setLimit(10);
    setSkip((pageNumber - 1) * 10);
  };

  return (
    // <div className="container">
    <div className="stat-box" style={{ width: "60%" }}>
      <div>
        <div className="d-flex" style={{ "justify-content": "space-between" }}>
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
          // border="2px"
          style={{
            fontSize: "10px",
            // Gap: "32px",
            // left: "32px",
            // top: "32px",
            // Height: "Hug (956px)",
            // Width: "Hug (1,636px)",
            width: "100%",
            // height: "264px",
            top: "66px",
            left: "24px",
            gap: "0px",
            border: "1px 0px 0px 0px",
            opacity: "0px",
            // border: "1px solid #E6E6E633",
            border: "groove",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid black", height: "30px" }}>
                Sr no
              </th>
              <th style={{ border: "1px solid black", height: "30px" }}>
                User Name
              </th>
              <th style={{ border: "1px solid black", height: "30px" }}>
                Email
              </th>
              <th style={{ border: "1px solid black", height: "30px" }}>
                Contact
              </th>
              <th style={{ border: "1px solid black", height: "30px" }}>
                Country
              </th>
              <th style={{ border: "1px solid black", height: "30px" }}>
                Last Logged In
              </th>

              <th style={{ border: "1px solid black", height: "30px" }}>
                Status
              </th>
            </tr>
          </thead>
          {!error ? (
            <tbody>
              {/* {let i =1}, */}
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
                </tr>
              ))}
            </tbody>
          ) : (
            error
          )}
          <tfoot>
            <tr>
              <th scope="col">Sr no</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Contact</th>
              <th scope="col">Country</th>
              <th scope="col">Last Logged In</th>

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
    </div>
  );
};

export default UsersTable;
