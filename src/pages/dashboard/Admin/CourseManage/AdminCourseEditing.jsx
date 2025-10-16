import { useState } from "react";

const AdminCourseEditing = ({ course, onClose, onCourseUpdated }) => {
  const [formData, setFormData] = useState({
    id: course.id,
    title: course.title || "",
    description: course.description || "",
    category: course.category || "",
    level: course.level || "",
    startDate: course.startDate || "",
    endDate: course.endDate || "",
    courseImage: null, // Initialize as null for file uploads
    imageGallery: [], // Initialize as an empty array for file uploads
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const teacherID = 101; // Automatically set teacher ID
  const teacherName = "Jamil"; // Automatically set teacher name

  const handleChange = (e) => {
    const { name, value } = e.target;

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
    const duration = Math.floor((end - start) / (1000 * 60 * 60 * 24));
    return duration >= 0 ? duration : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();

    // Only append the course image if a new file is uploaded
    if (formData.courseImage !== null) {
      formDataToSend.append("courseImage", formData.courseImage);
    }

    // Only append the image gallery if new files are uploaded
    if (formData.imageGallery.length > 0) {
      formData.imageGallery.forEach((file) => {
        formDataToSend.append("imageGallery", file);
      });
    }

    // Append other form data
    Object.keys(formData).forEach((key) => {
      if (!["courseImage", "imageGallery"].includes(key)) {
        formDataToSend.append(key, formData[key]);
      }
    });

    formDataToSend.append("teacherID", teacherID);
    formDataToSend.append("teacherName", teacherName);

    const duration = calculateDuration(formData.startDate, formData.endDate);
    formDataToSend.append("duration", duration);

    // Log the form data and course ID
    console.log("Sending updated course data for course ID:", course.id);
    console.log("Form data:", Object.fromEntries(formDataToSend));

    try {
      const response = await fetch(
        `https://vertexforbcs.com/vartexforbcs/web/course/update/${course.id}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update course.");
      }


      const updatedCourse = await response.json();
      onCourseUpdated(updatedCourse); // Update parent component with new course data
      setSuccessMessage("Course updated successfully!");
      setErrorMessage("");
      setTimeout(onClose, 3000); // Close form after 3 seconds
    } catch (err) {
      console.error("Error:", err);
      setErrorMessage("Failed to update course. Please try again.");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-4 rounded shadow-lg w-11/12 md:w-1/3 h-[80vh] overflow-auto">
        <h2 className="text-2xl mb-4 text-white">Edit Course</h2>
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white">Course Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full p-2 bg-gray-700 text-white rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full p-2 bg-gray-700 text-white rounded"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-white">Category:</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full p-2 bg-gray-700 text-white rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Level:</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="mt-1 block w-full p-2 bg-gray-700 text-white rounded"
              required
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-white">Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="mt-1 block w-full p-2 bg-gray-700 text-white rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">End Date:</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="mt-1 block w-full p-2 bg-gray-700 text-white rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Course Image:</label>
            <input
              type="file"
              name="courseImage"
              onChange={handleChange}
              className="mt-1 block w-full p-2 bg-gray-700 text-white rounded"
            />
            {course.courseImage && !formData.courseImage && (
              <img
                src={course.courseImage}
                alt="Current Course Image"
                className="w-1/2 mt-2"
              />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-white">Image Gallery:</label>
            <input
              type="file"
              name="imageGallery"
              multiple
              onChange={handleChange}
              className="mt-1 block w-full p-2 bg-gray-700 text-white rounded"
            />
            {Array.isArray(course.imageGallery) &&
              formData.imageGallery.length === 0 && (
                <div className="mt-2">
                  {course.imageGallery.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Gallery Image ${index + 1}`}
                      className="w-1/4"
                    />
                  ))}
                </div>
              )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? "Updating..." : "Update Course"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCourseEditing;
