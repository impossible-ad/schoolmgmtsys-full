import { Login } from "./assets/components/login";
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./assets/components/admin/Dashboard";
import Notfound from "./assets/components/shared/Notfound";

const App = () => {


  //return(<Login/>); [Alternative way to render the Login.jsx component]
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/not_found" element={<Notfound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );


};

export default App;