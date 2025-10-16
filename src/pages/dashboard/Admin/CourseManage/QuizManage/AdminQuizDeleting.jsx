import { useState } from "react";

const AdminQuizDeleting = ({ quizTitle, onDeleteQuiz, onClose }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    setResponseMessage(""); // Reset the response message before deletion
    try {
      const response = await onDeleteQuiz(); // This will call the delete function from AdminQuizTable

      // Log the response for debugging
      console.log("Delete response:", response);

      // Check if the response indicates success
      if (response && response.message === "Success") {
        setIsSuccess(true);
        setResponseMessage("Quiz deleted successfully.");
        // Close the popup and refresh the page after a short delay
        setTimeout(() => {
          onClose(); // Close the popup
          window.location.reload(); // Refresh the page
        }, 1000); // Adjust delay as needed
      } else {
        // Log the actual response if deletion fails
        console.log("Quiz deletion failed:", response);
        setIsSuccess(false);
        setResponseMessage("Failed to delete the quiz. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting quiz:", error); // Log the error for debugging
      setIsSuccess(false);
      setResponseMessage("Error deleting the quiz: " + error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded p-6 w-1/3 text-black">
        <h2 className="text-xl font-bold mb-4">Delete Quiz</h2>
        <p>
          Are you sure you want to delete the quiz: <strong>{quizTitle}</strong>
          ?
        </p>
        <div className="flex mt-4">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`mr-2 ${
              isDeleting ? "bg-gray-400" : "bg-red-500 hover:bg-red-700"
            } text-white font-bold py-2 px-4 rounded`}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>

        {responseMessage && (
          <div
            className={`response-message mt-4 p-2 rounded ${
              isSuccess
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {responseMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminQuizDeleting;
