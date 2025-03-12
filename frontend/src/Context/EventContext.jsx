import { createContext, useContext, useState } from "react";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [eventData, setEventData] = useState({
    eventName: "",
    budget: "",
    selectedDate: new Date(),
    participants: [],
    manitoCards: [],
    nickname: "", // 추가됨
    bio: "", // 추가됨
    interest: "", // 추가됨
    bgColor: "#325040", // 추가됨
  });

  return (
    <EventContext.Provider value={{ eventData, setEventData }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => useContext(EventContext);
