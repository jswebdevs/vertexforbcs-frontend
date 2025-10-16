import "./studentstats.css"; // Ensure to create a CSS file for styling

const StudentStats = ({ studentData }) => {
  const totalCourses = studentData.courses.length;

  // Calculate the average marks from quizzes attended
  const totalMarks = studentData.courses.reduce((acc, course) => {
    const attendedQuizzes = course.QuizAttended || [];
    return (
      acc + attendedQuizzes.reduce((quizAcc, quiz) => quizAcc + quiz.marks, 0)
    );
  }, 0);

  const totalQuizzesAttended = studentData.courses.reduce((acc, course) => {
    return acc + (course.QuizAttended ? course.QuizAttended.length : 0);
  }, 0);

  // Upcoming quizzes calculation
  const upcomingQuizzes = studentData.courses.flatMap(
    (course) => course.upComingQuizes
  );

  const averageMarks =
    totalQuizzesAttended > 0
      ? (totalMarks / totalQuizzesAttended).toFixed(2)
      : 0;

  return (
    <div className="student-stats grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="stat-card">
        <h3>Total Courses</h3>
        <p className="stat-value">{totalCourses}</p>
      </div>
      <div className="stat-card">
        <h3>Average Marks</h3>
        <p className="stat-value">{averageMarks}</p>
      </div>
      <div className="stat-card">
        <h3>Quizzes Attended</h3>
        <p className="stat-value">{totalQuizzesAttended}</p>
      </div>
      <div className="stat-card">
        <h3>Upcoming Quizzes</h3>
        <p className="stat-value">{upcomingQuizzes.length}</p>
      </div>
    </div>
  );
};

export default StudentStats;
