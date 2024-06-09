import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "../src/components/Login/Login";
import Register from "./components/Register/Register";
import { createContext, useState } from "react";
import Home from "./components/Home/Home";

export const userContext = createContext();
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  return (
    <>
      <userContext.Provider value={(token, userId, isLoggedIn)}>
        <Routes>
          {" "}
          <Route path="/" element={isLoggedIn && <Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </userContext.Provider>
    </>
  );
}

export default App;
