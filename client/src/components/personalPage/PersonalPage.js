import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import axios from "axios";
import { GrFavorite } from "react-icons/gr";
import { MdOutlineFavorite } from "react-icons/md";

const PersonalPage = () => {
  const { role, token, userId } = useContext(userContext);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  const getUserInfo = () => {
    axios
      .get("http://localhost:5000/users", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then((result) => {
        console.log(result.data.result[0]);
        setUserInfo(result.data.result[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUserCourses = () => {
    axios
      .get("http://localhost:5000/courses", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then((result) => {
        console.log(result.data.result);
        setCourses(result.data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUserInfo();
    getUserCourses();
  }, []);
  return (
    <>
      <section class="w-full overflow-hidden dark:bg-gray-900">
        <div class="w-full mx-auto">
          <img
            src={userInfo.cover}
            alt="User Cover"
            class="w-full xl:h-[20rem] lg:h-[22rem] md:h-[16rem] sm:h-[13rem] xs:h-[9.5rem]"
          />

          <div class="w-full mx-auto flex justify-center">
            <img
              src={userInfo.photo}
              alt="User Profile"
              class="rounded-full object-cover xl:w-[16rem] xl:h-[16rem] lg:w-[16rem] lg:h-[16rem] md:w-[12rem] md:h-[12rem] sm:w-[10rem] sm:h-[10rem] xs:w-[8rem] xs:h-[8rem] outline outline-2 outline-offset-2 outline-yellow-500 shadow-xl relative xl:bottom-[7rem] lg:bottom-[8rem] md:bottom-[6rem] sm:bottom-[5rem] xs:bottom-[4.3rem]"
            />
          </div>

          <div class="xl:w-[80%] lg:w-[90%] md:w-[94%] sm:w-[96%] xs:w-[92%] mx-auto flex flex-col gap-4 justify-center items-center relative xl:-top-[6rem] lg:-top-[6rem] md:-top-[4rem] sm:-top-[3rem] xs:-top-[2.2rem]">
            <h1 class="text-center text-gray-800 dark:text-white text-4xl font-serif">
              {userInfo.firstname} {userInfo.lastname}
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

            <div class="px-2 flex rounded-sm bg-gray-200 text-gray-500 dark:bg-gray-700 dark:bg-opacity-30 dark:text-gray-700 hover:text-gray-600 hover:dark:text-gray-400">
              <a href="https://www.linkedin.com/in/samuel-abera-6593a2209/">
                <div
                  data-title="LinkedIn"
                  class="p-2 hover:text-primary hover:dark:text-primary"
                >
                  <svg
                    class="w-8 h-8 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                      clip-rule="evenodd"
                    />
                    <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                  </svg>
                </div>
              </a>
              <a href="https://twitter.com/Samuel7Abera7">
                <div
                  data-title="X"
                  class="p-2 hover:text-primary hover:dark:text-primary"
                >
                  <svg
                    class="w-8 h-8 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
                  </svg>
                </div>
              </a>
              <a href="">
                <div
                  data-title="Facebook"
                  class="p-2 hover:text-blue-500 hover:dark:text-blue-500"
                >
                  <svg
                    class="w-8 h-8 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </a>
              <a href="https://www.youtube.com/@silentcoder7">
                <div
                  data-title="Youtube"
                  class="p-2 hover:text-primary hover:dark:text-primary"
                >
                  <svg
                    class="w-8 h-8 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
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
                    <h4 className="text-lg mb-3 font-semibold">
                      {course.title}
                    </h4>
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
                  <span className="text-xs ">
                    <GrFavorite className="w-5 h-5 m-3 " />
                    <MdOutlineFavorite className="w-5 h-5 m-3" />
                  </span>
                  &nbsp;
                  <span className="text-xs text-gray-500">
                    {course.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PersonalPage;
