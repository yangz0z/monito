import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaRegQuestionCircle } from "react-icons/fa";
import { IoIosGlobe } from "react-icons/io";
import { useTranslation } from "react-i18next";
import useLanguage from "../Context/useLanguage";

export default function Layout() {
  const { t, i18n } = useTranslation();
  const { language, changeLanguage } = useLanguage();

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [openDropdown, setOpenDropdown] = useState(null);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const langDropdownRef = useRef(null);
  const helpDropdownRef = useRef(null);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target) &&
        helpDropdownRef.current &&
        !helpDropdownRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <header className="flex justify-between items-center p-4 relative">
        <button onClick={() => navigate("/")} className="text-2xl font-bold">
          MONITO
        </button>
        <div className="flex items-center space-x-2">
          {/* 도움말 드롭다운 메뉴 */}
          <div className="relative" ref={helpDropdownRef}>
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "help" ? null : "help")
              }
              className="flex items-center justify-center p-2 text-gray-500 rounded-md text-2xl hover:bg-gray-200 hover:text-gray-700"
            >
              <FaRegQuestionCircle />
            </button>
            {openDropdown === "help" && (
              <div className="fixed top-16 w-48 text-sm bg-white shadow-lg rounded-md overflow-visible border p-3 z-50">
                <button
                  onClick={() => {
                    navigate("/help-guide");
                    setOpenDropdown(null);
                  }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 border-b border-gray-200 rounded-t-md transition-all"
                >
                  {t("helpGuide")}
                </button>
                <button
                  onClick={() => {
                    navigate("/contact");
                    setOpenDropdown(null);
                  }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-b-md transition-all"
                >
                  {t("contact")}
                </button>
              </div>
            )}
          </div>

          {/* 언어 드롭다운 메뉴 */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "lang" ? null : "lang")
              }
              className="flex items-center justify-center p-2 text-gray-500 rounded-md text-2xl hover:bg-gray-200 hover:text-gray-700"
            >
              <IoIosGlobe />
            </button>
            {openDropdown === "lang" && (
              <div className="fixed  top-16 w-48 text-sm bg-white shadow-lg rounded-md overflow-hidden border p-3 z-50">
                <button
                  onClick={() => {
                    changeLanguage("ko");
                    setOpenDropdown(null);
                  }}
                  className={`block w-full text-left px-4 py-3 ${language === "ko" ? "bg-gray-200" : "text-gray-700 hover:bg-gray-100"} border-b border-gray-200 rounded-t-md transition-all`}
                >
                  한국어
                </button>
                <button
                  onClick={() => {
                    changeLanguage("en");
                    setOpenDropdown(null);
                  }}
                  className={`block w-full text-left px-4 py-3 ${language === "en" ? "bg-gray-200" : "text-gray-700 hover:bg-gray-100"} rounded-b-md transition-all`}
                >
                  English
                </button>
              </div>
            )}
          </div>

          {/* 유저 드롭다운 메뉴 */}
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === "user" ? null : "user")
                }
                className="flex items-center space-x-2 bg-gray-200 px-4 py-2 text-gray-600 rounded-md"
              >
                <FaUserCircle className="text-2xl" />
                <span>{user.email}</span>
              </button>
              {openDropdown === "user" && (
                <div className="fixed right-4 top-16 w-48 text-sm bg-white shadow-lg rounded-md overflow-hidden border p-3 z-50">
                  <button
                    onClick={() => {
                      navigate("/dash-board");
                      setOpenDropdown(null);
                    }}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 border-b border-gray-200 rounded-t-md transition-all"
                  >
                    {t("myAccount")}
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpenDropdown(null);
                    }}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-b-md transition-all"
                  >
                    {t("logout")}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
