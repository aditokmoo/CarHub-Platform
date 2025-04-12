import { Conversation } from "../../../types";

export interface ChatLayoutProps {
    selectedConversationId: string,
    setSelectedConversationId: (id: string | null) => void
}

export interface MessageFormInputs {
    message: string;
}

export interface MessageInputProps {
    receiverId?: string,
}

export interface MessageProps {
    data?: Conversation
}

export interface MessageSidebarProps {
    onlineUsers: string[];
}

export interface ConversationProps {
    conversations?: Conversation[],
    onlineUsers: string[]
}

export interface ChatContextType {
    selectedConversationId: string | null;
    setSelectedConversationId: (id: string | null) => void;
}