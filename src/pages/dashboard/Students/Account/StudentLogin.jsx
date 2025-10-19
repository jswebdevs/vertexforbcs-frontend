import { useState } from "react";
import { useStudentAuth } from "../../../../providers/StudentAuthProvider";
import { Link, useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const { login, error, loading } = useStudentAuth();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(usernameOrEmail, password);

    if (!error) {
      navigate("/student/dashboard");
    } else {
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="max-w-md w-full bg-white/30 dark:bg-gray-900/50 backdrop-blur-md rounded-xl shadow-lg p-8 border border-white/20 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          STUDENT LOGING
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6 text-sm">
          Please log in to continue. If you're an admin,{" "}
          <Link to="/admin/login" className="text-blue-600 dark:text-blue-400 underline">
            Login here
          </Link>
          .
        </p>

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
