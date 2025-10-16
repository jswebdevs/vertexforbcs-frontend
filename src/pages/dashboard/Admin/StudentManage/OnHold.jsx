import { useEffect, useState } from "react";
import AdminStudentAdding from "./AdminStudentAdding"; // Import the student adding form component

const OnHold = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(
          "https://vertexforbcs.com/vartexforbcs/web/signup"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setSubscriptions(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subscription?")) {
      try {
        const response = await fetch(
          `https://vertexforbcs.com/vartexforbcs/web/signup/delete/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete subscription");
        }

        // Remove the deleted subscription from the state
        setSubscriptions((prevSubscriptions) =>
          prevSubscriptions.filter((subscription) => subscription.id !== id)
        );
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleApprove = (student) => {
    // Show the form and set the selected student data for autofilling
    setSelectedStudent(student);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedStudent(null); // Clear the selected student after form closes
  };

  const handleFormSubmit = async () => {
    // After the student is added, delete the student from the 'On Hold' list
    if (selectedStudent) {
      await handleDelete(selectedStudent.id);
    }
    handleFormClose();
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-4">
        On Hold Subscriptions
      </h1>
      <table className="min-w-full border-collapse border border-gray-200 bg-gray-800">
        <thead>
          <tr className="text-xl text-left">
            <th className="border border-gray-200 p-2">ID</th>
            <th className="border border-gray-200 p-2">First Name</th>
            <th className="border border-gray-200 p-2">Last Name</th>
            <th className="border border-gray-200 p-2">Email</th>
            <th className="border border-gray-200 p-2">Contact No</th>
            <th className="border border-gray-200 p-2">Payment Method</th>
            <th className="border border-gray-200 p-2">Number Used</th>
            <th className="border border-gray-200 p-2">TrxID</th>
            <th className="border border-gray-200 p-2">Courses</th>{" "}
            {/* Added course column */}
            <th className="border border-gray-200 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription) => (
            <tr
              key={subscription.id}
              className=" hover:bg-gray-700"
            >
              <td className="border border-gray-200 p-2">{subscription.id}</td>
              <td className="border border-gray-200 p-2 capitalize">
                {subscription.firstName}
              </td>
              <td className="border border-gray-200 p-2 capitalize">
                {subscription.lastName}
              </td>
              <td className="border border-gray-200 p-2">
                {subscription.email}
              </td>
              <td className="border border-gray-200 p-2">
                {subscription.contactNO}
              </td>
              <td className="border border-gray-200 p-2">
                {subscription.paymentMethod}
              </td>
              <td className="border border-gray-200 p-2">
                {subscription.NumberUsed}
              </td>
              <td className="border border-gray-200 p-2">
                {subscription.TrxID}
              </td>
              <td className="border border-gray-200 p-2">
                {/* Handle single or multiple courses */}
                {subscription.selectedCourses &&
                subscription.selectedCourses.length > 0 ? (
                  subscription.selectedCourses.map((course) => (
                    <div key={course.id}>{course.courseTitle}</div>
                  ))
                ) : (
                  <div>No courses selected</div>
                )}
              </td>
              <td className="border border-gray-200 p-2 flex space-x-2">
                <button
                  onClick={() => handleApprove(subscription)}
                  className="text-white bg-green-700 hover:bg-green-500  px-3 py-2 rounded-md"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDelete(subscription.id)}
                  className="text-white bg-red-700 hover:bg-red-500 px-3 py-2 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show the form only when a student is selected for approval */}
      {showForm && selectedStudent && (
        <AdminStudentAdding
          onClose={handleFormClose}
          onHoldData={{
            firstname: selectedStudent.firstName,
            lastname: selectedStudent.lastName,
            email: selectedStudent.email,
            contactNo: selectedStudent.contactNO,
          }}
          onSuccess={handleFormSubmit} // Callback after successful form submission
        />
      )}
    </div>
  );
};

export default OnHold;
