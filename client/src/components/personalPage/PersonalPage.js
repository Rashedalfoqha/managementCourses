import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import axios from "axios";
import { GrFavorite } from "react-icons/gr";
import { MdOutlineFavorite } from "react-icons/md";
import { storage } from "../../FireBase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const PersonalPage = () => {
  const { role, token, userId } = useContext(userContext);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [coverUrl, setCoverUrl] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [coverUpload, setCoverUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [coverList, setCoverList] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");

  const imageListRef = ref(storage, `images/`);
  const coverListRef = ref(storage, `covers/`);

  const updateUserData = (e) => {
    e.preventDefault();

    const isDataModified =
      firstName !== userInfo.firstname ||
      lastName !== userInfo.lastname ||
      country !== userInfo.country ||
      imageUrl !== userInfo.image ||
      coverUrl !== userInfo.cover;

    if (isDataModified) {
      axios
        .put(
          "http://localhost:5000/users/update",
          {
            image: imageUrl || userInfo.image,
            cover: coverUrl || userInfo.cover,
            firstName: firstName || userInfo.firstName,
            lastName: lastName || userInfo.lastName,
            country: country || userInfo.country
          },
          {
            headers: {
              authorization: `Bearer ${token}`
            }
          }
        )
        .then((result) => {
          console.log(result);
          closeModal();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      closeModal();
    }
  };
  const handleFileChangeImage = (e) => {
    setImageUpload(e.target.files[0]);
  };

  const handleFileChangeCover = (e) => {
    setCoverUpload(e.target.files[0]);
  };

  const uploadImage = () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
        console.log("Image uploaded:", url);
      });
    });
  };

  const uploadCover = () => {
    if (coverUpload === null) return;
    const coverRef = ref(storage, `covers/${coverUpload.name + v4()}`);
    uploadBytes(coverRef, coverUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setCoverUrl(url);
        console.log("cover uploaded:", url);
      });
    });
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });

    listAll(coverListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setCoverList((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  useEffect(() => {
    getUserInfo();
    getUserCourses();
  }, []);
  return (
    <>
      <section class="w-full overflow-hidden dark:bg-gray-900">
        <div class="w-full mx-auto">
          <img
            src={
              userInfo.cover ||
              "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt="User Cover"
            class="w-full xl:h-[20rem] lg:h-[22rem] md:h-[16rem] sm:h-[13rem] xs:h-[9.5rem]"
          />
          <div class="w-full mx-auto flex justify-center">
            <img
              src={
                userInfo.image ||
                "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              alt="User Profile"
              class="rounded-full object-cover xl:w-[16rem] xl:h-[16rem] lg:w-[16rem] lg:h-[16rem] md:w-[12rem] md:h-[12rem] sm:w-[10rem] sm:h-[10rem] xs:w-[8rem] xs:h-[8rem] outline outline-2 outline-offset-2 outline-yellow-500 shadow-xl relative xl:bottom-[7rem] lg:bottom-[8rem] md:bottom-[6rem] sm:bottom-[5rem] xs:bottom-[4.3rem]"
            />
          </div>
          {isModalOpen && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
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
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start w-full h-full">
                      <form className="p-16" onSubmit={updateUserData}>
                        <div className="mb-6">
                          <label
                            htmlFor="title"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            FirstName
                          </label>
                          <input
                            type="text"
                            id="FirstName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="FirstName"
                            onChange={(e) => {
                              setFirstName(e.target.value);
                            }}
                          />
                        </div>
                        <div className="mb-6">
                          <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            LastName
                          </label>
                          <input
                            type="text"
                            id="LastName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="LastName ..."
                            onChange={(e) => {
                              setLastName(e.target.value);
                            }}
                          />
                        </div>
                        <div className="mb-6">
                          <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            country
                          </label>
                          <input
                            type="text"
                            id="country"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Description ..."
                            onChange={(e) => {
                              setCountry(e.target.value);
                            }}
                          />
                        </div>

                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <label
                            htmlFor="dropzone-image"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 dark:hover:border-gray-500"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                viewBox="0 0 20 16"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload user Photo
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                              </p>
                            </div>
                            <input
                              id="dropzone-image"
                              type="file"
                              className="hidden"
                              onChange={handleFileChangeImage}
                            />
                          </label>
                          {imageUpload && (
                            <button
                              onClick={uploadImage}
                              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
                            >
                              Upload Image
                            </button>
                          )}
                          {imageUrl && (
                            <img
                              src={imageUrl}
                              alt="Uploaded Image"
                              className="mt-4 max-w-full"
                            />
                          )}
                        </div>

                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <label
                            htmlFor="dropzone-cover"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 dark:hover:border-gray-500"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                viewBox="0 0 20 16"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload Cover User
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                              </p>
                            </div>
                            <input
                              id="dropzone-cover"
                              type="file"
                              className="hidden"
                              onChange={handleFileChangeCover}
                            />
                          </label>
                          {coverUpload && (
                            <button
                              onClick={uploadCover}
                              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
                            >
                              Upload cover
                            </button>
                          )}
                          {coverUrl && (
                            <cover controls className="mt-4 max-w-full">
                              <source src={coverUrl} type="cover/mp4" />
                              Your browser does not support the cover tag.
                            </cover>
                          )}
                        </div>

                        <div className="flex items-start mb-6">
                          <div className="flex items-center h-5">
                            <input
                              id="agreeTerms"
                              type="checkbox"
                              value=""
                              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                            />
                          </div>
                          <label
                            htmlFor="agreeTerms"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            I agree with the{" "}
                            <a
                              href="#"
                              className="text-blue-600 hover:underline dark:text-blue-500"
                            >
                              update data
                            </a>
                            .
                          </label>
                        </div>

                        <button
                          type="submit"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Submit
                        </button>
                      </form>
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
            {userId == userInfo.id && (
              <button
                onClick={() => {
                  openModal();
                }}
                className="py-3 px-4 inline-flex items-center   text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Update user information
              </button>
            )}
            <div class="px-2 flex rounded-sm bg-gray-200 text-gray-500 dark:bg-gray-700 dark:bg-opacity-30 dark:text-gray-700 hover:text-gray-600 hover:dark:text-gray-400"></div>
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
                      {course.title}
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

export default PersonalPage;
