import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminCourseDeleting from "./AdminCourseDeleting";
import AdminCourseEditing from "./AdminCourseEditing";

const AdminCourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingCourseId, setDeletingCourseId] = useState(null);
  const [deletingCourseTitle, setDeletingCourseTitle] = useState("");
  const [editingCourse, setEditingCourse] = useState(null);
  const navigate = useNavigate();

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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleView = (courseId, courseTitle) => {
    const formattedTitle = courseTitle.toLowerCase().replace(/ /g, "-");
    navigate(`/admin/manage-courses/${formattedTitle}`, {
      state: { title: courseTitle },
    });
  };

  const handleDeleteClick = (courseId, courseTitle) => {
    setDeletingCourseId(courseId);
    setDeletingCourseTitle(courseTitle);
  };

  const handleDeleteConfirm = async (courseId) => {
    try {
      const response = await fetch(
        `https://vertexforbcs.com/vartexforbcs/web/course/delete/${courseId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete the course with status code: ${response.status}`
        );
      }

      const updatedCourses = courses.filter((course) => course.id !== courseId);
      setCourses(updatedCourses);
    } catch (err) {
      alert("Failed to delete the course.");
    } finally {
      setDeletingCourseId(null);
      setDeletingCourseTitle("");
    }
  };

  const handleCancelDelete = () => {
    setDeletingCourseId(null);
    setDeletingCourseTitle("");
  };

  const determineQuizStatus = (quiz) => {
    const today = new Date();
    const quizDate = new Date(quiz.quizDate);

    // Parse startTime and endTime, then create full datetime objects
    const [startHour, startMinute, startSecond] = quiz.startTime
      .split(":")
      .map(Number);
    const [endHour, endMinute, endSecond] = quiz.endTime.split(":").map(Number);

    // Set quiz start and end datetime using quizDate
    const quizStartDateTime = new Date(quizDate);
    quizStartDateTime.setHours(startHour, startMinute, startSecond);

    const quizEndDateTime = new Date(quizDate);
    quizEndDateTime.setHours(endHour, endMinute, endSecond);

    // Compare current time to quiz start and end times
    if (today > quizEndDateTime) {
      return "Completed";
    } else if (today >= quizStartDateTime && today <= quizEndDateTime) {
      return "Ongoing";
    } else {
      return "Upcoming";
    }
  };

  const countQuizzes = (quizzes) => {
    const result = { upcoming: 0, ongoing: 0, completed: 0 };

    if (Array.isArray(quizzes)) {
      quizzes.forEach((quiz) => {
        const status = determineQuizStatus(quiz);
        if (status === "Completed") {
          result.completed++;
        } else if (status === "Ongoing") {
          result.ongoing++;
        } else if (status === "Upcoming") {
          result.upcoming++;
        }
      });
    }

    return result;
  };

  const handleCourseUpdated = (updatedCourse) => {
    const updatedCourses = courses.map((course) =>
      course.id === updatedCourse.id ? updatedCourse : course
    );
    setCourses(updatedCourses);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4 text-white">Courses</h2>
      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <table className="min-w-full bg-gray-800 border border-gray-700">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left text-white">ID</th>
              <th className="py-2 px-4 text-left text-white">Title</th>
              <th className="py-2 px-4 text-left text-white">Start Date</th>
              <th className="py-2 px-4 text-left text-white">End Date</th>
              <th className="py-2 px-4 text-left text-white">Quizzes</th>
              <th className="py-2 px-4 text-left text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => {
              const { upcoming, ongoing, completed } = countQuizzes(
                course.quizzes
              );
              return (
                <tr key={course.id} className="border-b border-gray-700">
                  <td className="py-2 px-4 text-white">{course.id}</td>
                  <td className="py-2 px-4 text-white">
                    <Link to={`/courses/${course.title}`}>{course.title}</Link>
                  </td>
                  <td className="py-2 px-4 text-white">{course.startDate}</td>
                  <td className="py-2 px-4 text-white">{course.endDate}</td>
                  <td className="py-2 px-4 text-white">
                    Completed: {completed}, Ongoing: {ongoing}, Upcoming:{" "}
                    {upcoming}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleView(course.id, course.title)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteClick(course.id, course.title)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {deletingCourseId && (
        <AdminCourseDeleting
          courseId={deletingCourseId}
          courseTitle={deletingCourseTitle}
          onDeleteConfirm={handleDeleteConfirm}
          onCancel={handleCancelDelete}
        />
      )}
      {editingCourse && (
        <AdminCourseEditing
          course={editingCourse}
          onClose={() => setEditingCourse(null)}
          onCourseUpdated={handleCourseUpdated}
        />
      )}
    </div>
  );
};

export default AdminCourseTable;
