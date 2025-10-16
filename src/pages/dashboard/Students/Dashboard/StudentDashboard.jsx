import { useEffect, useState } from "react";
import { useStudentAuth } from "../../../../providers/StudentAuthProvider"; // Adjust the import path as necessary
import StudentDashboardHeader from "./StudentDashboardHeader"; // Import your header
import StudentWarning from "./StudentWarning"; // Import your warning section
import StudentCalendar from "./StudentCalendar"; // Import your calendar

const StudentDashboard = () => {
  const { studentName, studentId, isAuthenticatedStudent } = useStudentAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch student data
  const fetchStudentData = async () => {
    try {
      if (!studentId) return; // Ensure studentId is present
      const response = await fetch(
        `https://vertexforbcs.com/vartexforbcs/web/student/${studentId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch student data");
      }
      return await response.json(); // Return student data
    } catch (err) {
      setError(err.message);
      console.error("Error fetching student data:", err);
    }
  };

  // Fetch all quizzes from the API
  const fetchQuizzes = async () => {
    try {
      const response = await fetch(
        "https://vertexforbcs.com/vartexforbcs/web/quiz/index"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch quiz data");
      }
      return await response.json(); // Return quiz data
    } catch (err) {
      setError(err.message);
      console.error("Error fetching quiz data:", err);
    }
  };

  // Fetch and combine student and quiz data
  const fetchCombinedData = async () => {
    setLoading(true); // Set loading state
    const studentData = await fetchStudentData(); // Fetch student data
    const quizData = await fetchQuizzes(); // Fetch quiz data

    if (studentData && quizData) {
      // Extract course IDs from student data
      const courseIDs = studentData.courses.map((course) => course.courseID);

      // Filter quizzes that match course IDs
      const filteredQuizzes = quizData.data.filter((quiz) =>
        courseIDs.includes(quiz.courseID)
      );

      setQuizzes(filteredQuizzes); // Set quizzes state
    }
    setLoading(false); // End loading state
  };

  useEffect(() => {
    if (isAuthenticatedStudent && studentId) {
      fetchCombinedData(); // Fetch combined data when studentId is available
    }
  }, [isAuthenticatedStudent, studentId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="student-dashboard">
      <StudentDashboardHeader studentName={studentName} />
      <StudentWarning quizzes={quizzes} />
      <StudentCalendar quizzes={quizzes} />
    </div>
  );
};

export default StudentDashboard;
