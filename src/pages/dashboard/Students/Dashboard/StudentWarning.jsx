import { useEffect, useState } from "react";
import "./StudentWarning.css";

const StudentWarning = ({ quizzes }) => {
  const [warningMessages, setWarningMessages] = useState([]);
  const [alertType, setAlertType] = useState(""); // Manages the overall alert type (danger, info, success)
  console.log(quizzes);

  useEffect(() => {
    const checkQuizzes = () => {
      if (!Array.isArray(quizzes) || quizzes.length === 0) {
        setWarningMessages([
          "Stay Relaxed, There is no exam in the next 24 hours.",
        ]);
        setAlertType("alert-info");
        return;
      }

      const today = new Date();
      const messages = [];

      // Check for ongoing quizzes
      const ongoingQuizzes = quizzes.filter((quiz) => {
        if (!quiz || !quiz.quizDate || !quiz.endTime) {
          return false;
        }
        const quizStartTime = new Date(`${quiz.quizDate}T${quiz.startTime}`);
        const quizEndTime = new Date(`${quiz.quizDate}T${quiz.endTime}`);
        return today >= quizStartTime && today <= quizEndTime;
      });

      // Add messages for ongoing quizzes
      if (ongoingQuizzes.length > 0) {
        ongoingQuizzes.forEach((quiz) => {
          const quizStartTime = new Date(
            `${quiz.quizDate}T${quiz.startTime}`
          ).toLocaleTimeString();
          messages.push({
            text: `There is a quiz ongoing on "${quiz.quizTitle}", started at ${quizStartTime}.`,
            type: "ongoing",
          });
        });
        setAlertType(""); // Reset alert type for ongoing quizzes
      }

      // Check for upcoming quizzes in the next 24 hours
      const upcomingQuizzes = quizzes.filter((quiz) => {
        if (!quiz || !quiz.quizDate) {
          return false;
        }

        const quizDate = new Date(`${quiz.quizDate}T${quiz.startTime}`);
        const timeDifference = quizDate - today;
        return timeDifference > 0 && timeDifference <= 24 * 60 * 60 * 1000;
      });

      // Add messages for upcoming quizzes
      if (upcomingQuizzes.length > 0) {
        upcomingQuizzes.forEach((quiz) => {
          const quizDate = new Date(`${quiz.quizDate}T${quiz.startTime}`);
          const timeRemaining = quizDate - today;

          const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
          const minutes = Math.floor(
            (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
          );

          const validHours = hours < 0 ? 0 : hours;
          const validMinutes = minutes < 0 ? 0 : minutes;

          messages.push({
            text: `Hurry Up, There is a quiz on "${quiz.quizTitle}" in ${validHours} hours and ${validMinutes} minutes.`,
            type: "upcoming",
          });
        });

        // Set alert type for upcoming quizzes
        setAlertType("alert-danger"); // Red background for upcoming quizzes
      }

      // If no ongoing or upcoming quizzes, set default message
      if (messages.length === 0) {
        messages.push({
          text: "Stay Relaxed, There is no exam in the next 24 hours.",
          type: "info",
        });
        setAlertType("alert-info");
      }

      setWarningMessages(messages);
    };

    checkQuizzes();
  }, [quizzes]);

  return (
    <div className={`text-center p-4`}>
      {warningMessages.map((message, index) => (
        <div
          key={index}
          className={`text-xl font-semibold p-5 m-2 ${
            message.type === "ongoing"
              ? "bg-green-500 opacity-100"
              : message.type === "upcoming"
              ? "bg-red-500 opacity-100"
              : "bg-blue-200 opacity-100"
          }`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default StudentWarning;
