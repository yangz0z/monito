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
      className="bg-gray-600  text-white  px-6 py-2.5 rounded-md"
    >
      Logout
    </button>
  );
};

LogoutButton.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default LogoutButton;
