// src/pages/student/auth/StudentLogin.jsx
import { useState, useEffect } from "react";
import { useStudentAuth } from "../../../../providers/StudentAuthProvider";
import { Link, useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const { login, error, loading, isAuthenticatedStudent } = useStudentAuth();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(usernameOrEmail, password);
  };

  useEffect(() => {
    if (isAuthenticatedStudent) {
      navigate("/student/dashboard");
    }
  }, [isAuthenticatedStudent, navigate]);

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">Welcome to Student Login</h1>
          <p className="py-6">
            Please log in to continue. If you are an Admin,{" "}
            <Link to="/admin/login" className="text-blue-400 underline">
              Login Here
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-800 dark:text-white">Username or Email</span>
            </label>
            <input
              type="text"
              placeholder="username or email"
              className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-800 dark:text-white">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="label cursor-pointer mt-2">
              <span className="label-text text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                Show Password
              </span>
            </label>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="form-control mt-6">
            <button
              className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white w-full transition-colors duration-300"
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
