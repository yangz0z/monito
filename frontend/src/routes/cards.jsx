import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function MonitoCard() {
  const { t } = useTranslation();
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [interest, setInterest] = useState("");
  const [bgColor, setBgColor] = useState("#325040");
  const [errors, setErrors] = useState({
    nickname: false,
    bio: false,
    interest: false,
  });

  const navigate = useNavigate();
  const cardRef = useRef(null);
  const handleNext = () => {
    let newErrors = { eventName: false, budget: false };

    if (!nickname.trim()) newErrors.nickname = true;
    if (!bio.trim()) newErrors.bio = true;
    if (!interest.trim()) newErrors.interest = true;

    setErrors(newErrors);

    if (!newErrors.nickname && !newErrors.bio && !newErrors.interest) {
      navigate("/create-event/participant");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 p-5 ">
      <h1 className="text-2xl font-semibold text-gray-600 mb-5">
        {t("createMonitoCard")}
      </h1>

      {/* 입력 폼 */}
      <div className="w-full max-w-md bg-white p-5 shadow-md rounded-md">
        <input
          type="text"
          placeholder={t("nicknamePlaceholder")}
          className={`w-full p-2 border rounded-md mb-2 ${
            errors.nickname ? "border-red-500" : ""
          }`}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        {errors.nickname && (
          <p className="text-red-500 text-xs mb-1">{t("requiredField")}</p>
        )}
        <input
          type="text"
          placeholder={t("bioPlaceholder")}
          className={`w-full p-2 border rounded-md mb-2  ${
            errors.bio ? "border-red-500" : ""
          }`}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        {errors.bio && (
          <p className="text-red-500 text-xs mb-1">{t("requiredField")}</p>
        )}
        <input
          type="text"
          placeholder={t("interestPlaceholder")}
          className={`w-full p-2 border rounded-md mb-2 ${
            errors.interest ? "border-red-500" : ""
          }`}
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        />
        {errors.interest && (
          <p className="text-red-500 text-xs mb-1">{t("requiredField")}</p>
        )}

        {/* 카드 색상 선택 */}
        <label className="text-gray-600">{t("selectBackgroundColor")}</label>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="w-full p-2 mt-2 rounded-md cursor-pointer"
        />
      </div>

      {/* 마니또 카드 미리보기 */}
      <div
        ref={cardRef}
        className="w-64 h-96 flex flex-col items-center justify-center mt-6 rounded-lg shadow-lg"
        style={{ backgroundColor: bgColor }}
      >
        <h2 className="text-2xl font-bold text-white">
          {nickname || t("nicknamePlaceholder")}
        </h2>
        <p className="text-white mt-2">{bio || t("bioPlaceholder")}</p>
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full mt-3">
          {interest || t("interestPlaceholder2")}
        </span>
      </div>

      <button
        className="mt-9 px-8 py-3 text-white bg-[#D32F2F] shadow-xl rounded-full hover:bg-red-600 font-semibold"
        onClick={handleNext}
      >
        {t("next")}
      </button>
    </div>
  );
}
