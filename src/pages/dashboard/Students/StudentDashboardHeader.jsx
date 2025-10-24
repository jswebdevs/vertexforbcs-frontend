// src/pages/dashboard/student/StudentDashboardHeader.jsx

import { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import moment from "moment";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { FaUserGraduate } from "react-icons/fa"; 

const StudentDashboardHeader = () => {
  const { user, userType, signOutUser } = useAuth();

  const [currentDateTime, setCurrentDateTime] = useState(
    moment().format("MMMM D, YYYY, hh:mm A")
  );
  const [studentName, setStudentName] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const backendURL = "http://localhost:5000/api";

  // --------------------------------------------------
  // Detect and load student name + photo
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
          // if login via Google (Firebase)
          if (user?.providerData && user.providerData.length > 0) {
            setStudentName(
              data.displayName || data.firstName+ ' '+ data.lastName
            );
            setProfileImage(
              data.avatar
            );
          } else {
            // standard MERN-based user
            const fullName =
              `${data.firstName || ""} ${data.lastName || ""}`.trim() ||
              data.username;
            setStudentName(fullName);
            setProfileImage(data.avatar);
          }
        }
      } catch (err) {
        console.error(
          "[StudentDashboardHeader] Error fetching student info:",
          err
        );
      }
    };

    if (user && userType === "student") fetchStudentProfile();
  }, [user, userType]);

  // --------------------------------------------------
  // Real-time clock
  // --------------------------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(moment().format("MMMM D, YYYY, hh:mm A"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // --------------------------------------------------
  // Logout
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
      localStorage.clear();
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
  // Visibility guard
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
    <header className="w-full z-40 shadow-md bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white flex flex-col sm:flex-row items-center justify-between px-6 py-4 space-y-2 sm:space-y-0 border-b border-white/20">
      {/* Profile + Name */}
      <div className="flex items-center gap-3">
        {profileImage && profileImage.trim() !== "" ? (
          <img
            src={profileImage}
            alt="Profile"
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.style.display = "none"; // Hide broken <img>
            }}
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
          />
        ) : (
          <div className="bg-white/20 p-2 rounded-full">
            <FaUserGraduate className="text-white text-xl" />
          </div>
        )}

        <h1 className="capitalize font-semibold tracking-wide">
          Welcome, {studentName || "Student"}!
        </h1>
      </div>

      {/* Current Date & Time */}
      <div className="text-sm opacity-90 font-medium">{currentDateTime}</div>

      {/* Logout */}
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
