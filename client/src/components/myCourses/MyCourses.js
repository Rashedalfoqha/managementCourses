import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import { Link } from "react-router-dom";

const Myfav = () => {
  const { token, userId } = useContext(userContext);
  const [fav, setFav] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(true);

  const addFav = (id) => {
    axios
      .post(
        "http://localhost:5000/fav/add",
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
        `http://localhost:5000/fav/delete/${userId}`,
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
  const myFav = () => {
    axios
      .get("http://localhost:5000/fav", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then((result) => {
        setFav(result.data.result);
        console.log(result.data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    myFav();
  }, []);
  return (
    <div>
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
            {fav.map((course) => (
              <div
                key={course.userId}
                className="hover:bg-gray-900 hover:text-white transition duration-300 max-w-sm rounded overflow-hidden shadow-lg"
                onClick={() => {
                  console.log(course.id);
                }}
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
                  <Link to={`/deatils/${course.id}`}>
                    {" "}
                    <a href="#">
                      <h4 className="text-lg mb-3 font-semibold">
                        {course.title}
                      </h4>
                    </a>
                  </Link>
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
                </div>
                <div className="flex">
                  <button
                    className={`rounded-full w-10 h-10 bg-white p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 ${
                      isFavorite ? "text-red-500" : ""
                    }`}
                    onClick={() => {
                      if (isFavorite) {
                        deleteFav(course.id);
                        setIsFavorite(false);
                      } else {
                        addFav(course.id);
                        setIsFavorite(true);
                      }
                    }}
                  >
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Myfav;
