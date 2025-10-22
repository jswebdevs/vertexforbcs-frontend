import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth"; // unified AuthProvider
import StudentMenu from "./StudentMenu";

const StudentRoot = () => {
  const { user, userType, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect if not logged in or not a student
  if (!user || userType !== "student") {
    return <Navigate to="/student/login" />;
  }

  return (
    <div className="block md:flex">
      <StudentMenu />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentRoot;
