import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center select-none">
      <h1 className="text-4xl font-bold text-gray-700 mb-4">404 Not Found</h1>
      <p className="text-gray-500 mb-6">페이지를 찾을 수 없습니다.</p>
      <button
        onClick={() => navigate("/")}
        className="mt-5 px-8 py-3 font-semibold shadow-xl text-white bg-[#D32F2F] rounded-full hover:bg-red-700"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}
