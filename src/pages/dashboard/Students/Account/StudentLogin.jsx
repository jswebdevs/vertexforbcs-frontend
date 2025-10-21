// src/pages/student/auth/StudentLogin.jsx
import { useState } from "react";
import { useStudentAuth } from "../../../../providers/StudentAuthProvider";
import { Link, useNavigate } from "react-router-dom";

const StudentLogin = () => {
<<<<<<< HEAD
  const { login, error, loading } = useStudentAuth();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
=======
  const { login, error, loading, isAuthenticatedStudent } = useStudentAuth();
  const [email, setEmail] = useState("");
>>>>>>> d65443a5212f8fb01be9bb0e1cd6cb01af40a035
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);

<<<<<<< HEAD
    if (!error) {
      navigate("/student/dashboard");
    } else {
      setPassword("");
=======
    // Redirect after login success
    if (isAuthenticatedStudent) {
      navigate("/student/dashboard");
>>>>>>> d65443a5212f8fb01be9bb0e1cd6cb01af40a035
    }
  };

  return (
<<<<<<< HEAD
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
=======
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

        <div className="card w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered bg-gray-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="input input-bordered bg-gray-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="label cursor-pointer">
                <span className="label-text text-white">
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

            {error && <p className="text-red-500">{error}</p>}

            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
>>>>>>> d65443a5212f8fb01be9bb0e1cd6cb01af40a035
      </div>
    </div>
  );
};

export default StudentLogin;
