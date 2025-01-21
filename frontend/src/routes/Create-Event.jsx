import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CountDown from "../components/CountDown";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateEventClick = () => {
    setIsModalOpen(true);
  };

  const handleOptionClick = (path) => {
    setIsModalOpen(false);
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
        className=" mt-1 text-sm  bg-white text-gray-650 px-12 py-2 rounded shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <span className="font-semibold  text-gray-600">MONITO</span> 시작하기
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 pt-3  w-80 text-right">
            <button
              onClick={() => setIsModalOpen(false)}
              className=" text-xl font-semibold	 text-gray-600 hover:text-gray-300 transition duration-300"
            >
              X
            </button>
            <h2 className="text-xl font-semibold text-gray-600 mb-4 text-center">
              실행 모드를 선택해주세요
            </h2>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleOptionClick("/join-event")}
                className="px-4 py-3 bg-gray-400 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                초대코드로 참여하기
              </button>
              <button
                onClick={() => handleOptionClick("/live-event")}
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
