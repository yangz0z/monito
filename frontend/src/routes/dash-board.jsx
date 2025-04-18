import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEvent } from "../Context/EventContext"; // Context에서 데이터 불러오기
import { FaEdit, FaTrash, FaArrowRight } from "react-icons/fa";

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { eventData, setEventData } = useEvent(); // 이벤트 데이터 가져오기
  const [myEvents, setMyEvents] = useState([]);

  // 마운트 시 내 이벤트 불러오기 (로컬 스토리지 활용 가능)
  useEffect(() => {
    const storedParties = JSON.parse(localStorage.getItem("myEvents")) || [];
    setMyEvents(storedParties);
  }, []);

  const handleEdit = (eventId) => {
    navigate(`/event/${eventId}/edit`);
  };

  const handleDelete = (eventId) => {
    const updatedEvents = myEvents.filter((event) => event.id !== eventId);
    setMyEvents(updatedEvents);
    localStorage.setItem("myEvents", JSON.stringify(updatedEvents));
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-10 select-none">
      <h1 className="text-2xl font-semibold text-gray-600 mb-5">
        {t("myEvents")}
      </h1>

      {/* 이벤트 리스트 */}
      <div className="w-full max-w-4xl">
        {myEvents.length > 0 ? (
          myEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow-md p-5 rounded-md flex justify-between items-center mb-4"
            >
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  {event.eventName}
                </h2>
                <p className="text-gray-600">
                  {t("budget")}: {event.budget}
                </p>
                <p className="text-gray-600">
                  {t("eventDate")}: {event.date}
                </p>
              </div>

              {/* 버튼들 */}
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(`/event/${event.id}`)}
                  className="flex items-center px-4 py-2 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition"
                >
                  {t("viewEvent")} <FaArrowRight className="ml-2" />
                </button>
                <button
                  onClick={() => handleEdit(event.id)}
                  className="flex items-center px-4 py-2 text-green-500 border border-green-500 rounded-md hover:bg-green-500 hover:text-white transition"
                >
                  <FaEdit className="mr-1" /> {t("edit")}
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="flex items-center px-4 py-2 text-red-500 border border-red-500 rounded-md hover:bg-red-500 hover:text-white transition"
                >
                  <FaTrash className="mr-1" /> {t("delete")}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">{t("noEventsFound")}</p>
        )}
      </div>

      {/* 새 이벤트 만들기 버튼 */}
      <button
        className="mt-5 px-8 py-3 text-white bg-[#D32F2F] shadow-xl rounded-full hover:bg-red-700 font-semibold"
        onClick={() => navigate("/create-event")}
      >
        {t("createNewEvent")}
      </button>
    </div>
  );
}
