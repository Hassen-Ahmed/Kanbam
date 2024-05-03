import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/notifications/ErrorRoute";
import Home from "../routes/home/Home";
import Auth from "../routes/auth/Auth";
import Board from "../components/board/Board";
import Kanbam from "../routes/kanbam/Kanbam";
import Dashboard from "../components/dashboard/Dashboard";
import Table from "../components/table/Table";
import Calendar from "../components/calendar/Calendar";
import LogIn from "../pages/login/LogIn";
import SignUp from "../pages/signup/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage text="Root" />,
  },
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <ErrorPage text="Auth" />,
    children: [
      {
        path: "/auth",
        element: <LogIn />,
      },
      {
        path: "/auth/login",
        element: <LogIn />,
      },
      {
        path: "/auth/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/kanbam",
    element: <Kanbam />,
    errorElement: <ErrorPage text="Kanbam" />,
    children: [
      {
        path: "/kanbam/",
        element: <Board />,
      },
      {
        path: "/kanbam/board",
        element: <Board />,
      },
      {
        path: "/kanbam/table",
        element: <Table />,
      },
      {
        path: "/kanbam/calendar",
        element: <Calendar />,
      },
      {
        path: "/kanbam/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

function RouterMain() {
  return <RouterProvider router={router} />;
}

export default RouterMain;
