import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminQuizTable from "./AdminQuizTable";
import AdminQuizAdding from "./AdminQuizAdding";
import AdminQuizViewing from "./AdminQuizViewing";
import AdminQuizEditing from "./AdminQuizEditing";
import AdminQuizDeleting from "./AdminQuizDeleting";

const AdminSingleCourse = () => {
  const { courseTitle } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [course, setCourse] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isViewing, setIsViewing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch("https://vertexforbcs.com/vartexforbcs/web/courses/data");
        if (!response.ok) {
          throw new Error("Course data fetch failed");
        }
        const data = await response.json();

        const foundCourse = data.find(
          (course) =>
            course.title.toLowerCase().replace(/\s+/g, "-") === courseTitle
        );

        if (!foundCourse) {
          throw new Error("Course not found");
        }

        setCourse(foundCourse);
        setQuizzes(foundCourse.quizzes || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchCourseData();
  }, [courseTitle]);

  const handleAddQuiz = (newQuiz) => {
    // Example: Assuming newQuiz returns a proper quiz object from your backend
    setQuizzes((prevQuizzes) => [...prevQuizzes, newQuiz]);
    setIsAdding(false); // Close modal after adding
  };

  const handleEditQuiz = (updatedQuiz) => {
    setQuizzes((prevQuizzes) =>
      prevQuizzes.map((quiz) =>
        quiz.quizId === updatedQuiz.quizId ? updatedQuiz : quiz
      )
    );
    setIsEditing(false); // Close modal after editing
  };

  const handleDeleteQuiz = (quizId) => {
    setQuizzes((prevQuizzes) =>
      prevQuizzes.filter((quiz) => quiz.quizId !== quizId)
    );
    setIsDeleting(false); // Close modal after deleting
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (error) {
    return <div>{error}</div>; // Show the error message
  }

  if (!course) {
    return <div>Course not found.</div>; // Show course not found message
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {course.title || "Course Title"}
      </h2>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAdding(true)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Quiz
        </button>
      </div>

      {/* Modal rendering function */}
      {isAdding && (
        <AdminQuizAdding
          courseID={course.id}
          courseTitle={course.title}
          onAddQuiz={handleAddQuiz}
          onClose={() => setIsAdding(false)}
        />
      )}

      {isViewing && (
        <AdminQuizViewing
          quiz={selectedQuiz}
          onClose={() => setIsViewing(false)}
        />
      )}

      {isEditing && (
        <AdminQuizEditing
          quiz={selectedQuiz}
          onEditQuiz={handleEditQuiz}
          onClose={() => setIsEditing(false)}
        />
      )}

      {isDeleting && (
        <AdminQuizDeleting
          quizTitle={selectedQuiz?.quizTitle}
          onDeleteQuiz={() => handleDeleteQuiz(selectedQuiz?.quizId)}
          onClose={() => setIsDeleting(false)}
        />
      )}

      <AdminQuizTable
        quizzes={quizzes}
        onEditQuiz={(quiz) => {
          setSelectedQuiz(quiz);
          setIsEditing(true);
        }}
        onViewQuiz={(quiz) => {
          setSelectedQuiz(quiz);
          setIsViewing(true);
        }}
        onDeleteQuiz={(quiz) => {
          setSelectedQuiz(quiz);
          setIsDeleting(true);
        }}
      />

      <button
        onClick={() => window.history.back()}
        className="mt-4 bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded"
      >
        Back to Courses
      </button>
    </div>
  );
};

export default AdminSingleCourse;
