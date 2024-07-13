import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { userContext } from "../../App";
import { storage } from "../../FireBase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import "./index.css";

const CoursesDetails = () => {
  const navigate = useNavigate();
  const { token, userId } = useContext(userContext);
  const { id } = useParams();
  const [coursesInfo, setCoursesInfo] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [photo, setPhoto] = useState("");
  const [video, setVideo] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [videoUrl, setvideoUrl] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [videoUpload, setvideoUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [videoList, setvideoList] = useState([]);
  const imageListRef = ref(storage, `images/`);
  const videoListRef = ref(storage, `videos/`);
  const handleFileChangeImage = (e) => {
    setImageUpload(e.target.files[0]);
  };

  const handleFileChangevideo = (e) => {
    setvideoUpload(e.target.files[0]);
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

  const uploadvideo = () => {
    if (videoUpload === null) return;
    const videoRef = ref(storage, `videos/${videoUpload.name + v4()}`);
    uploadBytes(videoRef, videoUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setvideoUrl(url);
        console.log("video uploaded:", url);
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

    listAll(videoListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setvideoList((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  const openUpdate = () => {
    setIsModalOpenUpdate(true);
  };

  const closeModalUpdate = () => {
    setIsModalOpenUpdate(false);
  };
  const openDelete = () => {
    setIsModalOpenDelete(true);
  };

  const closeModalDelete = () => {
    setIsModalOpenDelete(false);
  };
  const deleteCourses = (e) => {
    e.preventDefault();

    axios
      .delete(`https://managementcourses.onrender.com/courses/delete/${coursesInfo.id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then((result) => {
        closeModalDelete();
        navigate("/fav");
        console.log(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateData = (e) => {
    e.preventDefault();

    const isDataModified =
      photo !== coursesInfo.photo ||
      video !== coursesInfo.video ||
      title !== coursesInfo.title ||
      description !== coursesInfo.description;

    if (isDataModified) {
      axios
        .put(
          `https://managementcourses.onrender.com/courses/update/${coursesInfo.id}`,
          {
            photo: imageUrl || coursesInfo.photo,
            video: videoUrl || coursesInfo.video,
            title: title || coursesInfo.title,
            description: description || coursesInfo.description
          },
          {
            headers: {
              authorization: `Bearer ${token}`
            }
          }
        )
        .then((result) => {
          console.log(result);
          closeModalUpdate();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      closeModalUpdate();
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
        console.log("added course with ID:", id);
        setIsFavorite(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteFav = (id) => {
    axios
      .delete(`https://managementcourses.onrender.com/fav/delete/${id}`, {
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
      .get(`https://managementcourses.onrender.com/courses/${id}`)
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
                        className="w-full h-full object-video"
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
        {isModalOpenDelete && (
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
                  <div className="w-full h-80 flex flex-col justify-center items-center relative">
                    <h1 className="text-center align-middle text-5xl">
                      are you sure delete course ?
                    </h1>
                    <button
                      onClick={deleteCourses}
                      className="mt-8 py-3 px-4 inline-flex items-center justify-center text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={closeModalDelete}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {isModalOpenUpdate && (
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
                    <form className="p-16 w-full" onSubmit={updateData}>
                      <div className="mb-6">
                        <label
                          htmlFor="description"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Title
                        </label>
                        <input
                          type="Title"
                          id="Title"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Title ..."
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="description"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Description
                        </label>
                        <input
                          type="text"
                          id="Description"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Description ..."
                          onChange={(e) => {
                            setDescription(e.target.value);
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
                          htmlFor="dropzone-video"
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
                                Click to upload video User
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                          <input
                            id="dropzone-video"
                            type="file"
                            className="hidden"
                            onChange={handleFileChangevideo}
                          />
                        </label>
                        {videoUpload && (
                          <button
                            onClick={uploadvideo}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
                          >
                            Upload video
                          </button>
                        )}
                        {videoUrl && (
                          <video controls className="mt-4 max-w-full">
                            <source src={videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
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
                    className="mt-3  w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={closeModalUpdate}
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
            className="lg:w-1/2 w-full lg:h-auto h-64 object-video object-center rounded"
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
            {coursesInfo.user_id == userId && (
              <button
                onClick={openUpdate}
                className="py-3 px-4 inline-flex items-center text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                update
              </button>
            )}
            {coursesInfo.user_id == userId && (
              <button
                onClick={openDelete}
                className="py-3 px-4 inline-flex items-center text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                delete
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesDetails;
