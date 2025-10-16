import { useEffect, useState } from "react";

const StudentCourseTable = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await fetch("https://vertexforbcs.com/vartexforbcs/web/student/courses"); // Adjust this endpoint as needed
        if (!response.ok) {
          throw new Error("Failed to fetch enrolled courses");
        }
        const data = await response.json();
        setEnrolledCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  if (loading) {
    return <p>Loading enrolled courses...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl font-bold mb-4">My Enrolled Courses</h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {enrolledCourses.length > 0 ? (
            enrolledCourses.map((course) => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{course.description}</td>
                <td>{course.status}</td>
                <td>
                  <button className="btn btn-primary">View Course</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No enrolled courses available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentCourseTable;
