import './App.css';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/home/HomePage';
import SideBar from './pages/SideBar';
import Login from './pages/Login';

function App() {
  return (
    <Router basename="/">
    <SideBar />
    <div class="p-4 sm:ml-64">
    <Routes>
      {/* homepage */}
      <Route path="" element={<HomePage/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
    </Routes>
    </div>
    <>
    {/* <Footer/> */}
    </>
  </Router>
  );
}

export default App;
