import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useEvent } from "../Context/EventContext";

export default function Participant() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { eventData, setEventData } = useEvent();

  const [participants, setParticipants] = useState(
    eventData.participants || []
  );
  const [inputName, setInputName] = useState("");
  const [inputContact, setInputContact] = useState("");
  const [errors, setErrors] = useState({ name: false, contact: false });
  const [errorMessage, setErrorMessage] = useState("");

  // 연락처 자동 포맷팅
  const handleContactChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length <= 3) setInputContact(value);
    else if (value.length <= 7)
      setInputContact(`${value.slice(0, 3)}-${value.slice(3)}`);
    else
      setInputContact(
        `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`
      );
  };

  // 참가자 추가
  const handleAdd = (e) => {
    e.preventDefault();
    const name = inputName.trim();
    const contact = inputContact.trim();

    const isDuplicateName = participants.some((p) => p.name === name);
    const isDuplicateContact = participants.some(
      (p) => p.contact.replace(/-/g, "") === contact.replace(/-/g, "")
    );

    // 초기화
    setErrors({ name: false, contact: false });
    setErrorMessage("");

    if (!name || !contact) {
      setErrors({
        name: !name,
        contact: !contact,
      });
      setErrorMessage(
        <div className="text-red-500 text-xs mt-1 font-normal text-center">
          <p>{t("requiredField")}</p>
        </div>
      );
      return;
    }

    if (isDuplicateName || isDuplicateContact) {
      setErrors({
        name: isDuplicateName,
        contact: isDuplicateContact,
      });
      setErrorMessage(
        <div className="text-red-500 text-xs mt-1 font-normal text-center">
          <p>{t("nameAlreadyExists")}</p>
          <p>{t("chooseAnotherName")}</p>
        </div>
      );
      return;
    }

    const updated = [...participants, { name, contact }];
    setParticipants(updated);
    setEventData((prev) => ({ ...prev, participants: updated }));
    setInputName("");
    setInputContact("");
  };

  // 참가자 삭제
  const handleRemove = (index) => {
    const updated = participants.filter((_, i) => i !== index);
    setParticipants(updated);
    setEventData((prev) => ({ ...prev, participants: updated }));
  };

  // 다음 단계로 이동
  const handleNext = () => {
    if (participants.length < 3) {
      setErrors({ name: true, contact: true });
      setErrorMessage(
        <div className="text-red-500 text-xs mt-1 font-normal text-center">
          <p>{t("minThreeParticipants")}</p>
        </div>
      );
      return;
    }

    navigate("/create-event/cards");
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen pt-60 select-none">
      <p className="text-2xl text-gray-600 mb-1 font-semibold">
        {t("addParticipants")}
      </p>

      {/* 입력 폼 */}
      <form
        onSubmit={handleAdd}
        className="mt-4 ml-2 flex flex-col space-y-2 items-start"
      >
        <input
          type="text"
          placeholder={t("namePlaceholder")}
          value={inputName}
          onChange={(e) => {
            setInputName(e.target.value);
            setErrors((prev) => ({ ...prev, name: false }));
            setErrorMessage("");
          }}
          className={`border shadow pl-2 rounded-md px-6 py-1.5 text-gray-700 w-72 ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder={t("contactPlaceholder")}
            value={inputContact}
            onChange={(e) => {
              handleContactChange(e);
              setErrors((prev) => ({ ...prev, contact: false }));
              setErrorMessage("");
            }}
            maxLength={13}
            className={`border shadow pl-2 rounded-md px-6 py-1.5 text-gray-700 w-72 ${
              errors.contact ? "border-red-500" : ""
            }`}
          />
          <button type="submit">
            <FaPlusCircle className="text-3xl text-[#FF8F00]" />
          </button>
        </div>
      </form>

      {errorMessage && (
        <div className="text-red-500 text-sm mt-2 font-semibold text-center w-72">
          {errorMessage}
        </div>
      )}

      {/* 참가자 목록 */}
      <ul className="mt-5 w-80 max-h-60 overflow-y-auto">
        {participants.map((p, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center bg-white px-4 py-2 rounded-md shadow mb-2"
          >
            <span>
              <div className="font-semibold">{p.name}</div>
              <div className="text-xs text-gray-500">{p.contact}</div>
            </span>
            <button onClick={() => handleRemove(idx)}>
              <FaTimesCircle className="text-red-500 text-xl" />
            </button>
          </li>
        ))}
      </ul>

      {/* 다음 버튼 */}
      <button
        onClick={handleNext}
        className="mt-6 px-8 py-3 font-semibold shadow-xl text-white bg-[#D32F2F] rounded-full hover:bg-red-700"
      >
        {t("next")}
      </button>
    </div>
  );
}
