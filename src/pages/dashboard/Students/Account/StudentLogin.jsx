// src/pages/student/auth/StudentLogin.jsx

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";

const StudentLogin = () => {
  const {
    signInWithGoogle,
    signInWithController, // backend username/email + password login
    user,
    userType,
    loading,
  } = useAuth();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ------------------------
  // Login via Username/Email + Password
  // ------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!usernameOrEmail || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const result = await signInWithController(
        usernameOrEmail.trim().toLowerCase(),
        password
      );

      if (!result) {
        setError("Invalid credentials or not a student");
        return;
      }

      if (result.user.userType !== "student") {
        Swal.fire({
          icon: "warning",
          title: "Access Denied",
          text: "This login is for students only.",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome ${
          result.user.firstName || result.user.username || "Student"
        }!`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("[StudentLogin] Controller login error:", err);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message || "Unexpected error, try again later.",
      });
    }
  };

  // ------------------------
  // Google Login (Firebase)
  // ------------------------
  // ------------------------
  const handleGoogleLogin = async () => {
    setError("");
    try {
      const data = await signInWithGoogle();
      if (!data?.user) {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: "Unable to authenticate with Google.",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome ${
          data.user.firstName || data.user.username || "Student"
        }!`,
        timer: 1200,
        showConfirmButton: false,
      });

      navigate("/student/dashboard");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: err.message || "Something went wrong with Google Sign‑In.",
      });
    }
  };

  // ------------------------
  // Redirect Logged-in Student
  // ------------------------
  useEffect(() => {
    if (user && userType === "student") {
      navigate("/student/dashboard");
    }
  }, [user, userType, navigate]);

  // ------------------------
  // Render Component
  // ------------------------
  return (
    <div
      className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300
      dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900
      transition-colors duration-500"
    >
      <div
        className="max-w-md w-full bg-white/30 dark:bg-gray-900/60 backdrop-blur-md
        rounded-xl shadow-xl p-8 border border-white/20 dark:border-pink-400/30"
      >
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
          STUDENT LOGIN
        </h1>

        {/* Description */}
        <p className="text-center text-gray-700 dark:text-gray-300 mb-6 text-sm">
          Are you new Here?. Please{" "}
          <Link
            to="/student/register"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            Register Here
          </Link>
          .
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username or Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-800 dark:text-white">
                Username or Email
              </span>
            </label>
            <input
              type="text"
              placeholder="username or email"
              className="input input-bordered w-full bg-white dark:bg-gray-800
              text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-1 focus:ring-purple-400 dark:focus:ring-purple-600"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Password Field */}
          <div className="form-control relative">
            <label className="label">
              <span className="label-text text-gray-800 dark:text-white">
                Password
              </span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              className="input input-bordered w-full bg-white dark:bg-gray-800
              text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-1 focus:ring-purple-400 dark:focus:ring-purple-600 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            {/* Toggle Visibility */}
            <button
              type="button"
              className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Submit */}
          <div className="form-control mt-4">
            <button
              className="w-full py-2 px-4 text-white font-semibold rounded-md bg-gradient-to-r
              from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600
              transition-all duration-300 shadow-md disabled:opacity-50 cursor-pointer"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
            <span className="mx-2 text-gray-500 dark:text-gray-400 text-sm">
              OR
            </span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
          </div>

          {/* Google Login */}
          <div className="form-control mt-2">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-2 px-4 flex items-center justify-center border border-gray-300 dark:border-gray-600
              rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
              transition-colors duration-200 shadow-md cursor-pointer"
            >
              <FcGoogle className="mr-2 text-xl" />
              {loading ? "Logging in..." : "Login with Google"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
