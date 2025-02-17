import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function DrawResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { participants } = location.state || { participants: [] };
  const [result, setResult] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [randomName, setRandomName] = useState("");
  const [isShuffling, setIsShuffling] = useState(true);

  useEffect(() => {
    if (participants.length < 3) {
      navigate("/live-event"); // 최소 인원이 부족하면 이전 페이지로 이동
      return;
    }

    // 참가자 섞기 및 마니또 매칭
    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    const pairedResults = shuffled.map((participant, index) => ({
      giver: participant,
      receiver: shuffled[(index + 1) % shuffled.length], // 다음 사람을 받는 사람으로 지정
    }));

    setResult(pairedResults);
  }, [participants, navigate]);

  useEffect(() => {
    if (result.length > 0) {
      setIsShuffling(true);
      let shuffleInterval = setInterval(() => {
        setRandomName(
          participants[Math.floor(Math.random() * participants.length)]
        );
      }, 150);

      setTimeout(() => {
        clearInterval(shuffleInterval);
        setRandomName(result[currentIndex]?.receiver);
        setIsShuffling(false);
      }, 3500);

      return () => clearInterval(shuffleInterval);
    }
  }, [currentIndex, result, participants]);

  const handleNext = () => {
    if (currentIndex < result.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsShuffling(true);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-gray-100 text-white pt-60">
      <div>
        <img src="/icon_gift.png" alt="Gift Icon" />
      </div>
      <h1 className="text-4xl text-gray-600 font-medium mt-2 mb-5 font-semibold">
        MONITO
      </h1>
      {!isFinished ? (
        <>
          {/* 개별 결과 표시 */}
          <div className="flex flex-col items-center bg-white text-gray-800 p-6 rounded-lg shadow-lg w-80">
            <p className="text-2xl text-gray-600 font-semibold mb-2">
              {result[currentIndex]?.giver}
            </p>
            <img
              src="/icon_gift.png"
              alt="Gift Icon"
              className="mt-2 mb-2 animate-bounce"
            />

            {/* fade-in 애니메이션 적용 */}
            <p
              className="text-lg font-semibold text-gray-600 transition-opacity duration-1000 opacity-0 animate-fadeIn"
              key={currentIndex} // currentIndex 변경 시마다 애니메이션 실행
            >
              이(가) 선물을 줄 사람은
            </p>

            {/* 선물 받을 사람 이름 */}
            <p className="text-2xl text-gray-600 font-bold mt-2">
              {randomName}
            </p>
          </div>

          {/* 다음 버튼 (애니메이션이 진행 중일 때만 숨김) */}
          {!isShuffling && (
            <button
              onClick={handleNext}
              className="mt-5 px-8 py-3 font-semibold shadow-xl text-white bg-[#D32F2F] rounded-full hover:bg-red-700 transition-opacity duration-500"
            >
              {currentIndex === result.length - 1 ? "결과 보기" : "다음"}
            </button>
          )}
        </>
      ) : (
        <>
          {/* 최종 결과 화면 */}
          <ul className="mt-4 w-80 bg-white text-gray-800 p-4 rounded-lg shadow-lg">
            {result.map(({ giver, receiver }, index) => (
              <li key={index} className="flex justify-between p-2 border-b">
                <span className="font-semibold">{giver}</span>
                <span className="text-gray-600 font-semibold">→</span>
                <span className="font-semibold">{receiver}</span>
              </li>
            ))}
          </ul>
          {/* 최종 결과 화면에서는 항상 버튼 표시 */}
          <button
            onClick={() => navigate("/")}
            className="mt-5 px-8 py-3 font-semibold shadow-xl text-white bg-[#D32F2F] rounded-full hover:bg-red-700"
          >
            홈으로 돌아가기
          </button>
        </>
      )}
    </div>
  );
}
