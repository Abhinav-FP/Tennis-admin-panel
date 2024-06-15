import './App.css';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/home/HomePage';
import SideBar from './pages/SideBar';
import Login from './pages/Login';
import AddRanking from './pages/AddRanking';
import AuthLayout from './pages/AuthLayout';

function App() {
  return (
    <Router basename="/">
    <SideBar />
    <div className="p-4 sm:ml-64">
      <AuthLayout>
    <Routes>
      {/* homepage */}
      <Route path="" element={<HomePage/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/ranking/add" element={<AddRanking/>}></Route>
    </Routes>
    </AuthLayout>
    </div>
    <>
    {/* <Footer/> */}
    </>
  </Router>
  );
}

export default App;
