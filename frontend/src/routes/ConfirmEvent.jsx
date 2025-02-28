import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaEdit } from "react-icons/fa";

export default function ConfirmEvent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // 기본값 설정
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

  console.log("eventData:", eventData);

  const handleEdit = (path) => {
    navigate(path, { state: { eventData } });
  };

  const handleComplete = () => {
    alert(t("eventCreatedSuccessfully"));
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-600">
        {t("reviewEvent")}
      </h1>

      {/* 이벤트 정보 */}
      <div className="bg-white p-5 shadow-md rounded-md mt-5 w-80">
        <h2 className="text-lg font-semibold">{t("eventDetails")}</h2>
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

      {/* 참가자 리스트 (주최자 포함) */}
      <div className="bg-white p-5 shadow-md rounded-md mt-5 w-80">
        <h2 className="text-lg font-semibold">{t("participantList")}</h2>
        <ul className="mt-2">
          {/* 주최자 먼저 표시 */}
          <li className="border-b py-1 font-bold text-blue-600">
            {t("organizerLabel")}: {eventData.nickname} ({t("self")})
          </li>
          {/* 다른 참가자들 */}
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

      {/* 주최자의 마니또 카드 (본인 소개) */}
      <div className="bg-white p-5 shadow-md rounded-md mt-5 w-80">
        <h2 className="text-lg font-semibold">{t("yourMonitoCard")}</h2>
        <div
          className="w-64 h-96 flex flex-col items-center justify-center rounded-lg shadow-lg mt-3"
          style={{ backgroundColor: eventData.bgColor }}
        >
          <h2 className="text-2xl font-bold text-white">
            {eventData.nickname}
          </h2>
          <p className="text-white mt-2">{eventData.bio}</p>
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

      {/* 최종 완료 버튼 */}
      <button
        className="mt-9 px-8 py-3 text-white bg-green-600 shadow-xl rounded-full hover:bg-green-700 font-semibold"
        onClick={handleComplete}
      >
        {t("completeEvent")}
      </button>
    </div>
  );
}
