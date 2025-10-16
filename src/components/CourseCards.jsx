import { FaArrowRight } from "react-icons/fa"; // For right arrow icon
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CourseCards = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("/coursecards.json") // Fetching the course data from the JSON file
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="w-[80%] mx-auto mt-10 mb-10">
      <h2 className="text-2xl font-bold text-center mb-4">
        আমাদের জনপ্রিয় কোর্সসমূহ
      </h2>
      <p className="text-center mb-5">আমাদের বিশেষ কোর্সসমূহ দেখে নিন এখনই।</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex items-center text-black bg-white p-6 shadow-lg rounded-md hover:bg-green-500 hover:text-white transition duration-300 ease-in-out"
          >
            {/* Left Icon */}
            <div className="text-3xl mr-4">{course.icon}</div>

            {/* Center Text */}
            <div className="flex-grow">
              <h3 className="text-xl font-bold">{course.title}</h3>
              <p className="text-sm">{course.description}</p>
            </div>

            {/* Right Arrow */}
            <div className="ml-4">
              <Link to={course.link}><FaArrowRight className="text-2xl"/></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCards;
