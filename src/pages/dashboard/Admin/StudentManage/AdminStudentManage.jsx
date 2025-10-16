import { useState } from "react";
import AdminStudentAdding from "./AdminStudentAdding";
import AdminStudentTable from "./AdminStudentTable";

const AdminStudentManage = () => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddStudent = () => {
    setIsAdding(true);
  };

  const closePopup = () => {
    setIsAdding(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-2">
        <h1 className="text-2xl font-bold mb-4">Manage Students</h1>
        <button
          onClick={handleAddStudent}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Student
        </button>
      </div>

      {isAdding && <AdminStudentAdding onClose={closePopup} />}

      <AdminStudentTable></AdminStudentTable>
    </div>
  );
};

export default AdminStudentManage;
