import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { userContext } from "../../App";

const CoursesDetails = () => {
  const { token } = useContext(userContext);
  const { id } = useParams();
  const [coursesInfo, setCoursesInfo] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const addFav = (id) => {
    axios
      .post(
        `http://localhost:5000/fav/add`,
        { course_id: id },
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      )
      .then((result) => {
        console.log("added course with ID:", id);
        setIsFavorite(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteFav = (id) => {
    axios
      .delete(
        `http://localhost:5000/fav/delete/${id}`,
        { course_id: id },
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      )
      .then((result) => {
        console.log("Deleting course with ID:", id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const detailsCourses = () => {
    axios
      .get(`http://localhost:5000/courses/${id}`)
      .then((result) => {
        console.log(result.data.result);
        setCoursesInfo(result.data.result[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    detailsCourses();
  }, []);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex">
          <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
            <Link to="/courses"> Go to all course</Link>
          </button>
        </div>
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={coursesInfo?.photo || "https://dummyimage.com/400x400"}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {coursesInfo?.firstname} {coursesInfo?.lastname}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {coursesInfo?.title}{" "}
            </h1>

            <p className="leading-relaxed">{coursesInfo?.description}</p>

            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <button
                  className={`rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 ${
                    isFavorite ? "text-red-500" : ""
                  }`}
                  onClick={() => {
                    if (isFavorite) {
                      deleteFav(id);
                      setIsFavorite(false);
                    } else {
                      addFav(id);
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesDetails;
