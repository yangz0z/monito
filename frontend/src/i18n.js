import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      myAccount: "My Account",
      logout: "Logout",
      welcomeMessage1: "Welcome to MONITO for everyone.",
      welcomeMessage2: "Enjoy your time here!",
      startMonito: "Start MONITO",
      selectMode: "Please select a mode",
      createEvent: "Create a new event",
      joinWithCode: "Join with an invite code",
      selectCreationMethod: "Select a creation method",
      notifyViaMessage: "Send notification via message / KakaoTalk",
      liveEvent: "Proceed live",
      countdownTitle: "Countdown to 2025",
      days: "D",
      hours: "H",
      minutes: "M",
      seconds: "S",
      addParticipants: "Add Participants",
      namePlaceholder: "Enter Name",
      next: "Next",
      enterNameToAdd: "Please enter a name before adding.",
      nameAlreadyExists: "This name already exists in the list.",
      chooseAnotherName: "Please choose a different name or nickname.",
      minParticipantsRequired:
        "Please add at least 3 participants to continue.",
      createEvent2: "Create Event",
      eventNamePlaceholder: "Enter event name",
      budgetPlaceholder: "Enter budget",
      eventDate: "Event Date",
      requiredField: "This field is required.",
      contactPlaceholder: "Email or Phone Number",
      pressAddToIncludeParticipant: "Press the + button to add participants.",
      minThreeParticipants: "At least 3 participants are required.",
      participantLabel: "Participant",
      createMonitoCard: "Create Monito Card",
      nicknamePlaceholder: "Nickname",
      bioPlaceholder: "short bio",
      interestPlaceholder: "Interests",
      selectBackgroundColor: "Select Background Color",
      saveCard: "Save Card",
    },
  },
  ko: {
    translation: {
      myAccount: "내 계정",
      logout: "로그아웃",
      welcomeMessage1: "모두를 위한 마니또 MONITO에 오신 것을",
      welcomeMessage2: "환영합니다.",
      startMonito: "MONITO 시작하기",
      selectMode: "실행 모드를 선택해주세요",
      createEvent: "새 이벤트 만들기",
      joinWithCode: "초대코드로 참여하기",
      selectCreationMethod: "생성 방식을 선택해주세요",
      notifyViaMessage: "문자 / 카카오톡으로 알림 보내기",
      liveEvent: "라이브로 진행하기",
      countdownTitle: "2025년 카운트다운",
      days: "일",
      hours: "시간",
      minutes: "분",
      seconds: "초",
      addParticipants: "참가자 추가하기",
      namePlaceholder: "이름 입력",
      next: "다음",
      enterNameToAdd: "이름을 입력하고 참가자를 추가하세요.",
      nameAlreadyExists: "해당 이름은 참가자 목록에 이미 있습니다.",
      chooseAnotherName: "다른 이름이나 별명을 추가하세요.",
      minParticipantsRequired: "최소 3명 이상의 참가자를 추가하고 계속하세요.",
      createEvent2: "이벤트 만들기",
      eventNamePlaceholder: "이벤트 이름",
      budgetPlaceholder: "예산",
      eventDate: "이벤트 날짜",
      requiredField: "필수 입력 항목입니다.",
      contactPlaceholder: "이메일 또는 휴대폰 번호",
      pressAddToIncludeParticipant: "+ 추가 버튼을 눌러 참가자를 추가해주세요.",
      minThreeParticipants: "참가자는 최소 3명 이상이어야 합니다.",
      participantLabel: "참가자",
      createMonitoCard: "마니또 카드 만들기",
      nicknamePlaceholder: "닉네임 입력",
      bioPlaceholder: "한 줄 소개를 입력하세요",
      interestPlaceholder: "관심사 (예: 여행, 독서, 운동)",
      selectBackgroundColor: "배경색 선택",
      saveCard: "카드 저장",
    },
  },
};

i18n
  .use(LanguageDetector) // 브라우저 언어 감지
  .use(initReactI18next) // React와 연결
  .init({
    resources,
    lng: localStorage.getItem("language") || "ko", // ✅ 초기값을 localStorage에서 가져옴
    fallbackLng: "ko", // 기본 언어
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
