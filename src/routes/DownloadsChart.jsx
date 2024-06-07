import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
const url = "http://localhost:9191/admin/v1";

export const DownloadsChart = () => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const authToken = localStorage.getItem("token");
  const chartRef = useRef(null);

  const fetchData = async ({ type }) => {
    try {
      const res = await axios.get(`${url}/user/userDownloads?type=${type}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setData(res?.data?.data);
    } catch (err) {
      let errMs = err?.response?.data?.message
        ? err.response.data.message
        : err.message;
      setError(errMs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData({ type: selectedValue ? selectedValue : "week" });
  }, [selectedValue]);

  let numberCout = data.map((item) => item.count);
  const id = data.map((item) => item._id);
  // numberCout = [12, 19, 3, 5, 22, 3, 7];
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: id, // Adjust labels if needed
        datasets: [
          {
            label: "Downloads",
            data: numberCout, // Replace with your actual data array
            backgroundColor: "rgba(153, 102, 255, 0.6)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup function to destroy chart on unmount
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [numberCout, id]);

  return (
    <div className="downloads-chart" style={{ width: "38%" }}>
      <h3>No. of Downloads</h3>
      <select name="timeframe" id="timeframe" onChange={handleSelectChange}>
        <option value="">selected</option>
        <option value="week">week</option>
        <option value="month">month</option>
        <option value="year">year</option>
      </select>
      <p>Selected value: {selectedValue}</p>
      <canvas
        ref={chartRef}
        id="downloadsChart"
        width="400"
        height="250"
      ></canvas>
    </div>
  );
};

export default DownloadsChart;
