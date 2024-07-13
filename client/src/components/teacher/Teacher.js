import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Teacher = () => {
  const [teachers, setTeachers] = useState([]);

  const fetchTeachers = () => {
    axios
      .get("https://managementcourses.onrender.com/users/teacher/all")
      .then((response) => {
        setTeachers(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className="sm:grid lg:grid-cols-3 sm:grid-cols-2 gap-10 m-16">
      {teachers.map((teacher) => (
        <div
          key={teacher.id}
          className=" hover:text-white transition duration-300 max-w-sm rounded overflow-hidden shadow-lg"
        >
          <div className="py-4 px-8">
            <img
              src={teacher.image || "https://via.placeholder.com/150"}
              className="rounded-full h-12 w-12 mb-4"
              alt={teacher.firstName}
            />
            <Link to={`/user/${teacher.id}`}>
              <a href="#">
                <h1 className="text-lg mb-3 font-semibold text-gray-950 hover:text-red-700 hover:scale-110">
                  {teacher.firstname} {teacher.lastname}
                </h1>
              </a>
            </Link>

            <p className="mb-2 text-sm text-gray-600">{teacher.user_type}</p>
            <div className="flex justify-center mt-5 space-x-5"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Teacher;
