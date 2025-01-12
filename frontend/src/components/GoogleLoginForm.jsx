import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import CountDown from "./CountDown";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleLoginForm = () => {
  const [user, setUser] = useState(null);

  const handleSuccess = (response) => {
    const { credential } = response;
    // 여기서 Google의 credential을 활용하여 사용자 정보를 가져올 수 있음
    console.log("Google Credential:", credential);
    setUser({
      name: "Logged-in User",
      email: "user@example.com", // 사용자 정보를 Google API를 통해 가져올 수 있음
    });
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
              <img src="src/icon_gift.png" />
            </div>
            <h1 className="text-4xl text-gray-600 font-medium	mt-2 mb-5">
              MONITO
            </h1>
            <p className="text-base text-gray-600 mb-0.5">
              모두를 위한 마니또 MONITO에 오신 것을
            </p>
            <p className="text-base text-gray-600 text-center mb-5">
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
