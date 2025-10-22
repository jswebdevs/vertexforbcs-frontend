import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import moment from "moment";
import useAuth from "../../../../hooks/useAuth"; // unified AuthProvider

const StudentDashboardHeader = () => {
  const { user, userType, signOutUser } = useAuth();
  const studentName = user?.displayName || "Student";

  const [currentDateTime, setCurrentDateTime] = useState(
    moment().format("MMMM D, YYYY, hh:mm A")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(moment().format("MMMM D, YYYY, hh:mm A"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await signOutUser();
  };

  // Only render header if userType is student
  if (!user || userType !== "student") return null;

  return (
    <header className="w-full flex flex-col md:flex-row items-center justify-between p-4 bg-gray-800 text-white">
      {/* Welcome Message */}
      <div className="text-center md:text-left text-lg font-semibold mb-2 md:mb-0">
        <h1 className="capitalize">Welcome, {studentName}</h1>
      </div>

      {/* Current Date and Time */}
      <div className="text-sm mb-2 md:mb-0">
        <h2>{currentDateTime}</h2>
      </div>

      {/* Logout Button */}
      <div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
        >
          <FaUser /> Log Out
        </button>
      </div>
    </header>
  );
};

export default StudentDashboardHeader;
