// src/pages/dashboard/student/StudentDashboardHeader.jsx

import { useEffect, useState } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import moment from "moment";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";

const StudentDashboardHeader = () => {
  const { user, userType, signOutUser } = useAuth();

  // Use console.table or JSON.stringify for correct logging
  useEffect(() => {
    if (user) console.log("[StudentDashboardHeader] User loaded:", user);
  }, [user]);

  const [currentDateTime, setCurrentDateTime] = useState(
    moment().format("MMMM D, YYYY, hh:mm A")
  );
  const [studentName, setStudentName] = useState("");

  const backendURL = "http://localhost:5000/api";

  // --------------------------------------------------
  // Fetch verified student info from backend
  // --------------------------------------------------
  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${backendURL}/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // Automatically handle session expiration
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("token");
          Swal.fire({
            icon: "warning",
            title: "Session Expired",
            text: "Please log in again.",
          }).then(() => (window.location.href = "/student/login"));
          return;
        }

        const data = await res.json();
        if (res.ok && data) {
          const name =
            data.firstName ||
            `${data.firstName || ""} ${data.lastName || ""}`.trim() ||
            data.username ||
            data.email?.split("@")[0] ||
            "Student";
          setStudentName(name);
        }
      } catch (err) {
        console.error(
          "[StudentDashboardHeader] Error fetching student info:",
          err
        );
      }
    };

    if (user?.email && userType === "student") {
      fetchStudentProfile();
    }
  }, [user, userType]);

  // --------------------------------------------------
  // Real-time clock updater
  // --------------------------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(moment().format("MMMM D, YYYY, hh:mm A"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // --------------------------------------------------
  // Logout handler
  // --------------------------------------------------
  const handleLogout = async () => {
    const confirm = await Swal.fire({
      title: "Log Out?",
      text: "Are you sure you want to log out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Log Out",
    });

    if (!confirm.isConfirmed) return;

    try {
      await signOutUser();
      localStorage.removeItem("token");
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been logged out successfully.",
        timer: 1200,
        showConfirmButton: false,
      });
      setTimeout(() => (window.location.href = "/"), 1000);
    } catch (err) {
      console.error("[StudentDashboardHeader] Logout error:", err);
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Something went wrong during logout.",
      });
    }
  };

  // --------------------------------------------------
  // Conditional rendering — only show if student logged in
  // --------------------------------------------------
  if (!user || userType !== "student") {
    return (
      <div className="text-center text-sm text-gray-500 mt-5">
        No active student session.
      </div>
    );
  }

  // --------------------------------------------------
  // HEADER UI
  // --------------------------------------------------
  return (
    <header className="mt-20 w-full fixed top-0 left-0 z-40 shadow-md bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border-b border-white/20 flex flex-col sm:flex-row items-center justify-between px-6 py-4 space-y-2 sm:space-y-0">
      {/* Welcome & Name */}
      <div className="flex items-center space-x-2">
        <FaUser className="text-yellow-300" />
        <h1 className="capitalize font-semibold tracking-wide">
          Welcome, {studentName || "Student"}!
        </h1>
      </div>

      {/* Real-time date & time */}
      <div className="text-sm opacity-90 font-medium">{currentDateTime}</div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md shadow-md transition-all duration-300"
      >
        <FaSignOutAlt /> Log Out
      </button>
    </header>
  );
};

export default StudentDashboardHeader;
