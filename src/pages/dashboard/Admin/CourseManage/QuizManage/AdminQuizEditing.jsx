import { useState, useEffect } from "react";

const AdminQuizEditing = ({ quiz, onEditQuiz, onClose }) => {
  const [quizTitle, setQuizTitle] = useState(quiz?.quizTitle || "");
  const [quizDescription, setQuizDescription] = useState(
    quiz?.quizDescription || ""
  );
  const [totalMarks, setTotalMarks] = useState(quiz?.totalMarks || "");
  const [quizDate, setQuizDate] = useState(quiz?.quizDate || "");
  const [startTime, setStartTime] = useState(quiz?.startTime || "");
  const [endTime, setEndTime] = useState(quiz?.endTime || "");
  const [error, setError] = useState(null);

  // Prefill the form with the existing quiz data when the component is mounted
  useEffect(() => {
    if (quiz) {
      setQuizTitle(quiz.quizTitle);
      setQuizDescription(quiz.quizDescription);
      setTotalMarks(quiz.totalMarks);
      setQuizDate(quiz.quizDate);
      setStartTime(quiz.startTime);
      setEndTime(quiz.endTime);
    }
  }, [quiz]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedQuiz = {
      quizId: quiz.quizId,
      quizTitle,
      quizDescription,
      totalMarks,
      quizDate,
      startTime,
      endTime,
    };

    try {
      const response = await fetch(`https://vertexforbcs.com/vartexforbcs/web/quiz/update/${quiz.quizId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedQuiz),
      });

      if (!response.ok) {
        throw new Error("Failed to update quiz");
      }

      const data = await response.json();
      onEditQuiz(data); // Pass the updated quiz data to the parent component
      onClose(); // Close the modal
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Quiz</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Quiz Title</label>
          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Total Marks</label>
          <input
            type="number"
            value={totalMarks}
            onChange={(e) => setTotalMarks(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Quiz Date</label>
          <input
            type="date"
            value={quizDate}
            onChange={(e) => setQuizDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminQuizEditing;
