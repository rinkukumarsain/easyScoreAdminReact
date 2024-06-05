export const SideBar = () => {
  return (
    // <div className="container">
    <div className="sidebar">
      <div className="logo">
        <h2>EasyScores</h2>
      </div>
      <ul>
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/Users">Users</a>
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
