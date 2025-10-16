import { Link } from "react-router-dom";

const AdminStats = ({ courseData, studentData, onHoldSubscriptions, quizzes }) => {
  const totalCourses = courseData.length;
  const totalStudents = studentData.length;
  const totalQuizzes = quizzes.length;


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
        <Link to="/admin/manage-courses">
          <h2 className="text-lg font-bold">Total Courses</h2>
          <p className="text-2xl">{totalCourses}</p>
        </Link>
      </div>
      <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">Total Quizzes</h2>
        <p className="text-2xl">{totalQuizzes}</p>
      </div>
      <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
        <Link to="/admin/manage-students">
          <h2 className="text-lg font-bold">Enrolled Students</h2>
          <p className="text-2xl">{totalStudents}</p>
        </Link>
      </div>
      <div className="bg-red-500 text-white p-6 rounded-lg shadow-md">
        <Link to='/admin/onHold'>
          <h2 className="text-lg font-bold">On Hold Subscriptions</h2>
          <p className="text-2xl">{onHoldSubscriptions}</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminStats;
