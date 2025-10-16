import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "https://vertexforbcs.com/vartexforbcs/web/courses/data"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-[#242424] text-white px-[10%]">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold">Our Courses</h1>
        <p className="mt-4 text-lg text-gray-300">
          Explore our diverse range of courses and find the perfect one to boost
          your skills and knowledge.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 pb-12">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={course.courseImage}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-400 mb-4">
                {course.description.slice(0, 100)}...
              </p>
              <Link
                to={`/courses/${course.title}`}
                className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
              >
                View Course Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
