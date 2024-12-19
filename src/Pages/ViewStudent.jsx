import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteStudentAPI } from "../Services/AllAPI";

const ViewStudent = () => {
  const allStudents = useSelector(state=>state.students.students)
  const {id} = useParams()

  const student = allStudents.find((student=>student.id == id))
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/add/${student.id}`); 
  };

  const handleRemove = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to remove ${student.name}?`
    );
    if (confirmDelete) {
      try {
        // API call to delete the student
        await DeleteStudentAPI(student.id);
        alert(`${student.name} has been removed successfully.`);
        navigate("/");
      } catch (error) {
        console.error("Failed to remove student:", error);
        alert("Something went wrong while removing the student.");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Student Details</h1>

        <div className="space-y-4">
          <div>
            <strong>Name:</strong> <span>{student.name}</span>
          </div>
          <div>
            <strong>Cohort:</strong> <span>{student.cohort}</span>
          </div>
          <div>
            <strong>Courses:</strong>{" "}
            {student.course?.length ? (
              <ul className="list-disc ml-6">
                {student.course.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
            ) : (
              <span>No courses enrolled</span>
            )}
          </div>
          <div>
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded-lg ${
                student.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {student.status}
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Update Details
          </button>
          <button
            onClick={handleRemove}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Remove Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
