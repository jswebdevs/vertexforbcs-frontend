import { useEffect, useState } from "react";
import { useStudentAuth } from "../../../../providers/StudentAuthProvider"; // Adjust the import path as necessary

const StudentProfile = () => {
  const { studentId } = useStudentAuth();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        if (!studentId) return; // Ensure studentId is present

        const response = await fetch(
          `https://vertexforbcs.com/vartexforbcs/web/student/${studentId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        const data = await response.json();
        setStudent(data); // Set the retrieved student data
      } catch (err) {
        setError("Error fetching student data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {student ? (
        <div className="text-center">
          <img
            src={student.image} // Adjust the image source as necessary
            alt="Student Profile"
            className="rounded-full w-24 h-24 mb-4 mx-auto"
          />
          <h1 className="text-xl font-bold capitalize">
            Name: {student.firstname} {student.lastname}
          </h1>
          <p>Username: {student.username}</p>
          <p>Email: {student.email}</p>
        </div>
      ) : (
        <p>No student data available.</p>
      )}
    </div>
  );
};

export default StudentProfile;
