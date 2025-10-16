import { useState } from "react";
import "./AdminCalendar.css"; // Use your existing CSS styles

const AdminCalendar = ({ quizzes = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });

  const convertToBDT = (date) => {
    // Convert to Bangladesh Standard Time (UTC+6)
    const options = {
      timeZone: "Asia/Dhaka",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return date.toLocaleString("en-US", options);
  };

  const determineQuizStatus = (quiz) => {
    const today = new Date();
    const quizStartTime = new Date(`${quiz.quizDate}T${quiz.startTime}`);
    const quizEndTime = new Date(`${quiz.quizDate}T${quiz.endTime}`);

    const isExpired = quizEndTime < today;
    const isUpcoming24Hours =
      quizStartTime <= new Date(today.getTime() + 24 * 60 * 60 * 1000) &&
      quizStartTime > today;
    const isOngoing = quizStartTime <= today && quizEndTime >= today; // Adjusted for ongoing logic

    let status;
    if (isExpired) {
      status = "completed";

    } else if (isUpcoming24Hours) {
      status = "upcoming-24-hours";

    } else if (isOngoing) {
      status = "ongoing";

    } else {
      status = "upcoming";

    }

    return status;
  };

  const generateCalendar = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const calendarDays = Array.from({ length: firstDayOfMonth }).map(
      (_, idx) => <div key={`empty-${idx}`} className="calendar-empty" />
    );

    // Filter quizzes to include only those in the current month and year
    const monthQuizzes = quizzes.filter((quiz) => {
      if (!quiz || !quiz.quizDate) {
        console.error("Quiz or quizDate is undefined for quiz:", quiz);
        return false; // Exclude this quiz
      }
      const quizDateTime = new Date(`${quiz.quizDate}T${quiz.startTime}`);
      return (
        quizDateTime.getMonth() === currentMonth &&
        quizDateTime.getFullYear() === currentYear
      );
    });

    for (let day = 1; day <= daysInMonth; day++) {
      const quizzesOnThisDay = monthQuizzes.filter((quiz) => {
        const quizDateTime = new Date(`${quiz.quizDate}T${quiz.startTime}`);
        return quizDateTime.getDate() === day;
      });

      const currentDay = new Date(currentYear, currentMonth, day);
      const bgColor =
        quizzesOnThisDay.length > 0
          ? determineQuizStatus(quizzesOnThisDay[0])
          : "";

      // Log the status of quizzes for the current day
      quizzesOnThisDay.forEach((quiz) => {
        const status = determineQuizStatus(quiz);

      });

      calendarDays.push(
        <div
          key={day}
          className={`calendar-date ${bgColor}`}
          onMouseEnter={(e) => {
            const tooltipContent = quizzesOnThisDay
              .map((quiz) => {
                const startTimeInBDT = convertToBDT(
                  new Date(`${quiz.quizDate}T${quiz.startTime}`)
                );
                return `Quiz: ${quiz.quizTitle}\nStart Time: ${startTimeInBDT}\nDuration: ${quiz.duration}`;
              })
              .join("\n\n");
            if (tooltipContent) {
              setTooltip({
                visible: true,
                content: tooltipContent,
                x: e.clientX,
                y: e.clientY,
              });
            }
          }}
          onMouseLeave={() =>
            setTooltip({ visible: false, content: "", x: 0, y: 0 })
          }
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) {
      setCurrentYear((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
    }
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="calendar-container">
      <div className="calendar-header text-white text-2xl">
        <button onClick={handlePrevMonth}>{"<"}</button>
        <h2>
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <button onClick={handleNextMonth}>{">"}</button>
      </div>
      <div className="calendar-grid">{generateCalendar()}</div>

      {tooltip.visible && (
        <div
          className="tooltip"
          
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default AdminCalendar;
