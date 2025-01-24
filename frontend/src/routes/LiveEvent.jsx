import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LiveEvent() {
  const [participants, setParticipants] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleAddParticipant = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setParticipants([...participants, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleDeleteParticipant = (indexToDelete) => {
    setParticipants(participants.filter((_, index) => index !== indexToDelete));
  };

  const handleNext = () => {
    navigate("/next-page");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div>
        <img src="/icon_gift.png" alt="Gift Icon" />
      </div>
      <h1 className="text-4xl text-gray-600 font-medium mt-2 mb-5">MONITO</h1>
      <p className="text-base text-gray-600 mb-5">참가자 추가하기</p>

      <form onSubmit={handleAddParticipant} className="mt-4">
        <input
          type="text"
          placeholder="이름"
          className="border rounded-md px-4 py-1.5 text-gray-700"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <span>
          <button type="submit">
            <div className="ml-2 h-8 w-8 text-xl font-bold bg-blue-500 text-white rounded-full hover:bg-blue-600">
              +
            </div>
          </button>
        </span>
      </form>

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
        className=" mt-5 px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        다음
      </button>
    </div>
  );
}
