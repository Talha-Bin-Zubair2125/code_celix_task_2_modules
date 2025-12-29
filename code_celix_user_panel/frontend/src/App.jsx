import Login from "./components/login";
import Register from "./components/register";
import Userprofile from "./components/userprofile";
import Complaint from "./components/complaint";
import Feedback from "./components/feedback";
import Viewhistory from "./components/viewhistory";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./Stylings/Styles.css";

function App() {
  return (
    <>
      {/* Link internally uses router context (useContext).
          Since there is no BrowserRouter above it, the context is null. */}
      <BrowserRouter>
        {/* <nav>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </nav> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userprofile" element={<Userprofile />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/viewhistory" element={<Viewhistory />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
