// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import Chart from "chart.js/auto";
// const url = "http://localhost:9191/admin/v1";

// export const DownloadsChart = () => {
//   const [data, setData] = useState([]);
//   console.log("resresres--", data);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const authToken = localStorage.getItem("token");
//   const chartRef = useRef(null);
//   console.log("inputRef.current.focus();", chartRef);

//   const fetchData = async () => {
//     try {
//       console.log("----------11111111111");
//       const res = await axios.get(`${url}/user/userDownloads?type=week`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });
//       console.log("resresres", res);
//       setData(res?.data?.data);
//     } catch (err) {
//       let errMs = err?.response?.data?.message
//         ? err.response.data.message
//         : err.message;
//       setError(errMs);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();

//     // console.log("sgdyuga", data);
//   }, []);

//   // console.log("sgdyuga", data);
//   useEffect(() => {
//     // console.log(data, "-----darta");
//     const ctx = document.getElementById("downloadsChart").getContext("2d");
//     console.log(ctx, "-----inputRef.current.focus 22");
//     console.log(chartRef, "---inputRef.current");

//     if (chartRef.current) {
//       chartRef.current.destroy();
//     }

//     // Create new chart instance
//     chartRef.current = new Chart(ctx, {
//       type: "bar",
//       data: {
//         labels: ["S", "M", "T", "W", "T", "F", "S"],
//         datasets: [
//           {
//             label: "Downloads",
//             data: [12, 19, 3, 5, 22, 3, 7],
//             backgroundColor: "rgba(153, 102, 255, 0.6)",
//             borderColor: "rgba(153, 102, 255, 1)",
//             borderWidth: 1,
//           },
//         ],
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//           },
//         },
//       },
//     });

//     // Cleanup function to destroy chart instance on unmount
//     return () => {
//       if (chartRef.current) {
//         chartRef.current.destroy();
//       }
//     };
//   }, []);
//   return (
//     <div className="downloads-chart">
//       <h3>No. of Downloads</h3>
//       <canvas id="downloadsChart" ref={chartRef}></canvas>
//     </div>
//   );
// };

// export default DownloadsChart;

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
const url = "http://localhost:9191/admin/v1";

export const DownloadsChart = () => {
  const [data, setData] = useState([]);
  console.log("resresres--", data);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authToken = localStorage.getItem("token");
  const chartRef = useRef(null);
  console.log("inputRef.current.focus();", chartRef);

  const fetchData = async () => {
    try {
      console.log("----------11111111111");
      const res = await axios.get(`${url}/user/userDownloads?type=week`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log("resresres", res);
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
    fetchData();

    // console.log("sgdyuga", data);
  }, []);

  // console.log("sgdyuga", data);
  // useEffect(() => {
  //   // console.log(data, "-----darta");
  //   const ctx = document.getElementById("downloadsChart").getContext("2d");
  //   console.log(ctx, "-----inputRef.current.focus 22");
  //   console.log(chartRef, "---inputRef.current");

  //   if (chartRef.current) {
  //     chartRef.current.destroy();
  //   }

  //   // Create new chart instance
  //   chartRef.current = new Chart(ctx, {
  //     type: "bar",
  //     data: {
  //       labels: ["S", "M", "T", "W", "T", "F", "S"],
  //       datasets: [
  //         {
  //           label: "Downloads",
  //           data: [12, 19, 3, 5, 22, 3, 7],
  //           backgroundColor: "rgba(153, 102, 255, 0.6)",
  //           borderColor: "rgba(153, 102, 255, 1)",
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   });

  //   // Cleanup function to destroy chart instance on unmount
  //   return () => {
  //     if (chartRef.current) {
  //       chartRef.current.destroy();
  //     }
  //   };
  // }, []);
  // const chartRef = useRef(null);
  console.log(data, "---------------");
  const numberCout = data.map((item) => item.count);
  const id = data.map((item) => item._id);
  console.log(numberCout, "----------------numberCout");
  console.log(id, "----------------numberCout");
  // const numberCout = [12, 19, 3, 5, 22, 3, 7];
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
      <select name="" id="">
        <option value="week">week</option>
        <option value="month">month</option>
        <option value="year">year</option>
      </select>
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
