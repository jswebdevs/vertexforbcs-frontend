const AdminCourseDeleting = ({
  courseId,
  courseTitle,
  onDeleteConfirm,
  onCancel,
}) => {
  const handleConfirm = () => {
    onDeleteConfirm(courseId);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-4 rounded shadow-lg w-11/12 md:w-1/3">
        <h2 className="text-2xl mb-4 text-white">Delete Course</h2>
        <p className="text-white mb-4">
          Are you sure you want to delete the course{" "}
          <strong>{courseTitle}</strong>?
        </p>
        <div className="flex justify-end">
          <button
            onClick={handleConfirm}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Yes, Delete
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCourseDeleting;
