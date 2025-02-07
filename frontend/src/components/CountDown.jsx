import { useState, useEffect } from "react";

const CountDown = () => {
  const targetDate = new Date("2026-01-01T00:00:00");
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0"
      ),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(
        2,
        "0"
      ),
      minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(
        2,
        "0"
      ),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-gray-600 mb-4">
      <h1 className="text-center text-sm mb-1.5 font-semibold">
        2025년 카운트다운
      </h1>
      <div className="flex justify-center space-x-4">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-1 font-semibold">{timeLeft.days}</span>
          <span className="text-xs font-semibold">일</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm mb-1 font-semibold">{timeLeft.hours}</span>
          <span className="text-xs font-semibold">시간</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm mb-1 font-semibold">{timeLeft.minutes}</span>
          <span className="text-xs font-semibold">분</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm mb-1 font-semibold">{timeLeft.seconds}</span>
          <span className="text-xs font-semibold">초</span>
        </div>
      </div>
    </div>
  );
};

export default CountDown;
