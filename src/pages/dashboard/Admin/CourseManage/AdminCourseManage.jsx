import { useState } from "react";
import AdminCourseAdding from "./AdminCourseAdding";
import AdminCourseTable from "./AdminCourseTable";

const AdminCourseManage = () => {
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);

  const handleAddCourseClick = () => {
    setShowAddCourseForm(true);
  };

  const closeForm = () => {
    setShowAddCourseForm(false);
  };

  return (
    <div className="course-manage">
      <header className="flex justify-between items-center p-4">
        <h1>Welcome to Course Management</h1>
        <button
          onClick={handleAddCourseClick}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add a New Course
        </button>
      </header>

      {showAddCourseForm && (
        <div className="popup">
          <AdminCourseAdding onClose={closeForm} />
        </div>
      )}

      <AdminCourseTable></AdminCourseTable>

    </div>
  );
};

export default AdminCourseManage;
