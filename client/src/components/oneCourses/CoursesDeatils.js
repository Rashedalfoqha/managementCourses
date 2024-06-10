import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { userContext } from "../../App";
import "./index.css";

const CoursesDetails = () => {
  const { token } = useContext(userContext);
  const { id } = useParams();
  const [coursesInfo, setCoursesInfo] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      .delete(`http://localhost:5000/fav/delete/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then((result) => {
        console.log("Deleting course with ID:", id);
        setIsFavorite(false);
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

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex + 1 === coursesInfo.video.length ? 0 : prevIndex + 1
    );
  };
  const handleBackVideo = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex - 1 === coursesInfo.video.length ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    detailsCourses();
  }, []);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        {isModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen text-center">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-full sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="w-full h-screen relative">
                    <div className="absolute inset-0 overflow-hidden">
                      <video
                        className="w-full h-full object-cover"
                        src={coursesInfo.video[currentVideoIndex]}
                        type="video/mp4"
                        autoPlay
                        muted
                        loop
                      ></video>
                      <button
                        className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded"
                        onClick={handleNextVideo}
                      >
                        Next Video
                      </button>
                      <button
                        className="absolute bottom-4 left-4 bg-white text-black px-4 py-2 rounded"
                        onClick={handleBackVideo}
                      >
                        back Video
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex">
          <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
            <Link to="/courses"> Go to all courses</Link>
          </button>
        </div>
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={coursesInfo?.photo || "https://dummyimage.com/400x400"}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <Link to={`/user/${coursesInfo.user_id}`}>
              <h1 className="title-font text-gray-950 tracking-widest text-2xl">
                {coursesInfo?.firstname} {coursesInfo?.lastname}
              </h1>
            </Link>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {coursesInfo?.title}{" "}
            </h1>

            <p className="leading-relaxed">{coursesInfo?.description}</p>

            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <button
                onClick={openModal}
                className="py-3 px-4 inline-flex items-center text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                An introductory video about the course
              </button>
              <div className="flex">
                <button
                  className={`rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 ${
                    isFavorite ? "text-red-500" : ""
                  }`}
                  onClick={() => {
                    if (isFavorite) {
                      deleteFav(id);
                    } else {
                      addFav(id);
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
