import { useState } from "react";

const AdminCourseAdding = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    startDate: "",
    endDate: "",
    courseImage: null,
    enrolledStudents: 0,
    imageGallery: [],
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const teacherID = 101; // Automatically set teacher ID
  const teacherName = "Jamil"; // Automatically set teacher name

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle file uploads for course image and gallery
    if (name === "courseImage") {
      setFormData({ ...formData, courseImage: e.target.files[0] });
    } else if (name === "imageGallery") {
      const files = Array.from(e.target.files);
      setFormData({ ...formData, imageGallery: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.floor((end - start) / (1000 * 60 * 60 * 24)); // Duration in days
    return duration >= 0 ? duration : 0; // Ensure duration is not negative
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((file) => {
          formDataToSend.append(key, file);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Append teacher ID and teacher name
    formDataToSend.append("teacherID", teacherID);
    formDataToSend.append("teacherName", teacherName);

    // Calculate and append duration
    const duration = calculateDuration(formData.startDate, formData.endDate);
    formDataToSend.append("duration", duration);

    // Log the object being sent
    console.log("Data being sent:", Object.fromEntries(formDataToSend));

    try {
      const response = await fetch(
        "https://vertexforbcs.com/vartexforbcs/web/course/create", // API endpoint to add courses
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        setSuccessMessage("Course added successfully!");
        setErrorMessage("");
        console.log("Success message:", "Course added successfully!");

        // Reset form data
        setFormData({
          title: "",
          description: "",
          category: "",
          level: "",
          startDate: "",
          endDate: "",
          courseImage: null,
          enrolledStudents: 0,
          imageGallery: [],
        });

        // Wait for 3 seconds before closing
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        throw new Error("Failed to add course.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to add course. Please try again.");
      setSuccessMessage("");
      console.log("Error message:", "Failed to add course. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose} // Close on background click
    >
      <div
        className="bg-gray-800 p-8 rounded shadow-lg w-11/12 md:w-1/3 max-w-md"
        onClick={(e) => e.stopPropagation()} // Prevent background click from closing
        style={{ height: "80vh", overflowY: "auto" }}
      >
        <h2 className="text-white text-xl mb-4">Add Course</h2>

        <form onSubmit={handleSubmit}>
          <label className="text-white">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white placeholder-gray-400"
            placeholder="Course Title"
            required
          />
          <label className="text-white">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white placeholder-gray-400"
            placeholder="Course Description"
            required
          />
          <label className="text-white">Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white placeholder-gray-400"
            placeholder="Course Category"
            required
          />
          <label className="text-white">Level:</label>
          <input
            type="text"
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white placeholder-gray-400"
            placeholder="Course Level"
            required
          />
          <label className="text-white">Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
            required
          />
          <label className="text-white">End Date:</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
            required
          />
          <label className="text-white">Course Image:</label>
          <input
            type="file"
            name="courseImage"
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
          />
          <label className="text-white">Syllabus (Optional)</label>
          <input
            type="file"
            name="imageGallery"
            multiple
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
          />
          {successMessage && (
            <div className="text-green-500">{successMessage}</div>
          )}
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <div className="flex justify-between">
            <button
              type="button"
              className="w-1/2 bg-red-500 text-white p-2 rounded mr-2"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="w-1/2 bg-green-500 text-white p-2 rounded"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCourseAdding;
