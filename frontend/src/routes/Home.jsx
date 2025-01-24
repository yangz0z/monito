import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CountDown from "../components/CountDown";

export default function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const handleCreateEventClick = () => {
    setIsModalOpen(true);
  };

  const handleOptionClick = (option) => {
    if (option === "create") {
      setIsModalOpen(false);
      setIsSecondModalOpen(true); // 두 번째 모달 열기
    } else if (option === "join") {
      setIsModalOpen(false);
      navigate("/join-event");
    }
  };

  const handleSecondModalOptionClick = (path) => {
    setIsSecondModalOpen(false);
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div>
        <img src="/icon_gift.png" alt="Gift Icon" />
      </div>
      <h1 className="text-4xl text-gray-600 font-medium mt-2 mb-5">MONITO</h1>
      <p className="text-base text-gray-600 mb-0.5">
        모두를 위한 마니또 MONITO에 오신 것을
      </p>
      <p className="text-base text-gray-600 text-center mb-5">환영합니다.</p>
      <CountDown />
      <button
        onClick={handleCreateEventClick}
        className="mt-1 text-sm bg-white text-gray-650 px-12 py-2 rounded shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <span className="font-semibold text-gray-600">MONITO</span> 시작하기
      </button>

      {/* 첫 번째 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 pt-3 w-80 text-right">
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-xl font-semibold text-gray-600 hover:text-gray-300  "
            >
              X
            </button>
            <h2 className="text-xl font-semibold text-gray-600 mb-4 text-center">
              실행 모드를 선택해주세요
            </h2>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleOptionClick("create")}
                className="px-4 py-3 bg-gray-400 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                새 이벤트 만들기
              </button>
              <button
                onClick={() => handleOptionClick("join")}
                className="px-4 py-3 bg-gray-400 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                초대코드로 참여하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 두 번째 모달 */}
      {isSecondModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 pt-3 w-80 text-right">
            <button
              onClick={() => setIsSecondModalOpen(false)}
              className="text-xl font-semibold text-gray-600 hover:text-gray-300  "
            >
              X
            </button>
            <h2 className="text-xl font-semibold text-gray-600 mb-4 text-center">
              생성 방식을 선택해주세요
            </h2>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleSecondModalOptionClick("/create-event")}
                className="px-4 py-3 bg-gray-400 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                문자 / 카카오톡으로 알림 보내기
              </button>
              <button
                onClick={() => handleSecondModalOptionClick("/live-event")}
                className="px-4 py-3 bg-gray-400 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                라이브로 진행하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
