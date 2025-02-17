import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LogoutButton from "../components/LogoutButton";

export default function Layout() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    //  localStorage 변화 감지하여 user 상태 즉시 업데이트
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  //  로그아웃 시 상태 업데이트
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-gray-100">
        <button onClick={() => navigate("/")} className="text-2xl font-bold">
          MONITO
        </button>
        {/*  user가 있을 때만 LogoutButton을 렌더링 */}
        {user && <LogoutButton onLogout={handleLogout} />}
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
