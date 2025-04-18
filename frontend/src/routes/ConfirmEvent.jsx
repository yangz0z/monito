import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaEdit } from "react-icons/fa";
import { useEvent } from "../Context/EventContext";

export default function ConfirmEvent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { eventData, setEventData } = useEvent();

  // 주최자 정보
  const organizer =
    eventData.participants?.length > 0
      ? eventData.participants[0]
      : { name: eventData.nickname || "N/A", contact: "N/A" };

  // 마니또 카드 데이터
  const manitoCard = eventData.manitoCards?.length
    ? eventData.manitoCards[0]
    : {
        nickname: eventData.nickname || "N/A",
        bio: eventData.bio || "N/A",
        interest: eventData.interest || "N/A",
        bgColor: eventData.bgColor || "#325040",
      };

  // 수정 버튼 클릭 시
  const handleEdit = (path) => {
    navigate(path);
  };

  // 완료 버튼 클릭 시 - localStorage 저장 추가됨
  const handleComplete = () => {
    const newEvent = {
      id: new Date().getTime(), // 고유 ID
      eventName: eventData.eventName,
      budget: eventData.budget,
      date: eventData.selectedDate
        ? new Date(eventData.selectedDate).toISOString()
        : "N/A",
    };

    const existingEvents = JSON.parse(localStorage.getItem("myEvents")) || [];
    const updatedEvents = [...existingEvents, newEvent];
    localStorage.setItem("myEvents", JSON.stringify(updatedEvents));

    alert(t("eventCreatedSuccessfully"));
    navigate("/dash-board");
  };

  return (
    <div className="flex flex-col items-center min-h-screen select-none p-10">
      <h1 className="text-2xl font-semibold text-gray-600 mb-5">
        {t("reviewEvent")}
      </h1>

      <div className="flex flex-col md:flex-row gap-5 w-full max-w-4xl ml-32">
        {/* 왼쪽 섹션 */}
        <div className="flex flex-col gap-5 w-full md:w-1/2">
          {/* 이벤트 정보 */}
          <div className="bg-white p-5 text-sm shadow-md rounded-md">
            <h2 className="font-semibold mb-3 text-base">
              {t("eventDetails")}
            </h2>
            <p>
              <strong>{t("eventName")}:</strong> {eventData.eventName || "N/A"}
            </p>
            <p>
              <strong>{t("budget")}:</strong> {eventData.budget || "N/A"}
            </p>
            <p>
              <strong>{t("eventDate")}:</strong>{" "}
              {eventData.selectedDate
                ? new Date(eventData.selectedDate).toLocaleDateString()
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
          <div className="bg-white p-5 shadow-md text-sm rounded-md">
            <h2 className="font-semibold text-base">{t("participantList")}</h2>
            <ul className="mt-2.5">
              <li className="border-b font-bold text-gray-600">
                {t("organizerLabel")} : {organizer.name} ({t("self")})
              </li>
              {eventData.participants?.length > 1 ? (
                eventData.participants.slice(1).map((p, index) => (
                  <li key={index} className="border-b">
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

        {/* 오른쪽 - 마니또 카드 */}
        <div className="bg-white p-5 shadow-md rounded-md flex flex-col items-center justify-center md:w-1/3 max-w-sm">
          <h2 className="font-semibold text-base">{t("yourMonitoCard")}</h2>
          <div
            className="w-full max-w-xs h-96 flex flex-col items-center justify-center rounded-lg shadow-lg mt-3"
            style={{ backgroundColor: manitoCard.bgColor }}
          >
            <h2 className="text-2xl font-bold text-white">
              {manitoCard.nickname}
            </h2>
            <p className="text-white mt-2 text-center">{manitoCard.bio}</p>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full mt-3">
              {manitoCard.interest}
            </span>
          </div>
          <button
            onClick={() => handleEdit("/create-event/cards")}
            className="mt-2 text-blue-500 flex items-center"
          >
            <FaEdit className="mr-1" /> {t("edit")}
          </button>
        </div>
      </div>

      {/* 완료 버튼 */}
      <button
        className="mt-9 px-8 py-3 text-white bg-[#D32F2F] shadow-xl rounded-full hover:bg-red-700 font-semibold"
        onClick={handleComplete}
      >
        {t("completeEvent")}
      </button>
    </div>
  );
}
