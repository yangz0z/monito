import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import CountDown from "./CountDown";
import axios from "axios";
import base64 from "base-64";
import { useNavigate } from "react-router-dom";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_BASE_URL = "https://monito-api-blue.vercel.app";

const GoogleLoginForm = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSuccess = async (response) => {
    const { credential } = response;
    const payload = credential.substring(
      credential.indexOf(".") + 1,
      credential.lastIndexOf(".")
    );
    const dec = base64.decode(payload);
    const { email } = JSON.parse(dec);
    try {
      // 백엔드로 GET 요청 보내기;
      const { data } = await axios.post(`${API_BASE_URL}/api/users/login`, {
        email,
      });
      // 응답 데이터로 사용자 정보 설정
      setUser({
        email: data.email || "이메일 없음",
      });
      navigate("/");
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("사용자 정보를 가져오는 데 문제가 발생했습니다.");
    }
  };

  const handleError = () => {
    console.error("Login failed");
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        {!user ? (
          <>
            <div>
              <img src="/icon_gift.png" alt="Gift Icon" />
            </div>
            <h1 className="text-4xl text-gray-600 font-medium mt-2 mb-5 font-semibold">
              MONITO
            </h1>
            <p className="text-base text-gray-600 mb-0.5 font-semibold">
              모두를 위한 마니또 MONITO에 오신 것을
            </p>
            <p className="text-base text-gray-600 text-center mb-5 font-semibold">
              환영합니다.
            </p>
            <CountDown />
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              text="signin_with"
              width="300px"
            />
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>
            <p className="text-lg">Email: {user.email}</p>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginForm;
