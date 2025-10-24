// src/pages/student/auth/StudentRegister.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNO: "",
    paymentMethod: "Cash",
    trxID: "",
    numberUsed: "",
    courses: [],
    status: "hold",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [availability, setAvailability] = useState(null);
  const navigate = useNavigate();

  // Static courses for now
  const availableCourses = [
    { id: 1, title: "Bangla" },
    { id: 2, title: "English" },
    { id: 3, title: "Mathematics" },
    { id: 4, title: "General Knowledge" },
    { id: 5, title: "Mental Ability" },
  ];

  // ----------------------------------
  // Check username/email availability (on typing)
  // ----------------------------------
  const handleCheck = async (value) => {
    if (!value || value.length < 3) return setAvailability(null);

    try {
      const res = await fetch(
        `http://localhost:5000/api/users/check-username/${value}`
      );
      const data = await res.json();
      setAvailability(data.available);
    } catch {
      setAvailability(null);
    }
  };

  // ----------------------------------
  // Handle input changes
  // ----------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "courses") {
      const selectedCourse = availableCourses.find(
        (c) => c.id.toString() === value
      );
      const updatedCourses = formData.courses.some(
        (c) => c.id === selectedCourse.id
      )
        ? formData.courses.filter((c) => c.id !== selectedCourse.id)
        : [...formData.courses, selectedCourse];
      setFormData({ ...formData, courses: updatedCourses });
      return;
    }

    setFormData({ ...formData, [name]: value });
    if (name === "username" || name === "email") handleCheck(value);
  };

  // ----------------------------------
  // Submit registration form
  // ----------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match. Please try again.",
      });
      return;
    }

    if (!formData.courses.length) {
      Swal.fire({
        icon: "error",
        title: "No Course Selected",
        text: "Select at least one course before registering.",
      });
      return;
    }

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username.trim().toLowerCase(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      contactNO: formData.contactNO,
      paymentMethod: formData.paymentMethod,
      trxID: formData.trxID,
      numberUsed: formData.numberUsed,
      courses: formData.courses.map((c) => ({
        course_id: c.id,
        title: c.title,
      })),
    };

    try {
      const res = await fetch(
        "http://localhost:5000/api/users/register-student",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Your registration has been received. Await admin confirmation.",
        });
        setTimeout(() => navigate("/student/login"), 3500);
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: data.message || "Please try again later.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Network or server unavailable.",
      });
    }
  };

  return (
    <div className="hero min-h-screen bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 transition-all">
      <div className="hero-content flex-col lg:flex-row justify-between max-w-7xl">
        <div className="text-left lg:w-1/2 px-6 lg:px-12 mb-10 lg:mb-0">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5">
            Become a Vertex Scholar <br /> and Excel in BCS!
          </h1>
          <p className="text-gray-200 text-lg mb-6">
            Prepare smartly with expert teachers, detailed logic training, and
            competitive mock exams. Join{" "}
            <span className="text-pink-300 font-semibold">Vertex for BCS</span>{" "}
            today!
          </p>
          <button
            onClick={() => navigate("/courses")}
            className="btn bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white border-0 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 focus:ring-2 focus:ring-pink-500 transition-all"
          >
            Explore Courses
          </button>
        </div>

        {/* Registration Form */}
        <div className="card w-full lg:max-w-2xl shadow-2xl bg-white/40 dark:bg-gray-900/60 backdrop-blur-md rounded-lg border border-white/20 dark:border-pink-400/30">
          <form
            onSubmit={handleSubmit}
            className="card-body grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {[
              { label: "First Name *", name: "firstName" },
              { label: "Last Name *", name: "lastName" },
              { label: "Username *", name: "username" },
              { label: "Email *", name: "email", type: "email" },
              { label: "Contact Number *", name: "contactNO" },
            ].map((field) => (
              <div key={field.name} className="form-control">
                <label className="label">
                  <span className="label-text text-gray-800 dark:text-white">
                    {field.label}
                  </span>
                </label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  placeholder={field.label}
                  className="input input-bordered bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-0 focus:ring-1 focus:ring-pink-500"
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                />
                {["username", "email"].includes(field.name) && (
                  <p
                    className={`text-sm ${
                      availability === null
                        ? "text-gray-400"
                        : availability
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {availability === null
                      ? ""
                      : availability
                      ? "Available ✅"
                      : "Already taken ❌"}
                  </p>
                )}
              </div>
            ))}

            {/* Password Fields */}
            {[
              {
                label: "Password *",
                name: "password",
                show: showPassword,
                toggle: setShowPassword,
              },
              {
                label: "Confirm Password *",
                name: "confirmPassword",
                show: showConfirm,
                toggle: setShowConfirm,
              },
            ].map(({ label, name, show, toggle }) => (
              <div key={name} className="form-control relative">
                <label className="label">
                  <span className="label-text text-gray-800 dark:text-white">
                    {label}
                  </span>
                </label>
                <input
                  type={show ? "text" : "password"}
                  name={name}
                  placeholder={label}
                  className="input input-bordered bg-white dark:bg-gray-800 text-gray-800 dark:text-white pr-10 focus:outline-0 focus:ring-1 focus:ring-pink-500"
                  value={formData[name]}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => toggle(!show)}
                  className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-500 dark:hover:text-gray-300"
                >
                  {show ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            ))}

            {/* Payment Section */}
            {[
              { label: "Payment Method", name: "paymentMethod" },
              { label: "Transaction ID", name: "trxID" },
            ].map((field) => (
              <div key={field.name} className="form-control">
                <label className="label">
                  <span className="label-text text-gray-800 dark:text-white">
                    {field.label}
                  </span>
                </label>
                {field.name === "paymentMethod" ? (
                  <select
                    name={field.name}
                    className="select select-bordered bg-white dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-0 focus:ring-1 focus:ring-pink-500"
                    value={formData[field.name]}
                    onChange={handleChange}
                  >
                    {["Cash", "bKash", "Rocket", "Credit Card", "Nagad"].map(
                      (method) => (
                        <option key={method}>{method}</option>
                      )
                    )}
                  </select>
                ) : (
                  <input
                    name={field.name}
                    placeholder={`Enter ${field.label}`}
                    className="input input-bordered bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-0 focus:ring-1 focus:ring-pink-500"
                    value={formData[field.name]}
                    onChange={handleChange}
                  />
                )}
              </div>
            ))}

            {/* Courses */}
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text text-gray-800 dark:text-white">
                  Select Courses *
                </span>
              </label>
              <div className="flex flex-wrap mb-4">
                {availableCourses.map((course) => (
                  <label
                    key={course.id}
                    className="flex items-center mr-4 text-gray-800 dark:text-gray-200"
                  >
                    <input
                      type="checkbox"
                      name="courses"
                      value={course.id}
                      onChange={handleChange}
                      checked={formData.courses.some((c) => c.id === course.id)}
                      className="mr-2 accent-pink-500 focus:ring-pink-500"
                    />
                    {course.title}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-control md:col-span-2 mt-6">
              <button
                type="submit"
                className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              >
                Register Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
