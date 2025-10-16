import jsPDF from "jspdf";
import "jspdf-autotable"; // Ensure this import is present


const QuizPDFGenerator = ({ quiz }) => {
  const generatePDF = () => {
    // Check if quiz and questions exist before proceeding
    if (!quiz || !quiz.questions) {
      console.error("Quiz or quiz questions are not available.");
      return;
    }

    const doc = new jsPDF();

    // Set quiz title
    doc.setFontSize(20);
    doc.text(quiz.quizTitle || "Quiz", 10, 10);

    // Add basic quiz details
    doc.setFontSize(12);
    doc.text(`Course: ${quiz.courseTitle || "N/A"}`, 10, 20);
    doc.text(`Quiz Date: ${quiz.quizDate || "N/A"}`, 10, 30);
    doc.text(`Description: ${quiz.quizDescription || "N/A"}`, 10, 40);
    doc.text(`Total Marks: ${quiz.totalMarks || "N/A"}`, 10, 50);

    // Add a space before questions
    let y = 60;

    // Iterate over the questions and add them to the PDF
    quiz.questions.forEach((question, index) => {
      doc.setFontSize(14);
      doc.text(`${index + 1}. ${question.question_title}`, 10, y);
      y += 10; // Move to the next line

      doc.setFontSize(12);
      doc.text(`A. ${question.A}`, 15, y);
      y += 8;
      doc.text(`B. ${question.B}`, 15, y);
      y += 8;
      doc.text(`C. ${question.C}`, 15, y);
      y += 8;
      doc.text(`D. ${question.D}`, 15, y);
      y += 8;

      // Add correct answer and explanation
      doc.text(`Correct Answer: ${question.correctAnswer}`, 15, y);
      y += 8;
      if (question.explanation) {
        doc.text(`Explanation: ${question.explanation}`, 15, y);
        y += 10;
      }

      // Add some space between questions
      y += 10;
    });

    // Save the generated PDF using the quiz title
    doc.save(`${quiz.quizTitle || "Quiz"}.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
    >
      Download PDF
    </button>
  );
};

export default QuizPDFGenerator;
