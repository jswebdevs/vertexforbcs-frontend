import { Link } from "react-router-dom";
import logo from "/image/vfbcs.jpg"; // Ensure you have a logo image

const StudentMenu = () => {
  return (
    <div className="w-full md:w-64 bg-gray-800 text-white md:min-h-screen flex flex-col">
      <nav className="md:flex-1">
        {/* For Desktop */}
        <ul className="hidden md:flex flex-col space-y-2 text-sm md:text-lg">
          <li>
            <Link
              to="/student/dashboard"
              className="block p-4 hover:bg-gray-700"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/student/courses" className="block p-4 hover:bg-gray-700">
              My Courses
            </Link>
          </li>
          <li>
            <Link to="/student/quizzes" className="block p-4 hover:bg-gray-700">
              My Exams
            </Link>
          </li>
          <li>
            <Link to="/student/account" className="block p-4 hover:bg-gray-700">
              Profile
            </Link>
          </li>
        </ul>

        {/* For Mobile */}
        <ul className="grid grid-cols-2 gap-0 border-t border-gray-700 md:hidden">
          <li className="border border-gray-700">
            <Link
              to="/student/dashboard"
              className="block p-4 hover:bg-gray-700 text-center"
            >
              Dashboard
            </Link>
          </li>
          <li className="border border-gray-700">
            <Link
              to="/student/courses"
              className="block p-4 hover:bg-gray-700 text-center"
            >
              My Courses
            </Link>
          </li>
          <li className="border border-gray-700">
            <Link
              to="/student/quizzes"
              className="block p-4 hover:bg-gray-700 text-center"
            >
              My Exams
            </Link>
          </li>
          <li className="border border-gray-700">
            <Link
              to="/student/account"
              className="block p-4 hover:bg-gray-700 text-center"
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default StudentMenu;
