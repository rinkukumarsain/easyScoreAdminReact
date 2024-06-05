import './App.css';
import Login from './routes/Login.jsx';
import Users from './routes/UsersTable.jsx';
// import api from './routes/api.jsx';
// import Root from './routes/Root';
import Dashboard from './routes/Dashboard.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SideBar from './routes/SideBar.jsx';
// RootLoader()
function App() {
  const token = localStorage.getItem('token');
  return (
    <BrowserRouter >
      <div className="d-flex">
        <SideBar />
        <Routes>
          <Route path='/' element={token ? <Dashboard /> : <Login />} />
          <Route path='/dashboard' element={token ? <Dashboard /> : <Login />} />
          <Route path='/Users' element={token ? <Users /> : <Login />} />
          {/* <Route path='/' element={<Root />} /> */}
          {/* <Route path='/game' element={<Game />} /> */}
          {/* <Route path='/start' element={<Game />} />
        <Route path='/result' element={<Score />} />
        <Route path='*' element={<h1> 404 Not Found </h1>} /> */}
        </Routes>
      </div>
    </BrowserRouter >
    //  }
  )
}

export default App;
