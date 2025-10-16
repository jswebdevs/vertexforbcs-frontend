import { useEffect, useRef, useState } from "react";

const ScoreTable = ({ quizId, onClose }) => {
  const popupRef = useRef(null);
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to close the popup if clicking outside
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    // Fetch scores from the API
    const fetchScores = async () => {
      try {
        const response = await fetch(
          `https://vertexforbcs.com/vartexforbcs/web/ranking/quiz/${quizId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setScores(data);
      } catch (err) {
        console.error("Error fetching score data:", err);
        setError("Failed to load score data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchScores();
  }, [quizId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={popupRef}
        className="bg-gray-700 text-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative"
      >
        <h3 className="text-xl font-semibold mb-4">
          Score Table for Quiz {quizId}
        </h3>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
        >
          Close
        </button>

        {isLoading ? (
          <p>Loading scores...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : scores.length === 0 ? (
          <p>No scores available for this quiz.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-600 border border-gray-500">
              <thead>
                <tr className="bg-gray-800">
                  <th className="py-2 px-4 text-left border">Student ID</th>
                  <th className="py-2 px-4 text-left border">First Name</th>
                  <th className="py-2 px-4 text-left border">Last Name</th>
                  <th className="py-2 px-4 text-left border">Score</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-700">
                    <td className="py-2 px-4 border">{student.id}</td>
                    <td className="py-2 px-4 border">{student.firstname}</td>
                    <td className="py-2 px-4 border">{student.lastname}</td>
                    <td className="py-2 px-4 border">{student.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreTable;
