import { Outlet, Navigate } from "react-router-dom";
import { useAdminAuth } from "../../../providers/AdminAuthProvider";
import AdminMenu from "./AdminMenu";

const AdminRoot = () => {
  const { isAuthenticatedAdmin, loading } = useAdminAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticatedAdmin) {
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
