import { Login } from "./assets/components/login";
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./assets/components/admin/Dashboard";

const App = () => {


  //return(<Login/>); [Alternative way to render the Login.jsx component]
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );


};

export default App;