import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
    // <div className="container">
    <div className="sidebar">
      <div className="logo">
        <h2>EasyScores</h2>
      </div>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/Users">Users</Link>
        </li>
        <li>
          <a href="/h">Reports</a>
        </li>
        <li>
          <a href="/h">Combos</a>
        </li>
        <li>
          <a href="/h">Settings</a>
        </li>
      </ul>
    </div>
    // </div>
  );
};

export default SideBar;
