import { createBrowserRouter } from "react-router-dom";

import Root from "../layout/Root";
import Homepage from "../pages/Homepage/Homepage";

import AdminRoot from "../pages/dashboard/Admin/AdminRoot";
import AdminDashboard from "../pages/dashboard/Admin/AdminDashboard";
import AdminLogin from "../pages/dashboard/Admin/Account/AdminLogin";
import AdminCourseManage from "../pages/dashboard/Admin/CourseManage/AdminCourseManage";
import AdminStudentManage from "../pages/dashboard/Admin/StudentManage/AdminStudentManage";
import AdminProfile from "../pages/dashboard/Admin/Account/AdminProfile";
import AdminSingleCourse from "../pages/dashboard/Admin/CourseManage/QuizManage/AdminSingleCourse";

import StudentLogin from "../pages/dashboard/Students/Account/StudentLogin";
import StudentRegister from "../pages/dashboard/Students/Account/StudentRegister";
import StudentRoot from "../pages/dashboard/Students/StudentRoot";
import StudentDashboard from "../pages/dashboard/Students/Dashboard/StudentDashboard";
import StudentCourses from "../pages/dashboard/Students/Courses/StudentCourses";
import StudentProfile from "../pages/dashboard/Students/Account/StudentProfile";
import StudentQuizzes from "../pages/dashboard/Students/Quizzes/StudentQuizzes";

import AboutUsPage from "../pages/Homepage/AboutUsPage";
import CoursesPage from "../pages/Homepage/CoursesPage";
import GalleryPage from "../pages/Homepage/GalleryPage";
import ReviewsPage from "../pages/Homepage/ReviewsPage";
import PricingPage from "../pages/Homepage/PricingPage";
import SiteSettings from "../pages/dashboard/Admin/Site-Settings/SiteSettings";
import ContactUsPage from "../pages/Homepage/ContactUsPage";
import Sliders from "../pages/dashboard/Admin/Site-Settings/Sliders";
import SingleCourse from "../components/SingleCourse";
import ErrorPage from "../pages/ErrorPage";
import OnHold from "../pages/dashboard/Admin/StudentManage/OnHold";
import FAQ from "../pages/FAQ";
import TermsofService from "../pages/TermsofService";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import PrivateRoute from "./PrivateRoute";



// Main Routes Configuration
const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Homepage></Homepage>,
      },
      {
        path: "/admin/login",
        element: <AdminLogin></AdminLogin>,
      },
      {
        path: "/student/login",
        element: <StudentLogin></StudentLogin>,
      },
      {
        path: "/student/register",
        element: <StudentRegister></StudentRegister>,
      },
  
      {
        path: "about",
        element: <AboutUsPage></AboutUsPage>,
      },
      {
        path: "courses",
        element: <CoursesPage></CoursesPage>,
      },
      {
        path: "courses/:title",
        element: <SingleCourse></SingleCourse>
      },
      {
        path: "gallery",
        element: <GalleryPage></GalleryPage>,
      },
      {
        path: "reviews",
        element: <ReviewsPage></ReviewsPage>,
      },
      {
        path: "pricing",
        element: <PricingPage></PricingPage>,
      },
      {
        path: "contact",
        element: <ContactUsPage></ContactUsPage>,
      },
      {
        path: "faq",
        element: <FAQ></FAQ>
      },
      {
        path: "terms",
        element: <TermsofService></TermsofService>
      },
      {
        path: "privacy",
        element: <PrivacyPolicy></PrivacyPolicy>
      },
      {
        path: "student",
        element: <PrivateRoute><StudentRoot></StudentRoot></PrivateRoute>,
        children: [
          {
            path: "dashboard",
            element: <StudentDashboard></StudentDashboard>
          }
        ]
      }
    ],
  },
]);

export default Routes;
