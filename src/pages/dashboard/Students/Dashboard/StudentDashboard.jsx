import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth"; // unified AuthProvider
import StudentDashboardHeader from "./StudentDashboardHeader"; // Import your header
import StudentWarning from "./StudentWarning"; // Import your warning section
import StudentCalendar from "./StudentCalendar"; // Import your calendar

const StudentDashboard = () => {
  const { user, userType, loading: authLoading } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const studentId = user?.uid;
  const studentName = user?.displayName;

  // Fetch student data
  const fetchStudentData = async () => {
    try {
      if (!studentId) return null;

      const response = await fetch(
        `https://vertexforbcs.com/vartexforbcs/web/student/${studentId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch student data");
      }
      return await response.json();
    } catch (err) {
      setError(err.message);
      console.error("Error fetching student data:", err);
    }
  };

  // Fetch all quizzes
  const fetchQuizzes = async () => {
    try {
      const response = await fetch(
        "https://vertexforbcs.com/vartexforbcs/web/quiz/index"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch quiz data");
      }
      return await response.json();
    } catch (err) {
      setError(err.message);
      console.error("Error fetching quiz data:", err);
    }
  };

  // Fetch and combine student and quiz data
  const fetchCombinedData = async () => {
    setLoading(true);
    const studentData = await fetchStudentData();
    const quizData = await fetchQuizzes();

    if (studentData && quizData) {
      const courseIDs = studentData.courses.map((course) => course.courseID);
      const filteredQuizzes = quizData.data.filter((quiz) =>
        courseIDs.includes(quiz.courseID)
      );
      setQuizzes(filteredQuizzes);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!authLoading && user && userType === "student" && studentId) {
      fetchCombinedData();
    }
  }, [authLoading, user, userType, studentId]);

  if (authLoading || loading) return <div>Loading...</div>;
  if (!user || userType !== "student") return <div>Access denied</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="student-dashboard">
      <StudentDashboardHeader studentName={studentName} />
      <StudentWarning quizzes={quizzes} />
      <StudentCalendar quizzes={quizzes} />
    </div>
  );
};

export default StudentDashboard;
