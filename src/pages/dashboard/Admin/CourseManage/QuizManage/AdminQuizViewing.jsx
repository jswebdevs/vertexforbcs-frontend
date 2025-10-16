import { useState } from "react";
import AdminAddQuestion from "./AdminAddQuestion"; // Admin's question form component

const AdminQuizViewing = ({ quiz, courseTitle, onClose }) => {
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  console.log(quiz);

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      onClose();
    }
  };

  const handleAddQuestionClick = () => {
    setIsAddQuestionModalOpen(true);
  };

  const handleCloseAddQuestionModal = () => {
    setIsAddQuestionModalOpen(false);
  };

  // Function to determine answer options based on course title
  const getAnswerOptions = (index) => {
    if (courseTitle === "English") {
      const options = ["A", "B", "C", "D"];
      return options[index];
    } else {
      const options = ["ক", "খ", "গ", "ঘ"];
      return options[index];
    }
  };

  // Function to convert serial number to Bangla
  const convertToBangla = (number) => {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return String(number)
      .split("")
      .map((digit) => banglaDigits[digit])
      .join("");
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overlay"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-6 rounded-lg w-4/5 max-h-[80vh] overflow-auto relative text-black">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black font-bold"
        >
          &times;
        </button>

        {/* Course Title and Quiz Title */}
        <div className="quizHeader text-center">
          <h3 className="text-2xl font-bold">{courseTitle}</h3>
          <h4 className="text-xl font-bold">{quiz.quizTitle}</h4>
          <p>Duration: {quiz.duration} mins</p>
          <p>Total Marks: {convertToBangla(quiz.totalMarks)}</p>{" "}



          {/* Converted total marks to Bangla */}
          {/* Button for adding/editing questions */}
          <button
            onClick={handleAddQuestionClick}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {quiz.questions.length === 0 ? "Add a Question" : "Edit Questions"}
          </button>
        </div>

        <ul>
          {quiz.questions.map((question, index) => (
            <li key={index} className="mb-4">
              <p>
                <strong>{convertToBangla(question.serialNo)}.</strong>{" "}
                <strong>{question.question_title}</strong>
                <span className="float-right">
                  {convertToBangla(question.Mark)} 
                </span>{" "}
                {/* Converted question marks to Bangla */}
              </p>
              {/* Displaying answer options */}
              <p>
                {getAnswerOptions(0)}. {question.A}
              </p>
              <p>
                {getAnswerOptions(1)}. {question.B}
              </p>
              <p>
                {getAnswerOptions(2)}. {question.C}
              </p>
              <p>
                {getAnswerOptions(3)}. {question.D}
              </p>
              <p className="font-bold">
                Correct Answer: {question.correctAnswer}
              </p>
            </li>
          ))}
        </ul>

        {/* Render the add/edit question modal if open */}
        {isAddQuestionModalOpen && (
          <AdminAddQuestion
            quizTitle={quiz.quizTitle} // Pass the quiz title to the form
            onClose={handleCloseAddQuestionModal}
          />
        )}
      </div>
    </div>
  );
};

export default AdminQuizViewing;
