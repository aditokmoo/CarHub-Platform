import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    senderId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiverId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String
    },
    image: {
        type: String
    },
}, { timestamps: true });

const Message = mongoose.model('Review', messageSchema);

export default Message;