import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import { GrFavorite } from "react-icons/gr";
import { MdOutlineFavorite } from "react-icons/md";

import axios from "axios";

const Courses = () => {
  const { role } = useContext(userContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const createCourses = () => {
    axios
      .get("http://localhost:5000/courses/all")
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
              <div className="py-4 px-8">
                <img
                  src={
                    course.instructorImage ||
                    "https://tailwindcss.com/img/jonathan.jpg"
                  }
                  className="rounded-full h-12 w-12 mb-4"
                  alt={course.instructorName}
                />
                <a href="#">
                  <h4 className="text-lg mb-3 font-semibold">{course.title}</h4>
                </a>
                <p className="mb-2 text-sm text-gray-600">
                  {course.description}
                </p>
                <img
                  src={
                    course.image ||
                    "https://images.pexels.com/photos/461077/pexels-photo-461077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  }
                  className="w-100"
                  alt={course.title}
                />
                <hr className="mt-4" />
                <span className="text-xs ">
                  <GrFavorite className="w-5 h-5 m-3 " />
                  <MdOutlineFavorite className="w-5 h-5 m-3" />
                </span>
                &nbsp;
                <span className="text-xs text-gray-500">{course.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
