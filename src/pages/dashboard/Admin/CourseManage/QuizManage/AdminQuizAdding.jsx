import { useState } from "react";

const AdminQuizAdding = ({ courseID, courseTitle, onClose }) => {
  const [formData, setFormData] = useState({
    quizTitle: "",
    quizDescription: "",
    quizDate: "",
    totalMarks: "",
    startTime: "",
    endTime: "",
    duration: "", // Added duration field
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quizData = {
      courseTitle: courseTitle,
      courseID: courseID,
      quizTitle: formData.quizTitle,
      quizDescription: formData.quizDescription,
      quizDate: formData.quizDate,
      totalMarks: parseInt(formData.totalMarks, 10),
      startTime: formData.startTime,
      endTime: formData.endTime,
      duration: formData.duration, // Use the manually inputted duration
      highestMarks: null,
    };

    // Log the object being sent
    console.log("Data being sent:", quizData);

    try {
      const response = await fetch(
        "https://vertexforbcs.com/vartexforbcs/web/quiz/create", // Update the URL
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(quizData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add quiz.");
      }

      const addedQuiz = await response.json();
      console.log("Added quiz:", addedQuiz); // Log added quiz data

      setSuccessMessage("Quiz added successfully!");
      setErrorMessage("");
      console.log("Success message:", "Quiz added successfully!");

      // Reset form data
      setFormData({
        quizTitle: "",
        quizDescription: "",
        quizDate: "",
        totalMarks: "",
        startTime: "",
        endTime: "",
        duration: "", // Reset duration
      });
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to add quiz. Please try again.");
      setSuccessMessage("");
      console.log("Error message:", "Failed to add quiz. Please try again.");
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
        <h2 className="text-white text-xl mb-4">Add Quiz for {courseTitle}</h2>

        <form onSubmit={handleSubmit}>
          <label className="text-white">Quiz Title:</label>
          <input
            type="text"
            name="quizTitle"
            value={formData.quizTitle}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white placeholder-gray-400"
            placeholder="Quiz Title"
            required
          />
          <label className="text-white">Quiz Description:</label>
          <textarea
            name="quizDescription"
            value={formData.quizDescription}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white placeholder-gray-400"
            placeholder="Quiz Description"
            required
          />
          <label className="text-white">Quiz Date:</label>
          <input
            type="date"
            name="quizDate"
            value={formData.quizDate}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
            required
          />
          <label className="text-white">Total Marks:</label>
          <input
            type="number"
            name="totalMarks"
            value={formData.totalMarks}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
            required
          />
          <label className="text-white">Start Time:</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
            required
          />
          <label className="text-white">End Time:</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
            required
          />
          <label className="text-white">Duration:</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white placeholder-gray-400"
            placeholder="Duration (e.g., 30 minutes)"
            required
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
              Add Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminQuizAdding;
