import { useEffect, useState } from "react";

const AdminStudentEditing = ({
  closeEditForm,
  student,
  allCourses,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    subscriptiontype: student.subscriptiontype || "",
    startDate: student.startDate || "",
  });
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for tracking submission

  useEffect(() => {
    // Set initial assigned courses based on student data
    const initialAssignedCourses = allCourses.filter((course) =>
      student.courses.some((c) => c.id === course.id)
    );
    setAssignedCourses(initialAssignedCourses.map((course) => course.id));
  }, [allCourses, student]);

  const calculateValidity = () => {
    const startDate = new Date(formData.startDate);
    const subscriptionDays = formData.subscriptiontype * 30; // Convert subscription type to days
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + subscriptionDays);

    const today = new Date();
    const validityInDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
    return validityInDays >= 0 ? validityInDays : 0; // Return 0 if past the expiration date
  };

  const handleCheckboxChange = (courseId) => {
    setAssignedCourses(
      (prevAssigned) =>
        prevAssigned.includes(courseId)
          ? prevAssigned.filter((id) => id !== courseId) // Unassign course
          : [...prevAssigned, courseId] // Assign course
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting to true
    const updatedStudent = {
      id: student.id,
      validity: calculateValidity(), // Calculate validity
      courses: assignedCourses,
      // Only include the fields that are editable
      startDate: formData.startDate,
      subscriptiontype: formData.subscriptiontype,
    };

    fetch(
      `https://vertexforbcs.com/vartexforbcs/web/student/update/${student.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStudent),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update student");
        }
        return response.json();
      })
      .then((data) => {
        onSubmit(data); // Pass the updated student back to the parent
        setSuccessMessage("Student updated successfully!"); // Set success message

        // Close the form after 2 seconds
        setTimeout(() => {
          closeEditForm(); // Close the edit form
          setSuccessMessage(""); // Clear the success message
        }, 4000);
      })
      .catch((error) => {
        console.error("Error updating student:", error);
      })
      .finally(() => {
        setIsSubmitting(false); // Reset submitting state
      });
  };

  return (
    <form className="bg-black p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-2xl mb-4">Edit Student</h2>

      {successMessage && (
        <div className="mb-4 text-green-500">{successMessage}</div>
      )}

      {/* Editable fields */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Subscription Type</label>
        <input
          type="number"
          name="subscriptiontype"
          value={formData.subscriptiontype}
          onChange={(e) =>
            setFormData({ ...formData, subscriptiontype: e.target.value })
          }
          placeholder="Enter subscription type"
          className="border border-gray-300 p-2 w-full rounded bg-gray-700"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={(e) =>
            setFormData({ ...formData, startDate: e.target.value })
          }
          className="border border-gray-300 p-2 w-full rounded bg-gray-700"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Assign Courses</label>
        <div>
          {allCourses.map((course) => (
            <div key={course.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`course-${course.id}`}
                checked={assignedCourses.includes(course.id)}
                onChange={() => handleCheckboxChange(course.id)}
                className="mr-2"
              />
              <label htmlFor={`course-${course.id}`} className="text-gray-700">
                {course.title}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={closeEditForm}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting} // Disable the button while submitting
        >
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
};

export default AdminStudentEditing;
