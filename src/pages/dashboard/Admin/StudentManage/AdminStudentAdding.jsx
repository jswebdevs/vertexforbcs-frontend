import { useEffect, useState } from "react";

const AdminStudentAdding = ({ onClose, onHoldData, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    contactNo: "",
    subscriptiontype: "",
    startDate: "",
    courses: [],
  });
  const [courses, setCourses] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch("https://vertexforbcs.com/vartexforbcs/web/courses/data")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  useEffect(() => {
    if (onHoldData) {
      setFormData({
        firstname: onHoldData.firstname || "",
        lastname: onHoldData.lastname || "",
        email: onHoldData.email || "",
        password: "", // Password should be generated or set manually
        contactNo: onHoldData.contactNo || "",
        subscriptiontype: "",
        startDate: "",
        courses: [],
      });
    }
  }, [onHoldData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "courses") {
      const selectedCourse = courses.find(
        (course) => course.id.toString() === value
      );
      const newCourses = formData.courses.some(
        (course) => course.id === selectedCourse.id
      )
        ? formData.courses.filter((course) => course.id !== selectedCourse.id)
        : [...formData.courses, selectedCourse];

      setFormData({ ...formData, courses: newCourses });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const generateRandomPassword = () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/`~";

    const getRandomChar = (charset) =>
      charset[Math.floor(Math.random() * charset.length)];

    const randomPassword =
      getRandomChar(upper) +
      getRandomChar(lower) +
      getRandomChar(numbers) +
      getRandomChar(special) +
      Array.from({ length: 6 }, () =>
        getRandomChar(upper + lower + numbers + special)
      ).join("");

    setFormData((prev) => ({ ...prev, password: randomPassword }));
  };

  const calculateValidity = (startDate, subscriptiontype) => {
    const subscriptionMonths = parseInt(subscriptiontype, 10);
    const startDateObj = new Date(startDate);
    const currentDate = new Date();

    const validityInDays =
      subscriptionMonths * 30 -
      Math.ceil((currentDate - startDateObj) / (1000 * 60 * 60 * 24));
    return validityInDays > 0 ? validityInDays : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.courses.length === 0) {
      const error = "Please select at least one course.";
      setErrorMessage(error);
      return;
    }

    const validity = calculateValidity(
      formData.startDate,
      formData.subscriptiontype
    );

    const postData = {
      ...formData,
      image: "/image/user.png",
      validity,
      courses: formData.courses.map((course) => ({
        id: course.id,
        title: course.title,
      })),
    };

    try {
      const response = await fetch(
        "https://vertexforbcs.com/vartexforbcs/web/student/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (response.ok) {
        setSuccessMessage("One Student has been added successfully!");
        setErrorMessage("");

        if (onSuccess) {
          await onSuccess(); // Call delete function from onHold list
        }

        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          contactNo: "",
          subscriptiontype: "",
          startDate: "",
          courses: [],
        });

        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        const errorData = await response.json();
        setErrorMessage("Failed to add student. Please try again.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Failed to add student. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 p-8 rounded shadow-lg w-11/12 md:w-1/3 max-w-md"
        onClick={(e) => e.stopPropagation()}
        style={{ height: "80vh", overflowY: "auto" }}
      >
        <h2 className="text-white text-xl mb-4">Add Student</h2>

        <form onSubmit={handleSubmit}>
          <label className="text-white">First Name:</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white placeholder-gray-400"
            placeholder="First Name"
            required
          />
          <label className="text-white">Last Name:</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white placeholder-gray-400"
            placeholder="Last Name"
            required
          />
          <label className="text-white">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white placeholder-gray-400"
            placeholder="Email"
            required
          />
          <label className="text-white">Password:</label>
          <div className="flex mb-2">
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
              placeholder="Password"
              required
            />
            <button
              type="button"
              className="bg-blue-500 text-white p-2 rounded ml-2"
              onClick={generateRandomPassword}
            >
              Generate
            </button>
          </div>
          <label className="text-white">Contact No:</label>
          <input
            type="text"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white placeholder-gray-400"
            placeholder="11 Digit Bangladeshi Number"
            required
          />
          <label className="text-white">Subscription Type:</label>
          <select
            name="subscriptiontype"
            value={formData.subscriptiontype}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
            required
          >
            <option value="">Select Subscription Type</option>
            <option value="1">1 Month</option>
            <option value="2">2 Months</option>
            <option value="3">3 Months</option>
            <option value="6">6 Months</option>
          </select>
          <label className="text-white">Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
            required
          />
          <label className="text-white">Courses:</label>
          <div className="flex flex-wrap mb-4">
            {courses.map((course) => (
              <label
                key={course.id}
                className="text-white mr-4 mb-2 flex items-center"
              >
                <input
                  type="checkbox"
                  name="courses"
                  value={course.id}
                  onChange={handleChange}
                  checked={formData.courses.some(
                    (selectedCourse) => selectedCourse.id === course.id
                  )}
                  className="mr-2"
                />
                {course.title}
              </label>
            ))}
          </div>
          {successMessage && (
            <p className="text-green-500 mb-2">{successMessage}</p>
          )}
          {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded"
          >
            Add Student
          </button>
          <button
            type="button"
            className="w-full mt-2 bg-red-600 text-white p-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminStudentAdding;
