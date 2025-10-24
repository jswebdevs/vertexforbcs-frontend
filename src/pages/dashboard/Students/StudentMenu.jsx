import { Link } from "react-router-dom";

const StudentMenu = () => {
  const menuLinks = (
    <>
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

    </>
  );
  return (
    <div className="w-full bg-gray-800 text-white md:min-h-screen flex flex-col">

        {/* For Desktop */}
        <ul className="hidden md:flex flex-col space-y-2 text-sm md:text-lg">
          {menuLinks}
        </ul>

    </div>
  );
};

export default StudentMenu;
