import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function LiveEvent() {
  const [invitation, setInvitation] = useState("");
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (invitation.trim() === "") {
      setError(t("invitationCode"));
    } else {
      setError("");
      navigate(`/live-event/${invitation}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen pt-60 select-none">
      <p className="text-2xl text-gray-600 mb-5 font-semibold ">
        {t("liveEventJoinTitle")}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          placeholder={t("enterInviteCode")}
          value={invitation}
          onChange={(e) => {
            setInvitation(e.target.value);
            if (error) setError("");
          }}
          className={`border shadow pl-2 placeholder:text-center rounded-md px-6 py-1.5 text-gray-700 w-64 ${
            error ? "border-red-500" : ""
          }`}
        />
        {/* 에러 메시지 출력 */}
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

        {/* 버튼을 div로 감싸 별도의 margin 적용 */}
        <div className="mt-10">
          <button
            type="submit"
            className="px-8 py-3 font-semibold shadow-xl text-white bg-[#D32F2F] rounded-full hover:bg-red-700 transition duration-400"
          >
            {t("participateButton")}
          </button>
        </div>
      </form>
    </div>
  );
}
