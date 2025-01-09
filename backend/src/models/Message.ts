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
    message: {
        type: String
    },
    image: {
        type: String
    },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;