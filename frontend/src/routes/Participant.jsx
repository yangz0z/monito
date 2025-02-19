import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaTimesCircle } from "react-icons/fa";

export default function Participant() {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState({ name: false, contact: false });

  const handleNext = () => {
    let newErrors = { eventName: false, budget: false };

    if (!name.trim()) newErrors.name = true;
    if (!contact.trim()) newErrors.contact = true;

    setErrors(newErrors);
  };

  // 참가자 추가 (submit 이벤트 핸들러)
  const handleSubmit = (e) => {
    e.preventDefault();
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
    <div className="flex flex-col items-center justify-start h-screen bg-gray-100 pt-60 mt-1">
      <div>
        <img src="/icon_gift.png" alt="Gift Icon" />
      </div>
      <h1 className="text-4xl text-gray-600 font-medium mt-2 mb-5 font-semibold">
        MONITO
      </h1>
      <p className="text-base text-gray-600 mb-5 font-semibold">
        참가자 추가하기
      </p>

      {/* 참가자 추가 Form */}
      <form onSubmit={handleSubmit} className="ml-10">
        {/* 이름 입력 */}
        <div>
          <input
            type="text"
            placeholder="이름"
            className={`border shadow rounded-md pl-2 px-6 py-1.5 text-gray-700 w-80 ${
              errors.name ? "border-red-500" : ""
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">필수 입력 항목입니다.</p>
          )}
        </div>

        {/* 이메일 또는 휴대폰 번호 입력 */}
        <div className="mt-1  flex items-center space-x-2">
          <input
            type="text"
            placeholder="이메일 또는 휴대폰 번호"
            className={`border shadow rounded-md pl-2 px-6 py-1.5 text-gray-700 w-80 ${errors.contact ? "border-red-500" : ""}`}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />

          {/* 제출 버튼을 Form 내부의 submit 버튼으로 변경 */}
          <button type="submit" className="ml-2">
            <FaPlusCircle className="text-3xl text-[#FF8F00]" />
          </button>
        </div>
        {errors.contact && (
          <p className="text-red-500 text-xs mt-1">필수 입력 항목입니다.</p>
        )}
      </form>

      {/* 참가자 목록 */}
      <div className="w-80 space-y-4 mt-6 ">
        {participants.map((participant, index) => (
          <div
            key={index}
            className="flex justify-between border bg-white text-sm font-base text-gray-700 items-center shadow px-3 py-5 rounded-lg"
          >
            <span>
              {participant.name} - {participant.contact}
            </span>
            <button onClick={() => handleRemoveParticipant(index)}>
              <FaTimesCircle className="text-red-500 text-xl" />
            </button>
          </div>
        ))}
      </div>

      {/* 다음 버튼 */}
      <button
        onClick={handleNext}
        className="mt-9 px-8 py-3 text-white bg-[#D32F2F] shadow-xl rounded-full hover:bg-red-700 font-semibold"
      >
        다음
      </button>
    </div>
  );
}
