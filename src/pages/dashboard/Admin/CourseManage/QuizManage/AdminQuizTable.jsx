import { useState } from "react";
import AdminQuizViewing from "./AdminQuizViewing"; // Import the viewing component
import AdminQuizEditing from "./AdminQuizEditing"; // Import the editing component
import AdminQuizDeleting from "./AdminQuizDeleting"; // Import the deleting component
import ScoreTable from "./ScoreTable"; // Import the score table component

const AdminQuizTable = ({ quizzes, onEditQuiz }) => {
  const [isViewingQuiz, setIsViewingQuiz] = useState(false);
  const [isEditingQuiz, setIsEditingQuiz] = useState(false);
  const [isDeletingQuiz, setIsDeletingQuiz] = useState(false);
  const [isViewingScoreTable, setIsViewingScoreTable] = useState(false); // State for score table visibility
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleViewQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setIsViewingQuiz(true);
  };

  const handleViewScoreTable = (quiz) => {
    setSelectedQuiz(quiz);
    setIsViewingScoreTable(true);
  };

  const handleCloseViewingQuiz = () => {
    setIsViewingQuiz(false);
    setSelectedQuiz(null);
  };

  const handleCloseScoreTable = () => {
    setIsViewingScoreTable(false);
    setSelectedQuiz(null);
  };

  const handleCloseEditingQuiz = () => {
    setIsEditingQuiz(false);
    setSelectedQuiz(null);
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      const response = await fetch(
        `https://vertexforbcs.com/vartexforbcs/web/quiz/delete/${quizId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json(); // Assuming the API returns JSON
    } catch (error) {
      console.error("Failed to delete quiz:", error);
      throw error; // Rethrow error to be handled in the deleting component
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4 text-white">Quizzes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 border border-gray-700">
          <thead>
            <tr className="bg-gray-700">
              <th className="py-2 px-4 text-left text-white border-b">
                Quiz ID
              </th>
              <th className="py-2 px-4 text-left text-white border-b">
                Quiz Title
              </th>
              <th className="py-2 px-4 text-left text-white border-b">
                Description
              </th>
              <th className="py-2 px-4 text-left text-white border-b">
                Total Marks
              </th>
              <th className="py-2 px-4 text-left text-white border-b">
                Highest Marks
              </th>
              <th className="py-2 px-4 text-left text-white border-b">
                Quiz Date
              </th>
              <th className="py-2 px-4 text-left text-white border-b">
                Start Time
              </th>
              <th className="py-2 px-4 text-left text-white border-b">
                End Time
              </th>
              <th className="py-2 px-4 text-left text-white border-b">
                Duration
              </th>
              <th className="py-2 px-4 text-left text-white border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz.quizId} className="hover:bg-gray-600">
                <td className="py-2 px-4 text-white border-b">{quiz.quizId}</td>
                <td className="py-2 px-4 text-white border-b">
                  {quiz.quizTitle}
                </td>
                <td className="py-2 px-4 text-white border-b">
                  {quiz.quizDescription}
                </td>
                <td className="py-2 px-4 text-white border-b">
                  {quiz.totalMarks}
                </td>
                <td className="py-2 px-4 text-white border-b">
                  {quiz.highestMarks}
                </td>
                <td className="py-2 px-4 text-white border-b">
                  {quiz.quizDate}
                </td>
                <td className="py-2 px-4 text-white border-b">
                  {quiz.startTime}
                </td>
                <td className="py-2 px-4 text-white border-b">
                  {quiz.endTime}
                </td>
                <td className="py-2 px-4 text-white border-b">
                  {quiz.duration}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleViewQuiz(quiz)}
                    className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                  >
                    View Questions
                  </button>
                  <button
                    onClick={() => handleViewScoreTable(quiz)}
                    className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  >
                    View Score Table
                  </button>
                  <button
                    onClick={() => {
                      setSelectedQuiz(quiz);
                      setIsDeletingQuiz(true);
                    }}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render the AdminQuizViewing modal if a quiz is selected */}
      {isViewingQuiz && (
        <AdminQuizViewing
          quiz={selectedQuiz}
          onClose={handleCloseViewingQuiz}
        />
      )}

      {/* Render the AdminQuizEditing modal if a quiz is selected for editing */}
      {isEditingQuiz && (
        <AdminQuizEditing
          quiz={selectedQuiz}
          onEditQuiz={onEditQuiz}
          onClose={handleCloseEditingQuiz}
        />
      )}

      {/* Render the AdminQuizDeleting modal if a quiz is selected for deletion */}
      {isDeletingQuiz && selectedQuiz && (
        <AdminQuizDeleting
          quizTitle={selectedQuiz.quizTitle}
          onDeleteQuiz={() => handleDeleteQuiz(selectedQuiz.quizId)}
          onClose={() => {
            setIsDeletingQuiz(false);
            setSelectedQuiz(null);
          }}
        />
      )}

      {/* Render the ScoreTable modal if the score table is being viewed */}
      {isViewingScoreTable && selectedQuiz && (
        <ScoreTable
          quizId={selectedQuiz.quizId}
          onClose={handleCloseScoreTable}
        />
      )}
    </div>
  );
};

export default AdminQuizTable;
