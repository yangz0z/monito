import { useState, useEffect } from "react";

const CountDown = () => {
  const targetDate = new Date("2026-01-01T00:00:00"); // 카운트다운 목표 날짜
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

    return () => clearInterval(timer); // 컴포넌트가 언마운트될 때 타이머 정리
  }, []);

  return (
    <div className=" text-gray-600 mb-4">
      <h1 className="text-center text-sm mb-1.5 ">2025년 카운트다운</h1>
      <div>
        <div className="text-center text-sm space-x-3">
          <span>{timeLeft.days}</span>
          <span>{timeLeft.hours}</span>
          <span>{timeLeft.minutes}</span>
          <span>{timeLeft.seconds}</span>
        </div>
        <div className="text-center text-xs space-x-4">
          <span>일</span>
          <span>시간</span>
          <span>분</span>
          <span>초</span>
        </div>
      </div>
    </div>
  );
};

export default CountDown;
