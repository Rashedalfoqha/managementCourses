import React, { useContext } from "react";
import { userContext } from "../../App";

const AddCourses = () => {
  const { role } = useContext(userContext);
  console.log(role);
  return (
    <>
      {role === 1 && (
        <div className="flex justify-center">
          <h1>dsdadsad</h1>
        </div>
      )}
    </>
  );
};

export default AddCourses;
