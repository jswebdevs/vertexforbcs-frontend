import useAuth from "../../../../hooks/useAuth";
import StudentDashboardHeader from "./StudentDashboardHeader";

const StudentDashboard = () => {
  const { user, userType } = useAuth();

  if (!user) return <p>Loading...</p>;
  if (userType !== "student") return <p>Access denied.</p>;
  return (
    <div>
      
    </div>
  );
};

export default StudentDashboard;