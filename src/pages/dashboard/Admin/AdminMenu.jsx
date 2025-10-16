import { Link} from "react-router-dom";

import logo from "/image/vfbcs.jpg";

const AdminMenu = () => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen flex flex-col">
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link to="/admin/dashboard" className="block p-4 hover:bg-gray-700">
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/manage-students"
              className="block p-4 hover:bg-gray-700"
            >
              Manage Students
            </Link>
          </li>
          <li>
            <Link
              to="/admin/manage-courses"
              className="block p-4 hover:bg-gray-700"
            >
              Manage Courses
            </Link>
          </li>
          <li>
            <Link to="/admin/account" className="block p-4 hover:bg-gray-700">
              Profile
            </Link>
          </li>

          <li>
            <Link
              to="/admin/site-settings"
              className="block p-4 hover:bg-gray-700"
            >
              Site Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminMenu;
