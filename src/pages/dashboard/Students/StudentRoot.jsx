import { Outlet, Navigate } from "react-router-dom";
import { useStudentAuth } from "../../../providers/StudentAuthProvider"; // Adjust the import path as necessary
import StudentMenu from "./StudentMenu";

const StudentRoot = () => {
  const { isAuthenticatedStudent, loading } = useStudentAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticatedStudent) {
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
