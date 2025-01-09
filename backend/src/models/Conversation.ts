import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    members: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
    ],
    messages: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Message',
            default: []
        }
    ],
    lastMessage: {
        type: mongoose.Types.ObjectId,
        ref: 'Message',
    }
}, { timestamps: true });

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;