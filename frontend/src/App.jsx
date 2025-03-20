import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import Layout from "./components/Layout";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import LiveEvent from "./routes/LiveEvent";
import DrawResult from "./routes/draw-result";
import JoinEvent from "./routes/join-event";
import CreateEvent from "./routes/create-event";
import DashBoard from "./routes/dash-board";
import Participant from "./routes/Participant";
import MonitoCard from "./routes/cards";
import ConfirmEvent from "./routes/ConfirmEvent";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./routes/NotFound";
import "./i18n";
import LanguageProvider from "./Context/LanguageProvider";
import { EventProvider } from "./Context/EventContext";
import GlobalStyles from "./GlobalStyle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Layout />,
        children: [
          { path: "", element: <Home /> },
          { path: "profile", element: <Profile /> },
          { path: "dash-board", element: <DashBoard /> },
          { path: "create-event", element: <CreateEvent /> },
          { path: "live-event", element: <LiveEvent /> },
          { path: "join-event", element: <JoinEvent /> },
          { path: "live-event/draw-result", element: <DrawResult /> },
          { path: "create-event/participant", element: <Participant /> },
          { path: "create-event/cards", element: <MonitoCard /> },
          { path: "create-event/confirm", element: <ConfirmEvent /> },
        ],
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <LanguageProvider>
      <EventProvider>
        <GlobalStyles />
        <RouterProvider router={router} />
      </EventProvider>
    </LanguageProvider>
  );
}

export default App;
