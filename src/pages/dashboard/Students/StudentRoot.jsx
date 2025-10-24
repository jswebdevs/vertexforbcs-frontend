import { Outlet, Navigate } from "react-router-dom";
// unified AuthProvider
import StudentMenu from "./StudentMenu";
import StudentDashboardHeader from "./StudentDashboardHeader";


const StudentRoot = () => {


  return (
    <div className="block md:flex">
      <div className="w-1/5">
        <StudentMenu />
      </div>
      <div className=" w-4/5">
        <StudentDashboardHeader></StudentDashboardHeader>
        <Outlet />
      </div>
    </div>
  );
};

export default StudentRoot;
