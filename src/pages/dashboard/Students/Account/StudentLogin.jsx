import { useState } from "react";
import { useStudentAuth } from "../../../../providers/StudentAuthProvider"; // Adjust the import path as necessary
import { Link, useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const { login, error, loading } = useStudentAuth();
  const [usernameOrEmail, setUsernameOrEmail] = useState(""); // Combined field for username or email
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(usernameOrEmail, password);

    // Check if there's no error after attempting login
    if (!error) {
      navigate("/student/dashboard"); // Redirect to dashboard if login is successful
    } else {
      // Optional: Clear password field after unsuccessful login attempt
      setPassword("");
    }
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">Welcome to Student Login</h1>
          <p className="py-6">
            Please make sure you are logged in before proceeding to the next
            step. If you are an Admin <Link to="/admin/login">Login Here</Link>
          </p>
        </div>
        <div className="card w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Username or Email</span>
              </label>
              <input
                type="text"
                placeholder="username or email"
                className="input input-bordered bg-gray-800"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
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
                    onChange={() => setShowPassword(!showPassword)} // Toggle showPassword state
                  />
                  Show Password
                </span>
              </label>
            </div>
            {/* Display error message if login fails */}
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
      </div>
    </div>
  );
};

export default StudentLogin;
