import { useEffect, useState } from "react";
import { useAdminAuth } from "../../../providers/AdminAuthProvider"; // Adjust the import path as necessary
import AdminDashboardHeader from "./AdminDashboardHeader";
import AdminWarning from "./AdminWarning";
import AdminStats from "./AdminStats";
import AdminCalendar from "./AdminCalendar";
import "./AdminDashboard.css"; // Optional CSS file for styling

const AdminDashboard = () => {
  const { adminName } = useAdminAuth();
  const [courseData, setCourseData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [quizzes, setQuizzes] = useState([]); // Variable to store quiz data
  const [onHoldSubscriptions, setOnHoldSubscriptions] = useState(0); // Initialize to 0 for on-hold subscriptions
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
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
        setQuizzes(allQuizzes); // Store quizzes data
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
        setOnHoldSubscriptions(data.length); // Set the length of the data as the number of on-hold subscriptions
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
      ]); // Fetch data concurrently
      setLoading(false); // Set loading to false after all fetches are complete
    };

    initializeData();
  }, []);

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

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Cache cleared successfully:", data);
      alert("Cache cleared successfully!");
    } catch (error) {
      console.error("Error clearing cache:", error);
      alert("Failed to clear cache!");
    }
  };

  if (loading) {
    return <p className="text-blue-500">Loading data, please wait...</p>; // Loading message
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>; // Error message
  }

  return (
    <div className="admin-dashboard">
      <AdminDashboardHeader adminName={adminName} onClearCache={clearCache} />
      <AdminWarning quizzes={quizzes} /> {/* Pass quizzes to AdminWarning */}
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
