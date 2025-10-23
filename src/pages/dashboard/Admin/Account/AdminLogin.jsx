// src/pages/admin/auth/AdminLogin.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc"; // Google icon
import Swal from "sweetalert2"; // SweetAlert2

const AdminLogin = () => {
  const { signInWithController, signInWithGoogle, user, userType, loading } =
    useAuth();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /** ------------------------
   * Handle controller login (username/password)
   * ------------------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!usernameOrEmail || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await signInWithController(usernameOrEmail, password);
    } catch (err) {
      setError(err.message || "Login failed. Try again.");
    }
  };

  /** ------------------------
   * Handle Google login
   * ------------------------ */
  const handleGoogleLogin = async () => {
    setError("");
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || "Google login failed");
    }
  };

  /** ------------------------
   * Redirect admin after login or warn if not admin
   * ------------------------ */
  useEffect(() => {
    if (user) {
      if (userType === "admin") {
        navigate("/admin/dashboard");
      } else {
        Swal.fire({
          icon: "warning",
          title: "Not an Admin",
          text: "You are not an admin. Redirecting to student login...",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          navigate("/student/login");
        });
      }
    }
  }, [user, userType, navigate]);

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
          ADMIN LOGIN
        </h1>

        {/* Description */}
        <p className="text-center text-gray-700 dark:text-gray-300 mb-6 text-sm">
          Please log in to continue. If you're a student,{" "}
          <Link
            to="/student/login"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            login here
          </Link>
          .
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username or Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-800 dark:text-white">
                Username or Email
              </span>
            </label>
            <input
              type="text"
              placeholder="username or email"
              className="input input-bordered w-full 
                bg-white dark:bg-gray-800 text-gray-800 dark:text-white 
                placeholder-gray-400 dark:placeholder-gray-500 
                focus:outline-none focus:ring-1 focus:ring-purple-400 dark:focus:ring-purple-600"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="form-control relative">
            <label className="label">
              <span className="label-text text-gray-800 dark:text-white">
                Password
              </span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              className="input input-bordered w-full 
                bg-white dark:bg-gray-800 text-gray-800 dark:text-white 
                placeholder-gray-400 dark:placeholder-gray-500 
                focus:outline-none focus:ring-1 focus:ring-purple-400 dark:focus:ring-purple-600 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            {/* Toggle Password */}
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

          {/* Submit Button */}
          <div className="form-control mt-4">
            <button
              className="w-full py-2 px-4 text-white font-semibold rounded-md 
                bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 
                transition-all duration-300 shadow-md disabled:opacity-50 cursor-pointer"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* OR Divider */}
          <div className="flex items-center my-2">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
            <span className="mx-2 text-gray-500 dark:text-gray-400 text-sm">
              OR
            </span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
          </div>

          {/* Google Login */}
          <div className="form-control mt-2">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-2 px-4 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-md 
                bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 shadow-md cursor-pointer"
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

export default AdminLogin;
