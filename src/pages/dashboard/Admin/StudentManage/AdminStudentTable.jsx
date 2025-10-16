import { useEffect, useState } from "react";
import AdminStudentDeleting from "./AdminStudentDeleting";
import AdminStudentEditing from "./AdminStudentEditing"; // Import the new form component
import "./AdminStudent.css";

const AdminStudentTable = () => {
  const [students, setStudents] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    // Fetch students
    fetch("https://vertexforbcs.com/vartexforbcs/web/student")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setErrorMessage(
          "There are no Student Data Currently. Start Adding Students."
        );
      });

    // Fetch courses
    fetch("https://vertexforbcs.com/vartexforbcs/web/courses/data")
      .then((response) => response.json())
      .then((data) => setAllCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const handleEditSubmit = (updatedStudent) => {
    // Update the student data in the state after a successful edit
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
    closeEditForm();
  };

  const sortedStudents = [...students].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setIsDeleting(true);
  };

  const confirmDelete = () => {
    fetch(
      `https://vertexforbcs.com/vartexforbcs/web/student/delete/${studentToDelete.id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete the student");
        }
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.id !== studentToDelete.id)
        );
        setIsDeleting(false);
        setStudentToDelete(null);
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });
  };

  const cancelDelete = () => {
    setIsDeleting(false);
    setStudentToDelete(null);
  };

  const handleEditClick = (student) => {
    setStudentToEdit(student);
    setIsEditing(true);
  };

  const closeEditForm = () => {
    setIsEditing(false);
    setStudentToEdit(null);
  };

  return (
    <div className="overflow-auto max-h-[70vh]">
      {errorMessage && (
        <div className="text-red-500 text-center p-4">{errorMessage}</div>
      )}
      <table className="min-w-full bg-gray-800 text-white table">
        <thead>
          <tr>
            <th
              onClick={() => requestSort("id")}
              className="cursor-pointer p-2 text-left text-xl"
            >
              ID
            </th>
            <th
              onClick={() => requestSort("username")}
              className="cursor-pointer p-2 text-left text-xl"
            >
              Username
            </th>
            <th
              onClick={() => requestSort("email")}
              className="cursor-pointer p-2 text-left text-xl"
            >
              Email
            </th>
            <th
              onClick={() => requestSort("courses")}
              className="cursor-pointer p-2 text-left text-xl"
            >
              Courses
            </th>
            <th
              onClick={() => requestSort("subscriptiontype")}
              className="cursor-pointer p-2 text-left text-xl"
            >
              Subscription
            </th>
            <th
              onClick={() => requestSort("startDate")}
              className="cursor-pointer p-2 text-left text-xl"
            >
              Start Date
            </th>
            <th
              onClick={() => requestSort("validity")}
              className="cursor-pointer p-2 text-left text-xl"
            >
              Validity
            </th>
            <th className="p-2 text-left text-xl">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.map((student) => (
            <tr key={student.id} className="hover:bg-gray-700">
              <td className="p-2 text-left">{student.id}</td>
              <td className="p-2 text-left">{student.username}</td>
              <td className="p-2 text-left">{student.email}</td>
              <td className="p-2 text-left">
                {student.courses && student.courses.length > 0
                  ? student.courses.map((course) => course.title).join(", ")
                  : "No courses"}
              </td>
              <td className="p-2 text-left">
                {student.subscriptiontype} Months
              </td>
              <td className="p-2 text-left">{student.startDate}</td>
              <td className="p-2 text-left">{student.validity}</td>
              <td className="p-2 text-left">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded me-3"
                  onClick={() => handleEditClick(student)}
                >
                  Edit
                </button>

                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteClick(student)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isDeleting && (
        <AdminStudentDeleting
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          studentName={studentToDelete.username}
        />
      )}

      {isEditing && studentToEdit && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 min-w-[400px]">
          <div
            className="bg-black rounded-lg overflow-auto max-h-[80vh] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <AdminStudentEditing
              closeEditForm={closeEditForm}
              student={studentToEdit}
              allCourses={allCourses} // Pass allCourses here
              onSubmit={handleEditSubmit} // Pass this to handle successful editing
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStudentTable;
