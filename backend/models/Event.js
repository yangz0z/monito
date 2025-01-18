import mongoose from 'mongoose';
import EventStatus from './enums/EventStatus.js';

const eventSchema = mongoose.Schema({
    regDate: {
        type: String,
        description: '등록일',
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        description: '등록자 식별값',
    },
    isCreatorParticipant: {
        type: Boolean,
        default: true,
        description: '생성자가 파티에 참여하는지 여부',
    },
    status: {
        type: String,
        enum: Object.keys(EventStatus),
        default: 'CREATING',
        description: '마니또 이벤트 진행 상태',
    }
});

const Event = mongoose.model('Event', eventSchema);

export { Event }; 