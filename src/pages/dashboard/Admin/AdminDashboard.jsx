import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth"; // unified AuthProvider
import AdminDashboardHeader from "./AdminDashboardHeader";
import AdminWarning from "./AdminWarning";
import AdminStats from "./AdminStats";
import AdminCalendar from "./AdminCalendar";
import "./AdminDashboard.css"; // Optional CSS file for styling

const AdminDashboard = () => {
  const { user, userType, signOutUser } = useAuth();
  const adminName = user?.displayName || "Admin";

  const [courseData, setCourseData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [onHoldSubscriptions, setOnHoldSubscriptions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || userType !== "admin") return; // Only fetch if admin

    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "https://vertexforbcs.com/vartexforbcs/web/courses/data"
        );
        if (!response.ok) throw new Error("Failed to fetch courses.");
        const data = await response.json();
        setCourseData(data);

        // Extract quizzes from courses
        const allQuizzes = data.flatMap((course) => course.quizzes || []);
        setQuizzes(allQuizzes);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching courses:", error);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "https://vertexforbcs.com/vartexforbcs/web/student-all"
        );
        if (!response.ok) throw new Error("Failed to fetch students.");
        const data = await response.json();
        setStudentData(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching students:", error);
      }
    };

    const fetchOnHoldSubscriptions = async () => {
      try {
        const response = await fetch(
          "https://vertexforbcs.com/vartexforbcs/web/signup"
        );
        if (!response.ok)
          throw new Error("Failed to fetch on-hold subscriptions.");
        const data = await response.json();
        setOnHoldSubscriptions(data.length);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching on-hold subscriptions:", error);
      }
    };

    const initializeData = async () => {
      await Promise.all([
        fetchCourses(),
        fetchStudents(),
        fetchOnHoldSubscriptions(),
      ]);
      setLoading(false);
    };

    initializeData();
  }, [user, userType]);

  const clearCache = async () => {
    try {
      const response = await fetch(
        "https://vertexforbcs.com/vartexforbcs/web/clear-cache",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      console.log("Cache cleared successfully:", data);
      alert("Cache cleared successfully!");
    } catch (error) {
      console.error("Error clearing cache:", error);
      alert("Failed to clear cache!");
    }
  };

  if (loading)
    return <p className="text-blue-500">Loading data, please wait...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  if (!user || userType !== "admin")
    return <p className="text-red-500">You do not have access to this page.</p>;

  return (
    <div className="admin-dashboard">
      <AdminDashboardHeader adminName={adminName} onClearCache={clearCache} />
      <AdminWarning quizzes={quizzes} />
      <div className="admin-content">
        {courseData.length === 0 && studentData.length === 0 ? (
          <p className="text-red-500">
            There are currently no courses or students available.
          </p>
        ) : (
          <>
            <AdminStats
              courseData={courseData}
              studentData={studentData}
              onHoldSubscriptions={onHoldSubscriptions}
              quizzes={quizzes}
            />
            <AdminCalendar quizzes={quizzes} />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
