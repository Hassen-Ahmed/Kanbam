import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/notifications/ErrorRoute";

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
        path: "/auth",
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
        path: "/kanbam/",
        async lazy() {
          const Home = await import("../components/board/Board");
          return { Component: Home.default };
        },
      },
      {
        path: "/kanbam/board",
        async lazy() {
          const Board = await import("../components/board/Board");
          return { Component: Board.default };
        },
      },
      {
        path: "/kanbam/table",
        async lazy() {
          const Table = await import("../components/table/Table");
          return { Component: Table.default };
        },
      },
      {
        path: "/kanbam/calendar",
        async lazy() {
          const Calendar = await import("../components/calendar/Calendar");
          return { Component: Calendar.default };
        },
      },
      {
        path: "/kanbam/dashboard",
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
