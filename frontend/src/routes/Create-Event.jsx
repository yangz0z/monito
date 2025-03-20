import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEvent } from "../Context/EventContext"; // Context 불러오기
import CustomDatePicker from "../components/CustomDatePicker"; // DatePicker 컴포넌트 가져오기

export default function CreateEvent() {
  const { t } = useTranslation();
  const { eventData, setEventData } = useEvent(); // 전역 상태 가져오기
  const navigate = useNavigate();

  // ✅ 초기값 설정: selectedDate가 문자열이면 Date 객체로 변환
  const [eventName, setEventName] = useState(eventData.eventName || "");
  const [budget, setBudget] = useState(eventData.budget || "");
  const [selectedDate, setSelectedDate] = useState(() => {
    return eventData.selectedDate
      ? new Date(eventData.selectedDate)
      : new Date();
  });
  const [errors, setErrors] = useState({ eventName: false, budget: false });

  // ✅ 예산 입력 시 숫자만 허용하고, 천 단위 콤마 추가
  const handleBudgetChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, ""); // 숫자 이외 문자 제거
    let formattedValue = value
      ? new Intl.NumberFormat("ko-KR").format(value)
      : "";
    setBudget(formattedValue);
  };

  // ✅ "다음" 버튼 클릭 시 이벤트 정보 저장 후 이동
  const handleNext = () => {
    let newErrors = { eventName: false, budget: false };

    if (!eventName.trim()) newErrors.eventName = true;
    if (!budget.trim()) newErrors.budget = true;

    setErrors(newErrors);

    if (!newErrors.eventName && !newErrors.budget) {
      const today = new Date();
      const selected = new Date(selectedDate);

      // 🔥 선택한 날짜가 오늘인지 확인
      if (
        selected.getFullYear() === today.getFullYear() &&
        selected.getMonth() === today.getMonth() &&
        selected.getDate() === today.getDate()
      ) {
        const confirmMove = window.confirm(t("confirmTodayEvent"));
        if (!confirmMove) return;
      }

      // 🔥 selectedDate를 `ISO String`으로 변환하여 저장 (JSON 호환성 유지)
      setEventData((prev) => ({
        ...prev,
        eventName,
        budget,
        selectedDate:
          selectedDate instanceof Date
            ? selectedDate.toISOString()
            : selectedDate,
      }));

      navigate("/create-event/participant");
    }
  };

  return (
    <div className="mt-1 flex flex-col items-center justify-start h-screen relative overflow-visible pt-60 z-10 select-none">
      <p className="text-2xl text-gray-600 mb-5 font-semibold">
        {t("createEvent2")}
      </p>

      {/* 이벤트 이름 입력 */}
      <div className="w-64">
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

      {/* 예산 입력 */}
      <div className="w-64 mt-2">
        <input
          type="text"
          placeholder={t("budgetPlaceholder")}
          value={budget}
          onChange={handleBudgetChange}
          className={`border shadow rounded-md pl-2 px-6 py-1.5 text-gray-700 w-full ${
            errors.budget ? "border-red-500" : ""
          }`}
        />
        {errors.budget && (
          <p className="text-red-500 text-xs mt-1">{t("requiredField")}</p>
        )}
      </div>

      {/* 🔥 CustomDatePicker를 사용하며 selectedDate와 setSelectedDate 전달 */}
      <CustomDatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* 다음 버튼 */}
      <button
        onClick={handleNext}
        className="mt-9 px-8 py-3 text-white bg-[#D32F2F] shadow-xl rounded-full hover:bg-red-700 font-semibold"
      >
        {t("next")}
      </button>
    </div>
  );
}
