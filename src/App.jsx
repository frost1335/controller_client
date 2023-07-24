import {
  Link,
  Navigate,
  Route,
  RouterProvider,
  Routes,
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

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/customer">
          <Route path="list" element={<CustomerList />} />
          <Route path="new" element={<NewCustomer />} />
          <Route path=":customerId/edit" element={<EditCustomer />} />
        </Route>
        <Route path="/student">
          <Route path="list" element={<Students />} />
          <Route path="detail/:studentId" element={<StudentDetail />} />
          <Route path="new" element={<StudentCreate />} />
          <Route path=":studentId/edit" element={<StudentEdit />} />
        </Route>
        <Route path="/group">
          <Route path="list" element={<Groups />} />
          <Route path="detail/:groupId" element={<GroupDetail />} />
          <Route path="new" element={<GroupCreate />} />
          <Route path=":groupId/edit" element={<GroupEdit />} />
        </Route>
        <Route path="/teacher">
          <Route path="list" element={<Teachers />} />
          <Route path="detail/:teacherId" element={<TeacherDetail />} />
          <Route path="new" element={<TeacherCreate />} />
          <Route path=":teacherId/edit" element={<TeacherEdit />} />
        </Route>
        <Route path="/course">
          <Route path="list" element={<Courses />} />
          <Route path="detail/:courseId" element={<CourseDetail />} />
          <Route path="new" element={<CourseCreate />} />
          <Route path=":courseId/edit" element={<CourseEdit />} />
        </Route>
        <Route path="/attendance">
          <Route path="list" element={<AttendanceList />} />
          <Route path="detail/:attendanceId" element={<AttendanceDetail />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/" element={<Navigate to={"/dashboard"} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
