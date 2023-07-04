import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Students,
  Groups,
  Lids,
  Teachers,
  StudentDetail,
  GroupDetail,
  TeacherDetail,
  Courses,
  CourseDetail,
  LidCreate,
  LidEdit,
  StudentCreate,
  StudentEdit,
} from "./pages";
import Layout from "./layouts/Layout";
import React from "react";
import CourseEdit from "./pages/Courses/CourseEdit";
import CourseCreate from "./pages/Courses/CourseCreate";
import TeacherCreate from "./pages/Teachers/TeacherCreate";
import TeacherEdit from "./pages/Teachers/TeacherEdit";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      // lids router
      {
        path: "/lids",
        children: [
          {
            index: true,
            element: <Lids />,
          },
          {
            path: "new",
            element: <LidCreate />,
          },
          {
            path: ":lidId/edit",
            element: <LidEdit />,
          },
        ],
      },
      // students router
      {
        path: "/students",
        children: [
          {
            index: true,
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
        ],
      },
      // teachers router
      {
        path: "/teachers",
        children: [
          {
            index: true,
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
        element: <Lids />,
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
