import { createContext, useContext, useState, useEffect } from "react";

// 초기 상태 정의
const initialState = {
  eventName: "",
  budget: "",
  selectedDate: new Date(),
  participants: [],
  manitoCards: [],
  nickname: "",
  bio: "",
  interest: "",
  bgColor: "#325040",
};

// Context 생성
const EventContext = createContext({
  eventData: initialState,
  setEventData: () => {},
});

// Provider 컴포넌트
export const EventProvider = ({ children }) => {
  const [eventData, setEventData] = useState(() => {
    // localStorage에서 데이터 불러오기
    const savedData = localStorage.getItem("eventData");
    return savedData ? JSON.parse(savedData) : initialState;
  });

  // eventData가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("eventData", JSON.stringify(eventData));
  }, [eventData]);

  return (
    <EventContext.Provider value={{ eventData, setEventData }}>
      {children}
    </EventContext.Provider>
  );
};

// Custom Hook: Context 사용을 위한 안전한 접근 처리
export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
};
