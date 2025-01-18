import "./App.css";
import React from "react";
import GoogleLoginForm from "./components/GoogleLoginForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./routes/home";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import styled from "styled-components";
import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

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
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
const GlobalStyles = createGlobalStyle`
  ${reset};
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
function App() {
  return (
    <>
      <div>
        <GlobalStyles />
        <RouterProvider router={router} />
        <GoogleLoginForm />
      </div>
    </>
  );
}

export default App;
