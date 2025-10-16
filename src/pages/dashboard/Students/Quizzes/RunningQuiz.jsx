import { useEffect, useState } from "react";

const RunningQuiz = ({ quiz, studentId, onClose, refreshData }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [warnings, setWarnings] = useState({
    show10Min: false,
    show5Min: false,
  });
  const [scoreDetails, setScoreDetails] = useState({
    totalAnswered: 0,
    rightAnswers: 0,
    wrongAnswers: 0,
    score: 0,
  });

  // Helper function to get the current timestamp in seconds
  const getCurrentTimestamp = () => Math.floor(Date.now() / 1000);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(
          `https://vertexforbcs.com/vartexforbcs/web/quiz/view/${quiz.quizId}`
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch quiz details: ${errorText}`);
        }

        const quizData = await response.json();
        setQuestions(quizData.data.questions);

        // Set timer in seconds
        const durationInSeconds = quizData.data.quiz.duration * 60 || 0;

        const storedStartTime = localStorage.getItem(
          `quizStartTime_${quiz.quizId}`
        );
        const currentTime = getCurrentTimestamp();

        if (storedStartTime) {
          const elapsedTime = currentTime - parseInt(storedStartTime, 10);
          const remainingTime = durationInSeconds - elapsedTime;
          setTimer(Math.max(remainingTime, 0));
        } else {
          localStorage.setItem(`quizStartTime_${quiz.quizId}`, currentTime);
          setTimer(durationInSeconds);
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quiz]);

  useEffect(() => {
    if (timer <= 0) return;

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  useEffect(() => {
    // Show warning for 10 minutes remaining
    if (timer === 600 && !warnings.show10Min) {
      setWarnings((prev) => ({ ...prev, show10Min: true }));
      setTimeout(
        () => setWarnings((prev) => ({ ...prev, show10Min: false })),
        10000
      ); // Hide after 10 seconds
    }

    // Show warning for 5 minutes remaining
    if (timer === 300 && !warnings.show5Min) {
      setWarnings((prev) => ({ ...prev, show5Min: true }));
      setTimeout(
        () => setWarnings((prev) => ({ ...prev, show5Min: false })),
        10000
      ); // Hide after 10 seconds
    }
  }, [timer, warnings.show10Min, warnings.show5Min]);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async () => {
    let rightAnswers = 0;
    let wrongAnswers = 0;

    // Calculate right and wrong answers
    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        rightAnswers++;
      } else if (selectedAnswers[question.id]) {
        wrongAnswers++;
      }
    });

    const totalMarks = questions.reduce(
      (acc, question) => acc + question.Mark,
      0
    );

    const score =
      rightAnswers * questions[0].Mark -
      wrongAnswers * questions[0].negativeMarks;

    setScoreDetails({
      totalAnswered: rightAnswers + wrongAnswers,
      rightAnswers,
      wrongAnswers,
      score,
    });

    const scoreData = {
      student_id: studentId,
      quiz_id: quiz.quizId,
      score,
      course_id: quiz.courseID,
    };

    const scoreboardData = {
      quiz_id: quiz.quizId,
      quiz_title: quiz.quizTitle,
      student_id: studentId,
      firstname: quiz.studentFirstName || "N/A", // Adjust as needed
      lastname: quiz.studentLastName || "N/A", // Adjust as needed
      score,
    };

    try {
      // Submit score data to the first API
      console.log("Sending score data:", scoreData);
      const response = await fetch(
        "https://vertexforbcs.com/vartexforbcs/web/quiz/attempt",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(scoreData),
        }
      );
      const responseData = await response.json();
      console.log("Response from score submission:", responseData);

      if (!response.ok) {
        throw new Error("Failed to submit score to the first API");
      }

      // Submit scoreboard data to the second API
      console.log("Sending scoreboard data:", scoreboardData);
      const scoreboardResponse = await fetch(
        "https://vertexforbcs.com/vartexforbcs/web/scoreboard/create-data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(scoreboardData),
        }
      );
      const scoreboardResponseData = await scoreboardResponse.json();
      console.log(
        "Response from scoreboard submission:",
        scoreboardResponseData
      );

      if (!scoreboardResponse.ok) {
        throw new Error("Failed to submit data to the scoreboard API");
      }

      console.log("Score and scoreboard data submitted successfully!");
      
    } catch (err) {
      console.error("Error submitting data:", err);
      setError(err.message);
    } finally {
      setSubmitted(true);
      localStorage.removeItem(`quizStartTime_${quiz.quizId}`);
    }
    refreshData();

  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins < 10 ? "0" + mins : mins}:${
      secs < 10 ? "0" + secs : secs
    }`;
  };

  if (loading) {
    return <p>Loading quiz data...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div
      className="popup"
      style={{ backgroundColor: "white", color: "#242424" }}
    >
      {/* Warning messages */}
      {warnings.show10Min && (
        <div className="bg-yellow-500 text-white p-3 fixed top-0 w-full text-center">
          Warning: Only 10 minutes left!
        </div>
      )}
      {warnings.show5Min && (
        <div className="bg-red-500 text-white p-3 fixed top-0 w-full text-center">
          Warning: Only 5 minutes left!
        </div>
      )}

      <div
        className="popup-inner"
        style={{ padding: "20px", borderRadius: "8px" }}
      >
        <h2 className="text-2xl font-bold mb-4">{quiz.courseTitle}</h2>
        <h3 className="text-xl font-semibold mb-2">{quiz.quizTitle}</h3>
        <p>Total Marks: {quiz.totalMarks}</p>
        <p>Time Left: {formatTime(timer)}</p>

        {!submitted ? (
          <div>
            {questions.map((question) => (
              <div key={question.id} className="question mt-4">
                <h4>
                  {question.serialNo}. {question.question_title}
                </h4>
                <div>
                  <label>
                    <input
                      type="radio"
                      name={question.id}
                      value="A"
                      checked={selectedAnswers[question.id] === "A"}
                      onChange={() => handleAnswerSelect(question.id, "A")}
                    />
                    A: {question.A}
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name={question.id}
                      value="B"
                      checked={selectedAnswers[question.id] === "B"}
                      onChange={() => handleAnswerSelect(question.id, "B")}
                    />
                    B: {question.B}
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name={question.id}
                      value="C"
                      checked={selectedAnswers[question.id] === "C"}
                      onChange={() => handleAnswerSelect(question.id, "C")}
                    />
                    C: {question.C}
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name={question.id}
                      value="D"
                      checked={selectedAnswers[question.id] === "D"}
                      onChange={() => handleAnswerSelect(question.id, "D")}
                    />
                    D: {question.D}
                  </label>
                </div>
              </div>
            ))}
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
            >
              Submit
            </button>
          </div>
        ) : (
          <div>
            <h3>Quiz Results</h3>
            <p>Number of questions answered: {scoreDetails.totalAnswered}</p>
            <p>Right Answers: {scoreDetails.rightAnswers}</p>
            <p>Wrong Answers: {scoreDetails.wrongAnswers}</p>
            <p>Score: {scoreDetails.score}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RunningQuiz;
