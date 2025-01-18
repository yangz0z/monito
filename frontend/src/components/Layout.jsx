import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <>
      <h1>MONITO</h1>
      <Outlet />
    </>
  );
}
