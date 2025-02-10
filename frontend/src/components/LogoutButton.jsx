import { useNavigate } from "react-router-dom";

const LogoutButton = ({ onLogout }) => {
  // ✅ props로 onLogout 받기
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      console.error("onLogout 함수가 전달되지 않았습니다.");
    }
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-[#D32F2F] font-semibold text-white hover:bg-red-700 px-4 py-2 rounded-full"
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
