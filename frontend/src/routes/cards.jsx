import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { useTranslation } from "react-i18next";

export default function MonitoCard() {
  const { t } = useTranslation();
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [interest, setInterest] = useState("");
  const [bgColor, setBgColor] = useState("#FFDD57");

  const cardRef = useRef(null);

  // 카드 이미지 저장 기능
  const handleSaveCard = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "manitto_card.png";
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-5">
      <h1 className="text-2xl font-semibold text-gray-600 mb-5">
        {t("createMonitoCard")}
      </h1>

      {/* 입력 폼 */}
      <div className="w-full max-w-md bg-white p-5 shadow-md rounded-lg">
        <input
          type="text"
          placeholder={t("nicknamePlaceholder")}
          className="w-full p-2 border rounded-md mb-2"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="text"
          placeholder={t("bioPlaceholder")}
          className="w-full p-2 border rounded-md mb-2"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          type="text"
          placeholder={t("interestPlaceholder")}
          className="w-full p-2 border rounded-md mb-4"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        />

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
        <span className="bg-white text-gray-600 px-3 py-1 rounded-full mt-3">
          {interest || t("interestPlaceholder")}
        </span>
      </div>

      {/* 저장 및 공유 버튼 */}
      <div className="mt-6 space-x-4">
        <button
          onClick={handleSaveCard}
          className="mt-9 px-8 py-3 text-white bg-[#D32F2F] shadow-xl rounded-full hover:bg-red-600 font-semibold"
        >
          {t("saveCard")}
        </button>
      </div>
    </div>
  );
}
