import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaTimesCircle } from "react-icons/fa";

export default function Participant() {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const handleNext = () => {
    navigate("/create-event/");
  };

  // 참가자 추가
  const handleAddParticipant = () => {
    if (name && contact) {
      setParticipants([...participants, { name, contact }]);
      setName("");
      setContact("");
    }
  };

  // 참가자 삭제
  const handleRemoveParticipant = (index) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-gray-100 pt-60">
      <div>
        <img src="/icon_gift.png" alt="Gift Icon" />
      </div>
      <h1 className="text-4xl text-gray-600 font-medium mt-2 mb-5 font-semibold">
        MONITO
      </h1>
      <p className="text-base text-gray-600 mb-5 font-semibold">
        참가자 추가하기
      </p>
      <div className="w-80">
        <input
          type="text"
          placeholder="이름"
          className="border rounded-md pl-2 px-6 py-1.5  text-gray-700 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="w-80 mt-1">
        <input
          type="text"
          placeholder="이메일 또는 휴대폰 번호"
          className="border rounded-md pl-2 px-6 py-1.5  text-gray-700 w-full"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>
      <button
        onClick={handleNext}
        className=" mt-5 px-8 py-3  font-semibold shadow-xl text-white bg-[#D32F2F] rounded-full hover:bg-red-700"
      >
        다음
      </button>
    </div>
  );
}
