import React, { useState, useEffect } from "react";
import { GetAllStudentsAPI } from "../Services/AllAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allStudents } from "../Redux/StudentSlice";


const Dropdown = ({ selectedOption, setSelectedOption, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border px-4 py-2 rounded-lg bg-button-color text-gray-700 flex items-center"
      >
        {selectedOption}
        <span className="ml-2">
          <i className="fa-solid fa-chevron-down"></i>
        </span>
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                setIsOpen(false);
                setSelectedOption(option);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Table = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState("All");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const query = useSelector((state) => state.students.query);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const result = await GetAllStudentsAPI();
        setStudents(result.data);
        setFilteredStudents(result.data);
        dispatch(allStudents(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudents();
  }, [dispatch]);

  useEffect(() => {
    let filtered = students;
  
    // search query for courses
    if (query && typeof query === "string") {
      filtered = filtered.filter((student) =>
        student.course.some((course) =>
          course.toLowerCase().includes(query.toLowerCase()) 
        )
      );
    }
  
    // cohort filter
    if (selectedCohort !== "All") {
      filtered = filtered.filter(
        (student) =>
          student.cohort && student.cohort.toLowerCase() === selectedCohort.toLowerCase()
      );
    }
  
    // course filter
    if (selectedCourse !== "All") {
      filtered = filtered.filter(
        (student) =>
          student.course && student.course.some(course => 
            course.toLowerCase().includes(selectedCourse.toLowerCase())
          )
      );
    }
  
    setFilteredStudents(filtered);
  }, [query, selectedCohort, selectedCourse, students]);
  

  return (
    <div className="p-6 overflow-auto bg-gray-50 flex-1">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <Dropdown
            selectedOption={selectedCohort}
            setSelectedOption={setSelectedCohort}
            options={["All", "AY-2024-2025", "AY-2023-2024", "AY-2022-2023"]}
          />
          <Dropdown
            selectedOption={selectedCourse}
            setSelectedOption={setSelectedCourse}
            options={["All", "CBSE 9", "CBSE 10", "CBSE 11", "CBSE 12"]}
          />
        </div>

        <div>
          <button
            onClick={() => navigate("/add")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add new Student
          </button>
        </div>
      </div>

      <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-button-color text-gray-700">
          <tr>
            <th className="py-3 px-4 text-left">Student Name</th>
            <th className="py-3 px-4 text-left">Cohort</th>
            <th className="py-3 px-4 text-left">Courses</th>
            <th className="py-3 px-4 text-left">Date Joined</th>
            <th className="py-3 px-4 text-left">Last Login</th>
            <th className="py-3 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {filteredStudents.map((student) => (
            <tr
              key={student.id}
              onClick={() => navigate(`/student/${student.id}`)}
              className="hover:bg-gray-100 cursor-pointer"
            >
              <td className="py-3 px-4">{student.name}</td>
              <td className="py-3 px-4">{student.cohort}</td>
              <td className="py-3 px-4 flex space-x-2">
                {student.course.slice(0, 2).map((course, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded-lg text-sm ${
                      index === 0 ? "bg-red-200" : "bg-yellow-200"
                    }`}
                  >
                    {course}
                  </span>
                ))}
              </td>
              <td className="py-3 px-4">{new Date(student.createdAt).toLocaleDateString()}</td>
              <td className="py-3 px-4">17. Nov. 2024 4:16 PM</td>
              <td className="py-3 px-4">
                {student.status === "Active" ? (
                  <span className="h-4 w-4 bg-green-active rounded-full inline-block"></span>
                ) : (
                  <span className="h-4 w-4 bg-red-inactive rounded-full inline-block"></span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
