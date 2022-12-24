import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Forgot from "./component/forgot";
import Reset from "./component/reset";
import Login from "./component/signup";
import Home from "./component/Dashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/reset/:id/:token" element={<Reset />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
