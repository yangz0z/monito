import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useEvent } from "../Context/EventContext"; // Context 추가!

export default function Participant() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { eventData, setEventData } = useEvent(); // 전역 상태 가져오기
  const [participants, setParticipants] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState({ name: false, contact: false });
  const [errorMessage, setErrorMessage] = useState("");

  //  이름 입력 칸의 input 요소 참조 (포커스용)
  const nameInputRef = useRef(null);

  //  초기 로딩 시 Context에서 참가자 데이터 불러오기
  useEffect(() => {
    if (eventData.participants) {
      setParticipants(eventData.participants);
    }
  }, [eventData.participants]);

  //  휴대폰 번호 자동 포맷팅 함수 추가
  const handleContactChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // 숫자만 입력받기

    if (value.length > 11) {
      value = value.slice(0, 11); // 최대 11자리 제한
    }

    // 번호 형식 적용
    if (value.length <= 3) {
      setContact(value);
    } else if (value.length <= 7) {
      setContact(`${value.slice(0, 3)}-${value.slice(3)}`);
    } else {
      setContact(`${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`);
    }
  };

  const handleNext = () => {
    setErrorMessage("");

    if (!participants.length) {
      if (name.trim() && contact.trim()) {
        setErrorMessage(t("pressAddToIncludeParticipant"));
        return;
      }
      setErrors({ name: !name.trim(), contact: !contact.trim() });
      return;
    }

    if (participants.length < 3) {
      setErrorMessage(t("minThreeParticipants"));
      return;
    }

    //  Context에 참가자 정보 저장 (페이지 새로고침 시 유지됨)
    setEventData((prev) => ({
      ...prev,
      participants,
    }));

    navigate("/create-event/cards");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && contact.trim()) {
      const newParticipants = [...participants, { name, contact }];
      setParticipants(newParticipants);

      //  Context 업데이트
      setEventData((prev) => ({
        ...prev,
        participants: newParticipants,
      }));

      setName("");
      setContact("");
      setErrors({ name: false, contact: false });
      setErrorMessage("");

      //  참가자 추가 후 이름 입력 칸에 자동 포커스
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    } else {
      setErrors({ name: !name.trim(), contact: !contact.trim() });
    }
  };

  const handleRemoveParticipant = (index) => {
    const updatedParticipants = participants.filter((_, i) => i !== index);
    setParticipants(updatedParticipants);

    //  Context에도 삭제된 참가자 정보 업데이트 (새로고침 시 유지됨)
    setEventData((prev) => ({
      ...prev,
      participants: updatedParticipants,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-gray-100 pt-60 mt-1 select-none">
      <p className="text-2xl text-gray-600 mb-5 font-semibold select-none">
        {t("addParticipants")}
      </p>

      <form onSubmit={handleSubmit} className="ml-10">
        <div>
          <input
            ref={nameInputRef} //  input 요소 참조
            type="text"
            placeholder={t("namePlaceholder")}
            className={`border shadow rounded-md pl-2 px-6 py-1.5 text-gray-700 w-80 ${
              errors.name ? "border-red-500" : ""
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{t("requiredField")}</p>
          )}
        </div>

        <div className="mt-1 flex items-center space-x-2">
          <input
            type="text"
            placeholder={t("contactPlaceholder")}
            className={`border shadow rounded-md pl-2 px-6 py-1.5 text-gray-700 w-80 ${
              errors.contact ? "border-red-500" : ""
            }`}
            value={contact}
            onChange={handleContactChange} //  자동 포맷팅 함수 적용
            maxLength={13} // 000-0000-0000 (최대 13자리)
          />
          <button type="submit" className="ml-2">
            <FaPlusCircle className="text-3xl text-[#FF8F00]" />
          </button>
        </div>
        {errors.contact && (
          <p className="text-red-500 text-xs mt-1">{t("requiredField")}</p>
        )}
      </form>

      {/* 참가자 목록 (스크롤 가능) */}
      <div
        className="w-80 space-y-4 mt-6 overflow-y-auto bg-gray-100 shadow-md rounded-md"
        style={{ maxHeight: "300px" }} // 스크롤 높이 제한
      >
        {participants.map((participant, index) => (
          <div
            key={index}
            className="flex justify-between border bg-gray-600 text-white items-center shadow px-3 py-3 rounded-lg"
          >
            <span>
              <div className="text-base">{participant.name}</div>
              <div className="text-xs">{`${t("participantLabel")} - ${participant.contact}`}</div>
            </span>
            <button onClick={() => handleRemoveParticipant(index)}>
              <FaTimesCircle className="text-red-500 text-xl" />
            </button>
          </div>
        ))}
      </div>

      {errorMessage && (
        <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
      )}

      <button
        onClick={handleNext}
        className="mt-14 px-8 py-3 text-white bg-[#D32F2F] shadow-xl rounded-full hover:bg-red-700 font-semibold"
      >
        {t("next")}
      </button>
    </div>
  );
}
