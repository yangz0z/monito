import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import Layout from "./components/Layout";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import LiveEvent from "./routes/liveEvent";
import JoinEvent from "./routes/Join-event";
import CreateEvent from "./routes/Create-Event";
import DashBoard from "./routes/dash-board";
import { createGlobalStyle } from "styled-components";
import styledReset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${styledReset};
  * {
    box-sizing: border-box;
  }
  body {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));
    color: rgb(75 85 99 / var(--tw-text-opacity, 1));
  }
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "dash-board",
        element: <DashBoard />,
      },
      {
        path: "create-event",
        element: <CreateEvent />,
      },
      {
        path: "live-event",
        element: <LiveEvent />,
      },
      {
        path: "join-event",
        element: <JoinEvent />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
