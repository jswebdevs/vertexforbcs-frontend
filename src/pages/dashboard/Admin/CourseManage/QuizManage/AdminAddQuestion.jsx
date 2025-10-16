import { useState } from "react";

const AdminAddQuestion = ({ quizTitle, onClose }) => {
  const [marks, setMarks] = useState("");
  const [negativeMarks, setNegativeMarks] = useState(""); // State for negative marks
  const [csvFile, setCsvFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("quizTitle", quizTitle);
    formData.append("marks", marks);
    formData.append("negativeMarks", negativeMarks); // Append negative marks to the form data
    formData.append("csvFile", csvFile);

    // Log the FormData contents to console
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await fetch("https://vertexforbcs.com/vartexforbcs/web/question/import-csv", {
        // API endpoint
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      // Log the API response
      console.log("API response:", result);

      if (result.status === "success") {
        setIsSuccess(true);
        setResponseMessage(result.message);
      } else {
        setIsSuccess(false);
        setResponseMessage(result.message);
      }
    } catch (error) {
      console.error("Error uploading and importing questions:", error); // Log error
      setIsSuccess(false);
      setResponseMessage("Error uploading and importing questions.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overlay"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-4/5 max-w-md max-h-[80vh] overflow-auto relative"
        onClick={(e) => e.stopPropagation()} // Prevent click event from propagating to the overlay
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black font-bold"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold text-center mb-4">
          Import Questions from CSV
        </h2>
        <form id="importForm" onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={quizTitle}
            readOnly
            className="w-full border border-gray-300 p-2 rounded text-white bg-gray-800"
          />
          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            placeholder="Marks for each question"
            required
            className="w-full border border-gray-300 p-2 rounded text-white bg-gray-800 placeholder-white"
          />
          <input
            type="number"
            value={negativeMarks}
            onChange={(e) => setNegativeMarks(e.target.value)}
            placeholder="Negative marks for wrong answers"
            required
            className="w-full border border-gray-300 p-2 rounded text-white bg-gray-800 placeholder-white"
          />
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setCsvFile(e.target.files[0])}
            required
            className="w-full border border-gray-300 p-2 rounded text-white bg-gray-800"
          />
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 rounded"
          >
            Upload and Import
          </button>
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded">
            <a
              href="https://vertexforbcs.com/vartexforbcs/web/csv"
              style={{ textDecoration: "none", color: "white" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Example CSV
            </a>
          </button>
        </form>

        {responseMessage && (
          <div
            className={`response-message mt-4 p-2 rounded ${
              isSuccess
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {responseMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAddQuestion;
