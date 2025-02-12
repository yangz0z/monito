import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LiveEvent() {
  const [participants, setParticipants] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(""); //  에러 메시지 상태 추가
  const navigate = useNavigate();

  const handleAddParticipant = (e) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();

    if (trimmedValue === "") {
      setError(
        <div className="text-red-500 text-xs mt-1 font-normal">
          <p>이름을 입력하고 참가자를 추가하세요.</p>
        </div>
      );
      return;
    }

    if (participants.includes(trimmedValue)) {
      setError(
        <div className="text-red-500 text-xs mt-1 font-normal">
          <p>해당 이름은 참가자 목록에 이미 있습니다.</p>
          <p className="text-center">다른 이름이나 별명을 추가하세요.</p>
        </div>
      );
      return;
    }

    setParticipants([...participants, trimmedValue]);
    setInputValue("");
    setError("");
  };

  const handleDeleteParticipant = (indexToDelete) => {
    setParticipants(participants.filter((_, index) => index !== indexToDelete));
  };
  const handleNext = () => {
    if (participants.length < 3) {
      setError(
        <div className="text-red-500 text-xs mt-1 font-normal">
          <p> 최소 3명 이상의 참가자를 추가하고 계속하세요.</p>
        </div>
      );
      return;
    }
    navigate("/next-page");
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

      <form
        onSubmit={handleAddParticipant}
        className="mt-4 flex items-center space-x-2"
      >
        <input
          type="text"
          placeholder="이름"
          className={`border rounded-md px-6 py-1.5 text-gray-700 w-64 ${
            error ? "border-red-500" : ""
          }`}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError("");
          }}
        />
        <button type="submit" className="ml-2">
          <div className="h-8 w-8 flex items-center justify-center text-xl font-bold bg-[#FF8F00] text-white rounded-full hover:bg-orange-500">
            +
          </div>
        </button>
      </form>

      {error && (
        <p className="text-red-500 text-sm font-semibold mt-2">{error}</p>
      )}

      <ul className="mt-5 w-64">
        {participants.map((participant, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white px-4 py-2 rounded-md shadow mb-2"
          >
            <span>{participant}</span>
            <button onClick={() => handleDeleteParticipant(index)}>
              <div className="ml-2 h-6 w-6 bg-red-500 text-white rounded-full hover:bg-red-600">
                x
              </div>
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleNext}
        className=" mt-5 px-6 py-2  font-semibold shadow-xl text-white bg-[#D32F2F] rounded-full hover:bg-red-700"
      >
        다음
      </button>
    </div>
  );
}
