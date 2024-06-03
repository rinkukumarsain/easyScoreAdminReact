import './App.css';
import Login from './routes/Login.jsx';
// import Root from './routes/Root';
import Game from './routes/Game';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// RootLoader()
function App() {
  console.log("--==")
  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Login />} />
        {/* <Route path='/' element={<Root />} /> */}
        <Route path='/game' element={<Game />} />
        {/* <Route path='/start' element={<Game />} />
        <Route path='/result' element={<Score />} />
        <Route path='*' element={<h1> 404 Not Found </h1>} /> */}
      </Routes>
    </BrowserRouter >
    //  }
  )
}

export default App;
