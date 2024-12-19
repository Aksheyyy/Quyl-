import React, { useState, useEffect } from "react";
import { AddStudentAPI, EditStudentAPI } from "../Services/AllAPI";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    cohort: "",
    course: [],
    status: "Active",
  });

  const [newCourse, setNewCourse] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();


  const allStudents = useSelector((state) => state.students.students);
  const student = allStudents.find((student) => student.id == id);
  

  useEffect(() => {
    if (id) {
      setFormData({
        name: student.name || "",
        cohort: student.cohort || "",
        course: student.course || [],
        status: student.status || "Active",
      });
    }
  }, [id]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add a new course
  const handleAddCourse = () => {
    if (newCourse.trim()) {
      setFormData({ ...formData, course: [...formData.course, newCourse.trim()] });
      setNewCourse("");
    }
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.cohort) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      if(id){
        const updateResponse = await EditStudentAPI(formData,id)
        if(updateResponse.status == 200){
          alert("Details Updated Successfully")
          navigate('/')
        }
      }else{
        const response = await AddStudentAPI(formData);
        if (response.status === 201) {
        alert(`Student added successfully`);
        setFormData({ name: "", cohort: "", course: [], status: "Active" });
        navigate("/"); 
      }
      }
    } catch (error) {
      console.error("Error adding/updating student:", error);
      alert("Failed to save student details. Please try again.");
    }
  };

  const handleRemoveCourse = (index) => {
    setFormData({
      ...formData,
      course: formData.course.filter((_, i) => i !== index),
    });
  };
  

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Update Student" : "Add New Student"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        {/* Student Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold">
            Student Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter student name"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Cohort */}
        <div className="mb-4">
          <label htmlFor="cohort" className="block text-gray-700 font-semibold">
            Cohort
          </label>
          <input
            type="text"
            id="cohort"
            name="cohort"
            value={formData.cohort}
            onChange={handleInputChange}
            placeholder="Enter cohort (e.g., AY 2024-25)"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Courses */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Courses</label>
          <div className="flex items-center">
            <input
              type="text"
              value={newCourse}
              onChange={(e) => setNewCourse(e.target.value)}
              placeholder="Enter a course (e.g., Math)"
              className="mt-1 p-2 flex-1 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={handleAddCourse}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          {/* Display Added Courses */}
          {formData.course.length > 0 && (
            <div className="mt-2">
              <ul className="space-y-1">
                {formData.course.map((course, index) => (
                  <li
                    key={index}
                    className="inline-block bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700 mr-2"
                  >
                   <span>{course}</span>
                   <button
                    type="button"
                    onClick={() => handleRemoveCourse(index)}
                    className="text-red-500 hover:text-red-700 font-bold ml-2"
                    >
                    ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Status */}
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700 font-semibold">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
        >
          {id ? "Update Student" : "Add Student"}
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
