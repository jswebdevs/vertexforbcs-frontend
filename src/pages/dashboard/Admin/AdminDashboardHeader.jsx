import { FaUser } from "react-icons/fa"; // Import user icon from react-icons
import { useEffect, useState } from "react";
import moment from "moment"; // Assuming you are using moment.js
import useAuth from "../../../hooks/useAuth"; // Unified auth hook

const AdminDashboardHeader = ({ adminName, onClearCache }) => {
  const { signOutUser } = useAuth(); // unified logout function
  const [currentDateTime, setCurrentDateTime] = useState(
    moment().format("MMMM D, YYYY, hh:mm A") // Format: September 30, 2024, 03:08 AM
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(moment().format("MMMM D, YYYY, hh:mm A"));
    }, 1000); // Update time every second
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    signOutUser(); // Call the unified logout function
  };

  return (
    <header className="w-full flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-gray-800 text-white">
      {/* Welcome Message */}
      <div className="text-lg font-semibold mb-2 md:mb-0">
        <h1>Welcome, {adminName}</h1>
      </div>

      {/* Current Date and Time */}
      <div className="text-sm mb-2 md:mb-0">
        <h2>{currentDateTime}</h2>
      </div>

      {/* Buttons (Logout and Clear Cache) */}
      <div className="flex gap-4">
        {/* Clear Cache Button */}
        <button
          onClick={onClearCache}
          className="flex items-center gap-2 border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors"
        >
          <FaUser /> Clear Cache
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition-colors"
        >
          <FaUser /> Log Out
        </button>
      </div>
    </header>
  );
};

export default AdminDashboardHeader;
