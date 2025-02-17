import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const [eventName, setEventName] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [errors, setErrors] = useState({ eventName: false, budget: false });
  const navigate = useNavigate();

  const handleSubmit = () => {
    let newErrors = { eventName: false, budget: false };

    if (!eventName.trim()) newErrors.eventName = true;
    if (!budget.trim()) newErrors.budget = true;

    setErrors(newErrors);

    if (!newErrors.eventName && !newErrors.budget) {
      navigate("/create-event/participant");
    }
  };

  return (
    <div className="mt-1 flex flex-col items-center justify-start h-screen bg-gray-100 relative pt-60">
      <div>
        <img src="/icon_gift.png" alt="Gift Icon" />
      </div>
      <h1 className="text-4xl text-gray-600 font-medium mt-2 mb-5 font-semibold">
        MONITO
      </h1>
      <p className="text-base text-gray-600 mb-5 font-semibold">
        이벤트 만들기
      </p>

      <div className="w-64">
        <input
          type="text"
          placeholder="이벤트 이름"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className={`border rounded-md pl-2 px-6 py-1.5 text-gray-700 w-full ${
            errors.eventName ? "border-red-500" : ""
          }`}
          required
        />
        {errors.eventName && (
          <p className="text-red-500 text-xs mt-1">필수 입력 항목입니다.</p>
        )}
      </div>

      <div className="w-64 mt-2">
        <input
          type="text"
          placeholder="예산"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className={`border rounded-md pl-2 px-6 py-1.5  text-gray-700 w-full ${
            errors.budget ? "border-red-500" : ""
          }`}
          required
        />
        {errors.budget && (
          <p className="text-red-500 text-xs mt-1">필수 입력 항목입니다.</p>
        )}
      </div>
      <div className="mt-2 flex items-center justify-between w-64 ">
        <span className="text-sm font-semibold">이벤트 날짜</span>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          className="border rounded-md w-24 py-1.5 text-gray-700 text-center text-sm font-semibold"
          popperPlacement="bottom-start"
          portalId="root-portal"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-9 px-8 py-3 text-white bg-[#D32F2F] shadow-xl rounded-full hover:bg-red-700 font-semibold"
      >
        다음
      </button>
    </div>
  );
}
