import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const StudentAuthContext = createContext();

export const useStudentAuth = () => {
  const context = useContext(StudentAuthContext);
  if (!context) {
    throw new Error("useStudentAuth must be used within a StudentAuthProvider");
  }
  return context;
};

const StudentAuthProvider = ({ children }) => {
  const [isAuthenticatedStudent, setIsAuthenticatedStudent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [studentCourses, setStudentCourses] = useState([]);
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    const cookieAuthStatus = Cookies.get("studentAuth");
    const token = Cookies.get("studentAuthToken");

    // Check if both auth status and token exist
    if (cookieAuthStatus === "true" && token) {
      fetchStudentData(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchStudentData = async (token) => {
    try {
      const response = await fetch(
        "https://vertexforbcs.com/vartexforbcs/web/student",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const users = await response.json();
        const studentUser = users.find(
          (user) => Cookies.get("studentEmail") === user.email
        );

        if (studentUser) {
          setStudentName(`${studentUser.firstname}`);
          setStudentCourses(studentUser.courses);
          setStudentId(studentUser.id);
          setIsAuthenticatedStudent(true);
        } else {
          handleLogout(); // Logout if no matching user is found
        }
      } else {
        // If response is not OK, logout or handle token issues
        console.error("Invalid token or session expired");
        handleLogout();
      }
    } catch (err) {
      console.error("Error fetching student data:", err);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (usernameOrEmail, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://vertexforbcs.com/vartexforbcs/web/student/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: usernameOrEmail,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.status === "success") {
        setIsAuthenticatedStudent(true);
        setStudentName(`${data.user.firstname} ${data.user.lastname}`);
        setStudentId(data.user.id);
        setStudentCourses(data.user.courses);

        // Store necessary data in cookies
        Cookies.set("studentAuth", "true", { expires: 3 });
        Cookies.set("studentEmail", data.user.email);
        Cookies.set("studentAuthToken", data.token); // Store auth token for future use
        sessionStorage.setItem("isAuthenticatedStudent", "true");

        // Fetch student data after successful login
        fetchStudentData(data.token);
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticatedStudent(false);
    setStudentName("");
    setStudentCourses([]);
    setStudentId(null);
    sessionStorage.removeItem("isAuthenticatedStudent");
    Cookies.remove("studentAuth");
    Cookies.remove("studentEmail");
    Cookies.remove("studentAuthToken");
  };

  return (
    <StudentAuthContext.Provider
      value={{
        isAuthenticatedStudent,
        login,
        logout: handleLogout,
        error,
        loading,
        studentName,
        studentCourses,
        studentId,
      }}
    >
      {children}
    </StudentAuthContext.Provider>
  );
};

export default StudentAuthProvider;
