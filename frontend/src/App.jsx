import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./routes/home";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import CreateEvent from "./routes/Create-Event";
import DashBoard from "./routes/DashBoard";
import GoogleLoginForm from "./components/GoogleLoginForm";
import { createGlobalStyle } from "styled-components";
import styledReset from "styled-reset";

// Global Styles
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

// Router Configuration
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
        path: "dashboard",
        element: <DashBoard />,
      },
      {
        path: "create-event",
        element: <CreateEvent />,
      },
    ],
  },
  {
    path: "/login",
    element: <GoogleLoginForm />, // GoogleLoginForm을 /login 경로에 렌더링
  },
]);

// App Component
function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
