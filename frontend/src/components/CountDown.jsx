import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const CountDown = () => {
  const targetDate = new Date("2026-01-01T00:00:00");
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const { t } = useTranslation();

  function calculateTimeLeft() {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
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
    <div className="text-gray-600 mb-4 select-none">
      <h1 className="text-center text-sm mb-1.5 font-semibold">
        {t("countdownTitle")}
      </h1>
      <div className="flex justify-center space-x-4">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-1 font-semibold">{timeLeft.days}</span>
          <span className="text-xs font-semibold">{t("days")}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm mb-1 font-semibold">{timeLeft.hours}</span>
          <span className="text-xs font-semibold">{t("hours")}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm mb-1 font-semibold">{timeLeft.minutes}</span>
          <span className="text-xs font-semibold">{t("minutes")}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm mb-1 font-semibold">{timeLeft.seconds}</span>
          <span className="text-xs font-semibold">{t("seconds")}</span>
        </div>
      </div>
    </div>
  );
};

export default CountDown;
