import { React, useState, useEffect } from "react";
import axios from "axios";
const url = "http://localhost:9191/admin/v1";

export default function TopThreeBox() {
  const authToken = localStorage.getItem("token");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log(authToken, "---authToken");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(`${url}/user/userReport`, {
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
    <div className="stats">
      <div className="stat-box">
        <h3>Total Users</h3>
        <p>{data?.totalUser?.count ? data.totalUser.count : 0}</p>
      </div>
      <div className="stat-box">
        <h3>New Users</h3>
        <p>{data?.getNewUser?.count ? data.getNewUser.count : 0}</p>
      </div>
      <div className="stat-box">
        <h3>Active Users</h3>
        <p>{data?.getActiveUser?.count ? data.getActiveUser.count : 0}</p>
      </div>
    </div>
  );
}
