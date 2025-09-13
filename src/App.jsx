import { Routes, Route } from "react-router";
import "./App.css";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Resister } from "./components/Resister";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Resister />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
