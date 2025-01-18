const EventStatus = {
  CREATING: {
    code: 'creating',
    label: '카드 생성중',
    description: '각자 마니또 카드를 만들고 이벤트에 참여하는 단계',
    index: 1,
  },
  DRAWING: {
    code: 'drawing',
    label: '마니또 뽑기 진행중',
    description: '각자 마니또 카드에서 자신의 마니또를 뽑는 단계',
    index: 2,
  },
  IN_PROGRESS: {
    code: 'in_progress',
    label: '마니또 진행중',
    description: '각자 마니또가 정해지고 미션 수행 단계',
    index: 3,
  },
  COMPLETED: {
    code: 'completed',
    label: '마니또 게임종료',
    description: '마니또 게임이 종료된 상태',
    index: 4,
  }
};

export default EventStatus;