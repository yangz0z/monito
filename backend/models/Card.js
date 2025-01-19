import mongoose from 'mongoose';

const cardSchema = mongoose.Schema({
    regDate: {
        type: String,
        description: '등록일',
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
        description: '이벤트 식별값',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        description: '등록자 식별값',
    },
    title: {
        type: String,
        description: '칭호',
    },
    name: {
        type: String,
        description: '이름',
    },
    comment: {
        type: String,
        description: '첨언',
    },
    manitoCardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
        description: '이 카드를 뽑을 마니또',
    },
    isOpened: {
        type: Boolean,
        description: '카드가 오픈되었는지 여부',
    },
});

const Card = mongoose.model('Card', cardSchema);

export { Card }; 