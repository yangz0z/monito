import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Participant() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState({ name: false, contact: false });
  const [errorMessage, setErrorMessage] = useState("");

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

    navigate("/create-event/cards");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && contact.trim()) {
      setParticipants([...participants, { name, contact }]);
      setName("");
      setContact("");
      setErrors({ name: false, contact: false });
      setErrorMessage("");
    } else {
      setErrors({ name: !name.trim(), contact: !contact.trim() });
    }
  };

  const handleRemoveParticipant = (index) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-gray-100 pt-60 mt-1">
      <p className="text-2xl text-gray-600 mb-5 font-semibold select-none">
        {t("addParticipants")}
      </p>

      <form onSubmit={handleSubmit} className="ml-10">
        <div>
          <input
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
            onChange={(e) => setContact(e.target.value)}
          />
          <button type="submit" className="ml-2">
            <FaPlusCircle className="text-3xl text-[#FF8F00]" />
          </button>
        </div>
        {errors.contact && (
          <p className="text-red-500 text-xs mt-1">{t("requiredField")}</p>
        )}
      </form>

      <div className="w-80 space-y-4 mt-6">
        {participants.map((participant, index) => (
          <div
            key={index}
            className="flex justify-between border bg-gray-500 text-white items-center shadow px-3 py-3 rounded-lg"
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
