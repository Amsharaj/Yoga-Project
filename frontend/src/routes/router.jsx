import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../layout/MainLayout'
import Home from "../pages/home/Home";
import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import SingleClass from "../pages/Classes/SingleClass";
import ErrorPage from "../pages/error/ErrorPage";
import DashboardLayout from "../layout/DashboardLayout";
import PrivetRoute from "./PrivetRoute";
import Dashboard from "../pages/DashBoard/DashBoard";
import AdminRoute from "./Privet/AdminRoute";
import StudentRoute from "./Privet/StudentRoute";
import AsInstructor from "../pages/DashBoard/Student/Apply/AsInstructor";
import EnrolledClasses from "../pages/DashBoard/Student/Enroll/EnrolledClasses";
import MyPaymentHistory from "../pages/DashBoard/Student/Payment/History/MyPaymentHistory";
import Payment from "../pages/DashBoard/Student/Payment/Payment";
import SelectedClass from "../pages/DashBoard/Student/SelectedClass";
import StudentCP from "../pages/DashBoard/Student/StudentCP";
import ManageUsers from "../pages/DashBoard/Admin/users/ManageUsers";
import UpdateUser from "../pages/DashBoard/Admin/users/UpdateUser";
import AdminHome from "../pages/DashBoard/Admin/AdminHome";
import ManageClasses from "../pages/DashBoard/Admin/ManageClasses";
import InstructorCP from "../pages/DashBoard/Instructors/InstructorCP";
import AddClass from "../pages/DashBoard/Instructors/AddClass";
import MyClasses from "../pages/DashBoard/Instructors/MyClasses";
import UpdateClass from "../pages/DashBoard/Instructors/UpdateClass";
// import Dashboard from "../pages/Dashboard/dashborad";
import InstructorRoute from "./Privet/InstructorRoute";
import ManageApplications from "../pages/DashBoard/Admin/Applications/ManageApplication";
import Trending from "../layout/Trending";
import Following from "../layout/Following";
import PendingClass from "../pages/DashBoard/Instructors/PendingClass";
import ApprovedClass from "../pages/DashBoard/Instructors/ApprovedClass";
// import UpdateUserEmail from "../pages/DashBoard/Admin/users/UpdateUserEmail";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      }, {
        path: 'instructors',
        element: <Instructors />
      }, {
        path: 'classes',
        element: <Classes />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: "class/:id",
        element: <SingleClass />,
        loader: ({ params }) => fetch(`http://localhost:5000/class/${params.id}`),
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <PrivetRoute><Dashboard /></PrivetRoute>
      },
      // // * ADMIN ROUTES
      {
        path: 'manage-users',
        element: <AdminRoute><ManageUsers /></AdminRoute>
      },
      {
        path: 'update-user/:id',
        element: <AdminRoute><UpdateUser /></AdminRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/users/${params.id}`),
      },
      {
        path: 'admin-home',
        element: <AdminRoute><AdminHome /></AdminRoute>
      },
      {
        path: 'manage-class',
        element: <AdminRoute><ManageClasses /></AdminRoute>
      },
      {
        path: 'manage-applications',
        element: <AdminRoute><ManageApplications /></AdminRoute>
      },
      // * INSTRUCTOR ROUTES
      {
        path: 'instructor-cp',
        element: <InstructorRoute><InstructorCP /></InstructorRoute>
      },
      {
        path: 'add-class',
        element: <InstructorRoute><AddClass /></InstructorRoute>
      },
      {
        path: 'my-classes',
        element: <InstructorRoute><MyClasses /></InstructorRoute>
      },
      {
        path: 'update/:id',
        element: <InstructorRoute><UpdateClass /></InstructorRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/class/${params.id}`),
      },
      {
        path: 'my-pending',
        element: <InstructorRoute><PendingClass /></InstructorRoute>
        
      },
      {
        path: 'my-approved',
        element: <InstructorRoute><ApprovedClass /></InstructorRoute>
      },
      // * STUDENT ROUTES
      {
        path: 'student-cp',
        element: <StudentRoute><StudentCP /></StudentRoute>
      },
      {
        path: 'my-selected',
        element: <StudentRoute><SelectedClass /></StudentRoute>
      },
      {
        path: 'user/payment',
        element: <StudentRoute><Payment /></StudentRoute>
      },
      {
        path: 'my-payments',
        element: <StudentRoute><MyPaymentHistory /></StudentRoute>
      },
      {
        path: 'apply-instructor',
        element: <StudentRoute><AsInstructor /></StudentRoute>
      },
      {
        path: 'enrolled-class',
        element: <StudentRoute><EnrolledClasses /></StudentRoute>
      }
    ]
  },
  {
    path: '/trending',
    element: <Trending />
  },
  {
    path: '/following',
    element: <Following />
  }
])