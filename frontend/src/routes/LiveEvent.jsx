import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function LiveEvent() {
  const { t } = useTranslation(); //  useTranslation 훅 사용
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
          <p>{t("enterNameToAdd")}</p>
        </div>
      );
      return;
    }

    if (participants.includes(trimmedValue)) {
      setError(
        <div className="text-red-500 text-xs mt-1 font-normal">
          <p>{t("nameAlreadyExists")}</p>
          <p className="text-center">{t("chooseAnotherName")}</p>
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
          <p>{t("minParticipantsRequired")}</p>
        </div>
      );
      return;
    }
    navigate("/live-event/draw-result", { state: { participants } });
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen pt-60 select-none">
      <p className="text-2xl text-gray-600 mb-1 font-semibold ">
        {t("addParticipants")}
      </p>

      <form
        onSubmit={handleAddParticipant}
        className="mt-4 ml-2 flex items-center space-x-2"
      >
        <input
          type="text"
          placeholder={t("namePlaceholder")}
          className={`border shadow pl-2 rounded-md px-6 py-1.5 text-gray-700 w-52 ${
            error ? "border-red-500" : ""
          }`}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError("");
          }}
        />
        <button type="submit" className="ml-2">
          <FaPlusCircle className="text-3xl text-[#FF8F00]" />
        </button>
      </form>

      {error && (
        <p className="text-red-500 text-sm font-semibold mt-2">{error}</p>
      )}

      <ul className="mt-5 w-64 ml-2 max-h-60 overflow-y-auto">
        {participants.map((participant, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white px-4 py-2 rounded-md shadow mb-2"
          >
            <span>{participant}</span>
            <button onClick={() => handleDeleteParticipant(index)}>
              <FaTimesCircle className="text-red-500 text-xl" />
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleNext}
        className="mt-5 px-8 py-3 font-semibold shadow-xl text-white bg-[#D32F2F] rounded-full hover:bg-red-700"
      >
        {t("next")}
      </button>
    </div>
  );
}
