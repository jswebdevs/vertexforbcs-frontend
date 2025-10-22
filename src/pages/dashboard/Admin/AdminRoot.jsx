import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth"; // unified AuthProvider
import AdminMenu from "./AdminMenu";

const AdminRoot = () => {
  const { user, userType, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect if not logged in or not an admin
  if (!user || userType !== "admin") {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="flex flex-col md:flex-row">
      <AdminMenu />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminRoot;
