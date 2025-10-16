import { useEffect, useState } from "react";
import { useStudentAuth } from "../../../../providers/StudentAuthProvider"; // Adjust the import path as necessary
import { Link } from "react-router-dom"; // Import Link for navigation

const StudentCourses = () => {
  const { studentId } = useStudentAuth(); // Get studentId from auth
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!studentId) {
        // If studentId is not available, stop loading
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://vertexforbcs.com/vartexforbcs/web/student/${studentId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        const data = await response.json();
        setStudent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading regardless of the outcome
      }
    };

    fetchStudentData();
  }, [studentId]); // Depend on studentId

  if (loading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!student) {
    return <p>No student data found.</p>;
  }

  // Get the enrolled courses for the student
  const enrolledCourses = student.courses || [];

  // Function to format course title for the URL
  const formatCourseTitle = (title) => {
    return title.toLowerCase().replace(/ /g, "%20");
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Enrolled Courses</h1>
      {enrolledCourses.length > 0 ? (
        <table className="min-w-full bg-gray-800 border border-gray-700">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left text-white">Course Title</th>
              <th className="py-2 px-4 text-left text-white">
                Upcoming Quizzes
              </th>
              <th className="py-2 px-4 text-left text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrolledCourses.map((enrolledCourse) => (
              <tr
                key={enrolledCourse.courseID}
                className="border-b border-gray-700"
              >
                <td className="py-2 px-4 text-white">
                  {enrolledCourse.courseTitle}
                </td>
                <td className="py-2 px-4 text-white">
                  {enrolledCourse.upComingQuizzes &&
                  enrolledCourse.upComingQuizzes.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {enrolledCourse.upComingQuizzes.map((quiz) => (
                        <li key={quiz.quizId} className="text-sm">
                          <strong>{quiz.quizTitle}</strong> - {quiz.quizDate}{" "}
                          (Start: {quiz.startTime})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No upcoming quizzes.</p>
                  )}
                </td>
                <td className="py-2 px-4">
                  <Link
                    to={`/courses/${formatCourseTitle(
                      enrolledCourse.courseTitle
                    )}`}
                  >
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                      View Course
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No courses enrolled.</p>
      )}
    </div>
  );
};

export default StudentCourses;
