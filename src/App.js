
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard.jsx";
import Landing from "./pages/Landing.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Landing/>} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;