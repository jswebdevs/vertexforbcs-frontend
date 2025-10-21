// src/pages/student/auth/StudentLogin.jsx
import { useState } from "react";
import { useStudentAuth } from "../../../../providers/StudentAuthProvider";
import { Link, useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const { login, error, loading, isAuthenticatedStudent } = useStudentAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);

    // Redirect after login success
    if (isAuthenticatedStudent) {
      navigate("/student/dashboard");
    }
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">Welcome to Student Login</h1>
          <p className="py-6">
            Please log in to continue. If you are an Admin,{" "}
            <Link to="/admin/login" className="text-blue-400 underline text-white decoration">
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
      </div>
    </div>
  );
};

export default StudentLogin;
