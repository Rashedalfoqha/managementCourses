import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import axios from "axios";

import { Link, useParams } from "react-router-dom";

const User = () => {
  const { role, token, userId } = useContext(userContext);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState({});
  const [message, setMessage] = useState(null);
  const { id } = useParams();

  const getUserInfo = () => {
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((result) => {
        console.log(result.data.result);
        setUserInfo(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserCourses = () => {
    axios
      .get(`http://localhost:5000/courses/${id}`)
      .then((result) => {
        if (result.data.result.length >= 0) {
          setCourses(result.data.result);
          setLoading(false);
        } else if (result.data.result.length < 0) {
          setMessage("he don't have any courses");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUserInfo();
    getUserCourses();
  }, [id]);

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
      .then(() => {
        console.log("added");
        setFavorites((prev) => ({ ...prev, [id]: true }));
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
      .then(() => {
        console.log("deleted");
        setFavorites((prev) => ({ ...prev, [id]: false }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <section class="w-full overflow-hidden dark:bg-gray-900">
        <div class="w-full mx-auto">
          <img
            src={
              userInfo && userInfo.cover
                ? userInfo.cover
                : "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt="User Cover"
            class="w-full xl:h-[20rem] lg:h-[22rem] md:h-[16rem] sm:h-[13rem] xs:h-[9.5rem]"
          />
          <div class="w-full mx-auto flex justify-center">
            <img
              src={
                userInfo && userInfo.image
                  ? userInfo.image
                  : "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt="User Profile"
              class="rounded-full object-cover xl:w-[16rem] xl:h-[16rem] lg:w-[16rem] lg:h-[16rem] md:w-[12rem] md:h-[12rem] sm:w-[10rem] sm:h-[10rem] xs:w-[8rem] xs:h-[8rem] outline outline-2 outline-offset-2 outline-yellow-500 shadow-xl relative xl:bottom-[7rem] lg:bottom-[8rem] md:bottom-[6rem] sm:bottom-[5rem] xs:bottom-[4.3rem]"
            />
          </div>

          <div class="xl:w-[80%] lg:w-[90%] md:w-[94%] sm:w-[96%] xs:w-[92%] mx-auto flex flex-col gap-4 justify-center items-center relative xl:-top-[6rem] lg:-top-[6rem] md:-top-[4rem] sm:-top-[3rem] xs:-top-[2.2rem]">
            <h1 class="text-center text-gray-800 dark:text-white text-4xl font-serif">
              {userInfo?.firstname} {userInfo?.lastname}
            </h1>
            <p class="w-full text-gray-700 dark:text-gray-400 text-md text-pretty sm:text-center xs:text-justify">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              debitis labore consectetur voluptatibus mollitia dolorem veniam
              omnis ut quibusdam minima sapiente repellendus asperiores
              explicabo, eligendi odit, dolore similique fugiat dolor,
              doloremque eveniet. Odit, consequatur. Ratione voluptate
              exercitationem hic eligendi vitae animi nam in, est earum culpa
              illum aliquam. Atque aperiam et voluptatum voluptate distinctio,
              nostrum hic voluptatibus nisi. Eligendi voluptatibus numquam
              maxime voluptatem labore similique qui illo est magnam adipisci
              autem quisquam, quia incidunt excepturi, possimus odit
              praesentium?
            </p>

            <div class="px-2 flex rounded-sm bg-gray-200 text-gray-500 dark:bg-gray-700 dark:bg-opacity-30 dark:text-gray-700 hover:text-gray-600 hover:dark:text-gray-400"></div>
          </div>
        </div>
      </section>
      {message && (
        <div className="mt-10 flex items-start">
          <p className="text-red-500 text-sm">{message}</p>
        </div>
      )}
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
            {courses.map((course, index) => (
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
                    <h4 className="text-lg mb-3 font-semibold">
                      <Link to={`/deatils/${course.id}`}> {course.title}</Link>
                    </h4>
                  </a>
                  <p className="mb-2 text-sm text-gray-600">
                    {course.description}
                  </p>
                  <img
                    src={
                      course?.photo
                        ? course.photo
                        : "https://images.pexels.com/photos/461077/pexels-photo-461077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    }
                    className="w-100"
                    alt={course?.title}
                  />
                  <hr className="mt-4" />
                  <div className="flex">
                    <button
                      onClick={() =>
                        favorites[course.id]
                          ? deleteFav(course.id)
                          : addFav(course.id)
                      }
                      className={`${
                        favorites[course.id] ? "text-red-500" : "text-gray-500"
                      }`}
                    >
                      {favorites[course.id] ? "Unfavorite" : "Favorite"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default User;
