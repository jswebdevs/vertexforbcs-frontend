import { useState } from "react";
import { useAdminAuth } from "../../../../providers/AdminAuthProvider";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Lottie from "lottie-react";
import loginAnimation from "../../../../assets/login2.json";

const AdminLogin = () => {
  const { login, error, loading } = useAdminAuth();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(usernameOrEmail, password);
    if (!error) {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="hero min-h-screen bg-gray-900 text-white">
      <div className="hero-content flex-col lg:flex-row-reverse items-center justify-center">
        
        {/* 🟡 Animation: 
            - মোবাইলে ছোট ও উপরে
            - বড় স্ক্রিনে পাশে বড় */}
        <div className="block lg:block text-center lg:text-left w-10 lg:w-auto mb-4 lg:mb-0 ">
          <Lottie animationData={loginAnimation} />
        </div>

        {/* 🟢 Login Form */}
        <div className="card w-full max-w-sm shrink-0 shadow-2xl bg-gray-800">
          <form className="card-body" onSubmit={handleSubmit}>
            {/* Username or Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Username or Email</span>
              </label>
              <input
                type="text"
                placeholder="username or email"
                className="input input-bordered bg-gray-700 text-white"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="form-control relative">
              <label className="label">
                <span className="label-text text-white">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="input input-bordered bg-gray-700 text-white pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-[30px] text-gray-300 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Error */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Submit */}
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit" disabled={loading}>
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
