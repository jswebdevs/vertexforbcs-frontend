import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth"; // Updated to single AuthProvider
import RunningQuiz from "./RunningQuiz";
import Modal from "./Modal";

const StudentQuizzes = () => {
  const { user, userType } = useAuth();
  const studentId = user?.uid || null;
  const studentName = user?.displayName || "Student";

  const [quizzes, setQuizzes] = useState([]);
  const [studentScores, setStudentScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // Function to refresh quiz data after submitting a quiz
  const refreshData = async () => {
    try {
      const quizResponse = await fetch(
        `https://vertexforbcs.com/vartexforbcs/web/quiz/index`
      );
      if (!quizResponse.ok) throw new Error("Failed to fetch quiz data");
      const quizData = await quizResponse.json();
      const filteredQuizzes = quizData.data;

      const scoresResponse = await fetch(
        `https://vertexforbcs.com/vartexforbcs/web/ranking/quiz/single-student/${studentId}`
      );
      if (!scoresResponse.ok) throw new Error("Failed to fetch student scores");
      const scoresData = await scoresResponse.json();

      setQuizzes(filteredQuizzes);
      setStudentScores(scoresData);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!studentId) {
        setLoading(false);
        return;
      }

      try {
        const studentResponse = await fetch(
          `https://vertexforbcs.com/vartexforbcs/web/student/${studentId}`
        );
        if (!studentResponse.ok)
          throw new Error("Failed to fetch student data");
        const studentData = await studentResponse.json();
        const enrolledCourseIds = studentData.courses.map(
          (course) => course.courseID
        );

        const quizResponse = await fetch(
          `https://vertexforbcs.com/vartexforbcs/web/quiz/index`
        );
        if (!quizResponse.ok) throw new Error("Failed to fetch quiz data");
        const quizData = await quizResponse.json();
        const filteredQuizzes = quizData.data.filter((quiz) =>
          enrolledCourseIds.includes(quiz.courseID)
        );

        const scoresResponse = await fetch(
          `https://vertexforbcs.com/vartexforbcs/web/ranking/quiz/single-student/${studentId}`
        );
        if (!scoresResponse.ok)
          throw new Error("Failed to fetch student scores");
        const scoresData = await scoresResponse.json();

        setQuizzes(filteredQuizzes);
        setStudentScores(scoresData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  const handleAttend = (quiz) => {
    setSelectedQuiz(quiz);
    setShowWelcomeModal(true);
  };

  const handleAttendNow = () => {
    setActiveQuiz(selectedQuiz);
    setShowWelcomeModal(false);
  };

  const getQuizScore = (quizId) => {
    const scoreEntry = studentScores.find(
      (score) => score.quizTitle === quizId
    );
    return scoreEntry ? scoreEntry.score : "N/A";
  };

  if (loading) return <p>Loading quizzes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (quizzes.length === 0) return <p>No upcoming quizzes.</p>;

  const now = new Date();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Quizzes</h1>
      <div className="overflow-x-auto mx-0">
        <table className="min-w-full bg-gray-800 border border-gray-700">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left text-white">Serial</th>
              <th className="py-2 px-4 text-left text-white">
                Course Title - Quiz Title
              </th>
              <th className="py-2 px-4 text-left text-white">Syllabus</th>
              <th className="py-2 px-4 text-left text-white">Exam Date</th>
              <th className="py-2 px-4 text-left text-white">Start Time</th>
              <th className="py-2 px-4 text-left text-white">End Time</th>
              <th className="py-2 px-4 text-left text-white">Duration</th>
              <th className="py-2 px-4 text-left text-white">
                Marks (Score/Highest/Total)
              </th>
              <th className="py-2 px-4 text-left text-white min-w-[140px]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz, index) => {
              const startTime = new Date(`${quiz.quizDate}T${quiz.startTime}`);
              const endTime = new Date(`${quiz.quizDate}T${quiz.endTime}`);
              const score = getQuizScore(quiz.quizTitle);

              return (
                <tr key={quiz.quizId} className="border-b border-gray-700">
                  <td className="py-2 px-4 text-white">{index + 1}</td>
                  <td className="py-2 px-4 text-white">
                    {quiz.courseTitle} - {quiz.quizTitle}
                  </td>
                  <td className="py-2 px-4 text-white">
                    {quiz.quizDescription}
                  </td>
                  <td className="py-2 px-4 text-white">{quiz.quizDate}</td>
                  <td className="py-2 px-4 text-white">{quiz.startTime}</td>
                  <td className="py-2 px-4 text-white">{quiz.endTime}</td>
                  <td className="py-2 px-4 text-white">
                    {quiz.duration || "N/A"}
                  </td>
                  <td className="py-2 px-4 text-white">
                    {score}/{quiz.highestMarks || "N/A"}/
                    {quiz.totalMarks || "N/A"}
                  </td>
                  <td className="py-auto px-auto text-white">
                    {now > endTime ? (
                      <a
                        href={`https://vertexforbcs.com/vartexforbcs/web/quiz/download-pdf/${quiz.quizId}`}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                        rel="noopener noreferrer"
                      >
                        Download PDF
                      </a>
                    ) : now >= startTime && now <= endTime ? (
                      score !== "N/A" ? (
                        <span className="bg-yellow-500 text-white font-bold py-1 px-2 rounded">
                          Appeared
                        </span>
                      ) : (
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                          onClick={() => handleAttend(quiz)}
                        >
                          Attend
                        </button>
                      )
                    ) : (
                      <span className="text-gray-500">Upcoming</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Welcome Modal */}
      {showWelcomeModal && selectedQuiz && (
        <Modal onClose={() => setShowWelcomeModal(false)}>
          <div className="p-4 text-[#242424]">
            <h2 className="text-2xl font-bold mb-4">Welcome, {studentName}!</h2>
            <p>
              You are about to start the exam on{" "}
              <span className="font-bold">{selectedQuiz.quizTitle}</span>.
            </p>
            <p>
              The quiz duration is:{" "}
              <span className="font-bold">{selectedQuiz.duration} minutes</span>
              .
            </p>
            <p className="mt-2 text-red-500">
              You can't go back once you have started the exam.
            </p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAttendNow}
              >
                Attend Now
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowWelcomeModal(false)}
              >
                Attend Later
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Running Quiz Modal */}
      {activeQuiz && (
        <Modal onClose={() => setActiveQuiz(null)}>
          <RunningQuiz
            quiz={activeQuiz}
            onClose={() => setActiveQuiz(null)}
            studentId={studentId}
            refreshData={refreshData}
          />
        </Modal>
      )}
    </div>
  );
};

export default StudentQuizzes;
