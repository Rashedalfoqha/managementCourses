import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { createContext, useState } from "react";
import Home from "./components/Home/Home";
import AddCourses from "./components/addCourses/AddCourses";
import Courses from "./components/courses/Courses";
import Nav from "./components/navbar/Nav";
import PersonalPage from "./components/personalPage/PersonalPage";
import CoursesDeatils from "./components/oneCourses/CoursesDeatils";
import Myfav from "./components/myCourses/MyCourses";
import User from "./components/user/User";
import Teacher from "./components/teacher/Teacher";

export const userContext = createContext();
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  return (
    <>
      <userContext.Provider value={{ token, userId, isLoggedIn, role }}>
        {isLoggedIn && <Nav />}
        <Routes>
          {" "}
          <Route path="/home" element={isLoggedIn && <Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/courses"
            element={role === 1 ? <AddCourses /> : <Courses />}
          />
          <Route path="/personal" element={<PersonalPage />} />
          <Route path="/newcourses" element={<AddCourses />} />
          <Route
            path="/deatils/:id"
            element={isLoggedIn && <CoursesDeatils />}
          />
          <Route path="/fav" element={<Myfav />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/teacher" element={<Teacher />} />
        </Routes>
      </userContext.Provider>
    </>
  );
}

export default App;
