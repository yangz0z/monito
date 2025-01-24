export default function CreateEvent() {
  return (
    <div className="mt-1 flex flex-col items-center justify-center h-screen bg-gray-100">
      <div>
        <img src="/icon_gift.png" alt="Gift Icon" />
      </div>
      <h1 className="text-4xl text-gray-600 font-medium mt-2 mb-5">MONITO</h1>
      <p className="text-base text-gray-600 mb-5">이벤트 만들기</p>
      <div>
        <input
          type="text"
          placeholder="이벤트 이름"
          className="border rounded-md px-4 py-1.5 text-gray-700"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="예산"
          className="border rounded-md px-4 py-1.5 text-gray-700"
        />
      </div>
      <div className="mt-3">
        <span>이벤트 날짜</span>
      </div>
      <button className=" mt-5 px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
        다음
      </button>
    </div>
  );
}
