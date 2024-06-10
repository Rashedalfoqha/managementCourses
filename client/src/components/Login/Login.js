import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../App";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, token, userId, setUserId } = useContext(userContext);
  const [error, setError] = useState(null);

  const loginHandle = () => {
    axios
      .post("http://localhost:5000/users/login", {
        email: email,
        password: password
      })
      .then((result) => {
        const token = result.data.token;
        const roleId = result.data.role_id;
        const userId = result.data.userId;

        localStorage.setItem("token", token);
        localStorage.setItem("role", roleId);
        localStorage.setItem("userId", userId);
        console.log(result);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img
              src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
              className="w-32 mx-auto"
              alt="Logo"
            />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign in</h1>
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center"></div>

              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or Sign in with e-mail
                </div>
              </div>

              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  onClick={() => {
                    loginHandle();
                    navigate("/");
                  }}
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    {/* Sign in SVG Path */}
                  </svg>
                  {error && (
                <div className="mt-10 flex items-start">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}
                  <span className="ml-3">Sign in</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  You don't have an account{" "}
                  <Link
                    to="/register"
                    className="border-b pl-2 border-gray-500 border-dotted"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')"
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
