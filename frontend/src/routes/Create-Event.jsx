import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CreateEvent() {
  const { t } = useTranslation();
  const [eventName, setEventName] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [errors, setErrors] = useState({ eventName: false, budget: false });
  const navigate = useNavigate();

  const handleNext = () => {
    let newErrors = { eventName: false, budget: false };

    if (!eventName.trim()) newErrors.eventName = true;
    if (!budget.trim()) newErrors.budget = true;

    setErrors(newErrors);

    if (!newErrors.eventName && !newErrors.budget) {
      navigate("/create-event/participant");
    }
  };

  return (
    <div className="mt-1 flex flex-col items-center justify-start h-screen bg-gray-100 relative overflow-visible pt-60 z-10 select-none">
      <p className="text-2xl text-gray-600 mb-5 font-semibold ">
        {t("createEvent2")}
      </p>

      <div className="w-64 ">
        <input
          type="text"
          placeholder={t("eventNamePlaceholder")}
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className={`border shadow rounded-md pl-2 px-6 py-1.5 text-gray-700 w-full ${
            errors.eventName ? "border-red-500" : ""
          }`}
        />
        {errors.eventName && (
          <p className="text-red-500 text-xs mt-1">{t("requiredField")}</p>
        )}
      </div>

      <div className="w-64 mt-2 ">
        <input
          type="text"
          placeholder={t("budgetPlaceholder")}
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className={`border shadow rounded-md pl-2 px-6 py-1.5 text-gray-700 w-full ${
            errors.budget ? "border-red-500" : ""
          }`}
        />
        {errors.budget && (
          <p className="text-red-500 text-xs mt-1">{t("requiredField")}</p>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between w-64 relative overflow-visible">
        <span className="text-sm font-semibold">{t("eventDate")}</span>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          className="border shadow rounded-md w-24 py-1.5 text-gray-700 text-center text-sm font-semibold"
          withPortal // 드롭다운을 body에 직접 렌더링
          popperProps={{
            modifiers: [
              {
                name: "preventOverflow",
                options: {
                  boundary: "viewport", // 화면 내에서 자동 조정
                },
              },
              {
                name: "flip",
                options: {
                  fallbackPlacements: ["top", "bottom"],
                },
              },
            ],
          }}
        />
      </div>

      <button
        onClick={handleNext}
        className="mt-9 px-8 py-3 text-white bg-[#D32F2F] shadow-xl rounded-full hover:bg-red-700 font-semibold"
      >
        {t("next")}
      </button>
    </div>
  );
}
