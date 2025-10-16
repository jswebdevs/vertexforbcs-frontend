const ModalDL = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalDL;
