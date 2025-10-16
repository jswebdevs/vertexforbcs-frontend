const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div
        className="bg-white rounded-lg overflow-auto shadow-lg z-10 p-4"
        style={{ width: "90vw", height: "90vh" }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
