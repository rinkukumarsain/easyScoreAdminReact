import './App.css';

import { useLocation } from 'react-router-dom';
import SideBar from './routes/SideBar.jsx';
import { ToastContainer } from 'react-toastify';
import Routers from './rou/Routes.jsx';

function App() {
  const { pathname } = useLocation();
  return (
    <>
      <div className="d-flex">
        {pathname !== '/login' ? <SideBar /> : <></>}
        <Routers />
      </div>
      <ToastContainer />
    </>
  )
}

export default App;
