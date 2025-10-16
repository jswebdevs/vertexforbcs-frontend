import { useState } from "react";
import { useAdminAuth } from "../../../../providers/AdminAuthProvider";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { login, error, loading } = useAdminAuth();
  const [usernameOrEmail, setUsernameOrEmail] = useState(""); // Updated to use combined field
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(usernameOrEmail, password);
    if (!error) {
      navigate("/admin/dashboard"); // Redirect to dashboard if login is successful
    }
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">Welcome to Admin Login</h1>
          <p className="py-6">
            Please make sure you are logged in before proceeding to the next
            step.
          </p>
        </div>
        <div className="card  w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Username or Email</span>
              </label>
              <input
                type="text"
                placeholder="username or email"
                className="input input-bordered bg-gray-700 text-white"
                value={usernameOrEmail} // Updated to use the combined field
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered bg-gray-700 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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

export default AdminLogin;
