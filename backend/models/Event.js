import mongoose from 'mongoose';
import EventStatus from './enums/EventStatus.js';

const eventSchema = mongoose.Schema({
    regDate: {
        type: String,
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isCreatorParticipant: {
        type: Boolean,
        default: true,
    },
    status: {
        type: String,
        enum: Object.keys(EventStatus),
        default: 'CREATING',
    }
});

const Event = mongoose.model('Event', eventSchema);

export { Event }; 