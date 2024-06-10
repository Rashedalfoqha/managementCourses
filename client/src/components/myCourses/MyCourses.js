import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import { Link } from "react-router-dom";

const Myfav = () => {
  const { token, userId } = useContext(userContext);
  const [fav, setFav] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});

  const deleteFav = (id) => {
    axios
      .delete(`http://localhost:5000/fav/delete/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        console.log("deleted", id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const myFav = () => {
    axios
      .get("http://localhost:5000/courses/users/cour", {
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
            {fav.map((course, index) => (
              <div
                key={index}
                className="hover:bg-gray-900 hover:text-white transition duration-300 max-w-sm rounded overflow-hidden shadow-lg"
              >
                <div className="py-4 px-8">
                  
                  <Link to={`/deatils/${course.id}`}>
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
                      course.photo
                        ? course.photo
                        : "https://images.pexels.com/photos/461077/pexels-photo-461077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    }
                    className="w-100"
                    alt={course.title}
                  />
                  <div className="flex justify-between mt-4">
                    <button
                      className="text-red-500 hover:text-red-700 mr-4"
                      onClick={() => deleteFav(course.id)}
                    >
                      Delete
                    </button>
                    <Link
                      to={`/edit/${course.id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </Link>
                  </div>
                  <hr className="mt-4" />
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
