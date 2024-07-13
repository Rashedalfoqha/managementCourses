import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import { GrFavorite } from "react-icons/gr";
import { MdOutlineFavorite } from "react-icons/md";

import axios from "axios";
import { Link } from "react-router-dom";

const Courses = () => {
  const { role, token } = useContext(userContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const addFav = (id) => {
    axios
      .post(
        `https://managementcourses.onrender.com/fav/add`,
        { course_id: id },
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      )
      .then((result) => {
        console.log("added to fav");
        setIsFavorite(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteFav = (id) => {
    axios
      .delete(
        `https://managementcourses.onrender.com/fav/delete/${id}`,
        { course_id: id },
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      )
      .then((result) => {
        console.log("deleted to fav");
        setIsFavorite(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createCourses = () => {
    axios
      .get("https://managementcourses.onrender.com/courses/all")
      .then((result) => {
        setCourses(result.data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    const createCourses = () => {
      axios
        .get("https://managementcourses.onrender.com/courses/all")
        .then((result) => {
          setCourses(result.data.result);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };

    createCourses();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto p-16">
      {loading ? (
        <div className="relative flex justify-center items-center">
          <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
          <img
            src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
            className="rounded-full h-28 w-28"
            alt="Loading"
          />
        </div>
      ) : (
        <div className="sm:grid lg:grid-cols-3 sm:grid-cols-2 gap-10">
          {courses.map((course) => (
            <div
              key={course.userId}
              className="hover:bg-gray-900 hover:text-white transition duration-300 max-w-sm rounded overflow-hidden shadow-lg"
            >
              <Link to={`/deatils/${course.id}`}>
                {" "}
                <button
                  type="button"
                  class="relative left-48 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-end inline-flex items-end dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Choose plan
                  <svg
                    class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </Link>
              <div className="py-4 px-8">
                <Link to={`/user/${courses.user_id}`}>
                  <div>
                    <img
                      src={
                        course.image
                          ? course.image
                          : "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                      className="rounded-full h-12 w-12 mb-4"
                      alt={course.image}
                    />
                  </div>
                </Link>

                <a href="#">
                  <h4 className="text-lg mb-3 font-semibold">{course.title}</h4>
                </a>
                <p className="mb-2 text-sm text-gray-600">
                  {course.description}
                </p>
                <img
                  src={
                    course.photo ||
                    "https://images.pexels.com/photos/461077/pexels-photo-461077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  }
                  className="w-100"
                  alt={course.title}
                />
                <hr className="mt-4" />
                <div className="flex"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
