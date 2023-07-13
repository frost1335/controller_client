import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
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
} from "./pages";
import Layout from "./layouts/Layout";
import React from "react";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      // lids router
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
      // students router
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
      // groups router
      {
        path: "/groups",
        children: [
          {
            index: true,
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
        path: "/courses",
        children: [
          {
            index: true,
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
      // lids redirect route
      {
        path: "/",
        element: <CustomerList />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <h1>
        404 error! <br />
        Page not found <br />
        <Link to={-1}>Back</Link>
      </h1>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
