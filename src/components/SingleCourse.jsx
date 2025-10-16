import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleCourse = () => {
  const { title } = useParams(); // Get the course title from the URL
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        // Find the course that matches the title
        const foundCourse = data.find(
          (course) => course.title.toLowerCase() === title.toLowerCase()
        );

        if (!foundCourse) {
          throw new Error("Course not found");
        }

        setCourseData(foundCourse);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [title]);

  // Convert days to weeks
  const convertDaysToWeeks = (days) => Math.ceil(days / 7);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!courseData) return null; // In case courseData is still null

  const {
    courseImage,
    startDate,
    endDate,
    category,
    level,
    duration, // duration in days
    studentsEnrolled,
    quizzes, // Assuming quizzes are part of the courseData
  } = courseData;

  return (
    <div className="p-4 px-[10%]">
      <h2 className="text-3xl font-bold text-center mb-4">
        {courseData.title}
      </h2>
      {courseImage && (
        <img
          src={courseImage}
          alt={courseData.title}
          className="mt-4 mb-4 max-h-48 mx-auto"
        />
      )}
      <div className="text-center mb-8">
        <p>
          <strong>Start Date:</strong> {startDate}
        </p>
        <p>
          <strong>End Date:</strong> {endDate}
        </p>
        <p>
          <strong>Category:</strong> {category}
        </p>
        <p>
          <strong>Level:</strong> {level}
        </p>
        <p>
          <strong>Duration (in weeks):</strong> {convertDaysToWeeks(duration)}{" "}
          weeks
        </p>
        <p>
          <strong>Students Enrolled:</strong> {studentsEnrolled}
        </p>
      </div>

      <h3 className="mt-8 mb-2 text-xl font-semibold">Description</h3>
      <p>{courseData.description}</p>

      <h3 className="mt-8 mb-2 text-xl font-semibold">Syllabus</h3>
      <div>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quizzes.map((quiz) => (
            <div key={quiz.quizId} className="p-2">
              <li>{quiz.quizTitle}</li>
            </div>
          ))}
        </ul>
      </div>

      <h3 className="mt-8 mb-2 text-xl font-semibold">Academic Calendar</h3>
      <table className="min-w-full bg-gray-800 border border-gray-700">
        <thead>
          <tr>
            <th className="py-2 px-4 text-left text-white">Quiz Title</th>
            <th className="py-2 px-4 text-left text-white">Quiz Date</th>
            <th className="py-2 px-4 text-left text-white">Start Time</th>
            <th className="py-2 px-4 text-left text-white">End Time</th>
            <th className="py-2 px-4 text-left text-white">Duration</th>
            <th className="py-2 px-4 text-left text-white">Marks</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz, index) => (
            <tr
              key={quiz.quizId}
              className={`${
                index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
              } border-b border-gray-600`}
            >
              <td className="py-2 px-4 text-white">{quiz.quizTitle}</td>
              <td className="py-2 px-4 text-white">{quiz.quizDate}</td>
              <td className="py-2 px-4 text-white">{quiz.startTime}</td>
              <td className="py-2 px-4 text-white">{quiz.endTime}</td>
              <td className="py-2 px-4 text-white">{quiz.duration}</td>
              <td className="py-2 px-4 text-white">{quiz.totalMarks}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {courseData.images && courseData.images.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Syllabus</h3>
          <div className="grid grid-cols-3 gap-4">
            {courseData.imagesGallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-auto"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleCourse;
