// src/pages/student/auth/StudentLogin.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";

const StudentLogin = () => {
  const { signInUser, user, userType, loading } = useAuth();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!usernameOrEmail || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await signInUser(usernameOrEmail, password);
    } catch (err) {
      // Example: Firebase-friendly messages
      if (err.code === "auth/user-not-found") {
        setError("User not found");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password");
      } else {
        setError(err.message || "Login failed. Try again.");
      }
    }
  };

  useEffect(() => {
    if (user && userType === "student") {
      navigate("/student/dashboard");
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
          STUDENT LOGIN
        </h1>

        {/* Description */}
        <p className="text-center text-gray-700 dark:text-gray-300 mb-6 text-sm">
          Please log in to continue. If you're an admin,{" "}
          <Link
            to="/admin/login"
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
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
