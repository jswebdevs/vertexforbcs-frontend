const AdminStudentDeleting = ({ onConfirm, onCancel, studentName }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-8 rounded shadow-lg w-11/12 md:w-1/3 max-w-md">
        <h2 className="text-white text-xl mb-4">
          Are you sure you want to delete {studentName}?
        </h2>
        <div className="flex justify-between">
          <button
            className="w-1/2 bg-red-500 text-white p-2 rounded mr-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="w-1/2 bg-green-500 text-white p-2 rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentDeleting;
