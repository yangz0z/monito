import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaEdit } from "react-icons/fa";

export default function ConfirmEvent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const eventData = location.state?.eventData || {
    eventName: "N/A",
    budget: "N/A",
    selectedDate: null,
    participants: [],
    nickname: "N/A",
    bio: "N/A",
    interest: "N/A",
    bgColor: "#325040",
  };

  const handleEdit = (path) => {
    navigate(path, { state: { eventData } });
  };

  const handleComplete = () => {
    alert(t("eventCreatedSuccessfully"));
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen select-none p-10">
      <h1 className="text-2xl font-semibold text-gray-600 mb-5">
        {t("reviewEvent")}
      </h1>

      {/* 메인 콘텐츠 영역 */}
      <div className="flex flex-col md:flex-row gap-5 w-full max-w-4xl ml-32">
        {/* 왼쪽 (이벤트 세부정보 + 참가자 목록) */}
        <div className="flex flex-col gap-5 w-full md:w-1/2">
          {/* 이벤트 정보 */}
          <div className="bg-white p-5 shadow-md rounded-md">
            <h2 className="font-semibold text-base">{t("eventDetails")}</h2>
            <p>
              <strong>{t("eventName")}:</strong> {eventData.eventName}
            </p>
            <p>
              <strong>{t("budget")}:</strong> {eventData.budget}
            </p>
            <p>
              <strong>{t("eventDate")}:</strong>{" "}
              {eventData.selectedDate
                ? eventData.selectedDate.toLocaleDateString()
                : "N/A"}
            </p>
            <button
              onClick={() => handleEdit("/create-event")}
              className="mt-2 text-blue-500 flex items-center"
            >
              <FaEdit className="mr-1" /> {t("edit")}
            </button>
          </div>

          {/* 참가자 리스트 */}
          <div className="bg-white p-5 shadow-md rounded-md">
            <h2 className="font-semibold text-base">{t("participantList")}</h2>
            <ul className="mt-2">
              <li className="border-b py-1 font-bold text-blue-600">
                {t("organizerLabel")}: {eventData.nickname} ({t("self")})
              </li>
              {eventData.participants.length ? (
                eventData.participants.map((p, index) => (
                  <li key={index} className="border-b py-1">
                    {p.name} - {p.contact}
                  </li>
                ))
              ) : (
                <p className="text-gray-500">{t("noParticipants")}</p>
              )}
            </ul>
            <button
              onClick={() => handleEdit("/create-event/participant")}
              className="mt-2 text-blue-500 flex items-center"
            >
              <FaEdit className="mr-1" /> {t("edit")}
            </button>
          </div>
        </div>

        {/* 오른쪽 (당신의 마니또 카드) */}
        <div className="bg-white p-5 shadow-md rounded-md flex flex-col items-center justify-center md:w-1/3 max-w-sm">
          <h2 className="font-semibold text-base">{t("yourMonitoCard")}</h2>
          <div
            className="w-full max-w-xs h-96 flex flex-col items-center justify-center rounded-lg shadow-lg mt-3"
            style={{ backgroundColor: eventData.bgColor }}
          >
            <h2 className="text-2xl font-bold text-white">
              {eventData.nickname}
            </h2>
            <p className="text-white mt-2 text-center">{eventData.bio}</p>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full mt-3">
              {eventData.interest}
            </span>
          </div>
          <button
            onClick={() => handleEdit("/cards")}
            className="mt-2 text-blue-500 flex items-center"
          >
            <FaEdit className="mr-1" /> {t("edit")}
          </button>
        </div>
      </div>

      {/* 완료 버튼 (하단 중앙) */}
      <button
        className="mt-9 px-8 py-3 text-white bg-[#D32F2F] shadow-xl rounded-full hover:bg-red-700 font-semibold"
        onClick={handleComplete}
      >
        {t("completeEvent")}
      </button>
    </div>
  );
}
