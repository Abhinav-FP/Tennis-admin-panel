import './App.css';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import AddRanking from './pages/AddRanking';
// import AuthLayout from './pages/AuthLayout';
import { useEffect } from 'react';
import Details from './pages/api/Details';

function App() {

  useEffect(() => {
    const main = new Details();
    const response=main.check();
  }, []);

  return (
    <Router basename="/">
    {/* <SideBar /> */}
    {/* <div className="p-4 sm:ml-64"> */}
      {/* <AuthLayout> */}
    <Routes>
      <Route path="" element={<AddRanking/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
    </Routes>
    {/* </AuthLayout> */}
    {/* </div> */}
  </Router>
  );
}

export default App;
