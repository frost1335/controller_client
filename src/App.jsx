import {
  Link,
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import {
  Students,
  Groups,
  Teachers,
  StudentDetail,
  GroupDetail,
  TeacherDetail,
  Courses,
  CourseDetail,
  StudentCreate,
  StudentEdit,
  TeacherEdit,
  TeacherCreate,
  CourseCreate,
  CourseEdit,
  GroupCreate,
  GroupEdit,
  CustomerList,
  NewCustomer,
  EditCustomer,
  AttendanceList,
  AttendanceDetail,
  NotFound,
  Dashboard,
} from "./pages";
import Layout from "./layouts/Layout";
import React from "react";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      // customer router
      {
        path: "/customer",
        children: [
          {
            path: "list",
            element: <CustomerList />,
          },
          {
            path: "new",
            element: <NewCustomer />,
          },
          {
            path: ":customerId/edit",
            element: <EditCustomer />,
          },
        ],
      },
      // student router
      {
        path: "/student",
        children: [
          {
            path: "list",
            element: <Students />,
          },
          {
            path: "detail/:studentId",
            element: <StudentDetail />,
          },
          {
            path: "new",
            element: <StudentCreate />,
          },
          {
            path: ":studentId/edit",
            element: <StudentEdit />,
          },
        ],
      },
      // group router
      {
        path: "/group",
        children: [
          {
            path: "list",
            element: <Groups />,
          },
          {
            path: "detail/:groupId",
            element: <GroupDetail />,
          },
          {
            path: "new",
            element: <GroupCreate />,
          },
          {
            path: ":groupId/edit",
            element: <GroupEdit />,
          },
        ],
      },
      // teachers router
      {
        path: "/teacher",
        children: [
          {
            path: "list",
            element: <Teachers />,
          },
          {
            path: "detail/:teacherId",
            element: <TeacherDetail />,
          },
          {
            path: "new",
            element: <TeacherCreate />,
          },
          {
            path: ":teacherId/edit",
            element: <TeacherEdit />,
          },
        ],
      },
      // courses router
      {
        path: "/course",
        children: [
          {
            path: "list",
            element: <Courses />,
          },
          {
            path: "detail/:courseId",
            element: <CourseDetail />,
          },
          {
            path: "new",
            element: <CourseCreate />,
          },
          {
            path: ":courseId/edit",
            element: <CourseEdit />,
          },
        ],
      },
      // attendance router
      {
        path: "/attendance",
        children: [
          {
            path: "list",
            element: <AttendanceList />,
          },
          {
            path: "detail/:attendanceId",
            element: <AttendanceDetail />,
          },
        ],
      },
      // dashboard router
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to={"/dashboard"} />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
