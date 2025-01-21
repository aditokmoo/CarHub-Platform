export interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    message: string;
    createdAt: string;
    updatedAt: string;
}

export interface Member {
    _id: string;
    name: string;
    profileImage: string;
}

export interface Conversation {
    _id: string;
    user: {
        _id: string,
        name: string,
        profileImage: string
    }
    lastMessage: {
        message: string,
        senderId: string,
        receiverId: string,
        createdAt: string
    }
    members: Member[],
    messages: Message[]
}

export interface ConversationResponse<Payload> {
    daPayloada: Payload;
    status: string
}