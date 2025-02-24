import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Layout() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    // localStorage 변화 감지하여 user 상태 즉시 업데이트
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // 빈 공간 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // 로그아웃 시 상태 업데이트
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-gray-100 relative">
        <button onClick={() => navigate("/")} className="text-2xl font-bold">
          MONITO
        </button>

        {/* 유저 버튼 */}
        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded border border-gray-300"
            >
              <FaUserCircle className="text-3xl text-gray-700" />
              <span className="text-gray-700 font-medium">
                {user.email} {/* 유저 이메일 표시 */}
              </span>
            </button>

            {/* 드롭다운 메뉴 */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 text-sm font-semibold bg-white shadow-lg rounded-md overflow-hidden border p-3">
                <button
                  onClick={() => {
                    navigate("/dash-board");
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 border-b border-gray-200 
                 rounded-t-md hover:rounded-md transition-all"
                >
                  내 계정
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 
                 rounded-b-md hover:rounded-md transition-all"
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
