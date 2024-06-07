import React from "react";
import DownloadsChart from "./DownloadsChart";
import UsersTable from "./UsersTable";
import TopThreeBox from "./TopThreeBox.jsx";
import Header from "./Header.jsx";

const MainContainer = () => {
  return (
    <div className="main-content">
      <Header />
      <TopThreeBox />
      <div className="content">
        <div style={{ width: "60%" }}>
          <UsersTable />
        </div>
        <DownloadsChart />
      </div>
    </div>
  );
};

export default MainContainer;
