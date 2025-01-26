import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/notifications/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    async lazy() {
      const Home = await import("../routes/home/Home");
      return { Component: Home.default };
    },
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    async lazy() {
      const Auth = await import("../routes/auth/Auth");
      return { Component: Auth.default };
    },
    children: [
      {
        index: true,
        async lazy() {
          const LogIn = await import("../pages/auth/login/LogIn");
          return { Component: LogIn.default };
        },
      },
      {
        path: "/auth/login",
        async lazy() {
          const LogIn = await import("../pages/auth/login/LogIn");
          return { Component: LogIn.default };
        },
      },
      {
        path: "/auth/signup",
        async lazy() {
          const SignUp = await import("../pages/auth/signup/SignUp");
          return { Component: SignUp.default };
        },
      },
      {
        path: "/auth/forgot-password",
        async lazy() {
          const ForgotPassword = await import(
            "../pages/auth/forgotPassword/ForgotPassword"
          );
          return { Component: ForgotPassword.default };
        },
      },
      {
        path: "/auth/reset-password",
        async lazy() {
          const ResetPassword = await import(
            "../pages/auth/resetPassword/ResetPassword"
          );
          return { Component: ResetPassword.default };
        },
      },
    ],
  },

  {
    path: "/kanbam",
    async lazy() {
      const Kanbam = await import("../routes/kanbam/Kanbam");
      return { Component: Kanbam.default };
    },
    children: [
      {
        path: "/kanbam/w",
        async lazy() {
          const WorkspaceList = await import(
            "../components/workspace/WorkspaceList"
          );
          return { Component: WorkspaceList.default };
        },
      },
      {
        path: "/kanbam/w/:w_id/:w_name",
        async lazy() {
          const Workspace = await import("../components/workspace/Workspace");
          return { Component: Workspace.default };
        },
      },
      {
        path: "/kanbam/b/:b_id/:b_name/",
        async lazy() {
          const Board = await import("../components/board/Board");
          return { Component: Board.default };
        },
      },
      {
        path: "/kanbam/tb/:b_id/:b_name",
        async lazy() {
          const Table = await import("../components/table/Table");
          return { Component: Table.default };
        },
      },
      {
        path: "/kanbam/cal/:b_id/:b_name",
        async lazy() {
          const Calendar = await import("../components/calendar/CalendarFull");
          return { Component: Calendar.default };
        },
      },
      {
        path: "/kanbam/ds/:b_id/:b_name",
        async lazy() {
          const Dashboard = await import("../components/dashboard/Dashboard");
          return { Component: Dashboard.default };
        },
      },
    ],
  },
]);

function RouterMain() {
  return <RouterProvider router={router} />;
}

export default RouterMain;
