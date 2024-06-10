import React, { useContext, useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { IoMdLogIn } from "react-icons/io";

import { userContext } from "../../App";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const { token, role, isLoggedIn } = useContext(userContext);

  const [userInfo, setUserInfo] = useState(null);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
  };
  const getUserInfo = () => {
    axios
      .get("http://localhost:5000/users", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then((result) => {
        setUserInfo(result.data.result[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Link to="/">
                  <img
                    className="h-8 w-auto"
                    src={"https://i.ibb.co/BHJ4MRh/Untitled-1.png"}
                    alt="Your Company"
                  />
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                    aria-current="page"
                  >
                    <Link to="/courses"> Courses</Link>
                  </a>
                  <a
                    href="#"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    {role == 1 ? (
                      <Link to="/fav">My Courses</Link>
                    ) : (
                      <Link to="/teacher">teacher</Link>
                    )}
                  </a>

                  {role == 1 && (
                    <>
                      <a
                        href="#"
                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        <Link to="/newcourses"> Add New Courses </Link>
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {isLoggedIn && (
                <>
                  <Link to="/personal">
                    <div className="relative ml-3">
                      <div>
                        <button
                          type="button"
                          className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          id="user-menu-button"
                          aria-expanded="false"
                          aria-haspopup="true"
                        >
                          <span className="absolute -inset-1.5"></span>

                          <img
                            className="h-8 w-8 rounded-full"
                            src={
                              userInfo?.image ||
                              "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            }
                            alt="User Profile"
                          />
                        </button>
                      </div>
                    </div>
                  </Link>
                </>
              )}
              {isLoggedIn ? (
                <>
                  (
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Logout</span>
                    <AiOutlineLogout className="h-6 w-6" aria-hidden="true" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Logout</span>
                    <IoMdLogIn className="h-6 w-6" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
