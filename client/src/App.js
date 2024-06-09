import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "../src/components/Login/Login";
import Register from "./components/Register/Register";
import { createContext, useState } from "react";

export const userContext = createContext();
function App() {
const [token, setToken] = useState("")
const [userId, setUserId] = useState("")
  return (
    <>
      <userContext.Provider value={(setToken, token, userId, setUserId)}>
        <Routes>
          {" "}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </userContext.Provider>
    </>
  );
}

export default App;
