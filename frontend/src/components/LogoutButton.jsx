import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const LogoutButton = ({ onLogout }) => {
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
      Logout
    </button>
  );
};

LogoutButton.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default LogoutButton;
