import { createContext, useContext, useState, ReactNode } from 'react';
import { ChatContextType } from '../types';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

    return (
        <ChatContext.Provider value={{ selectedConversationId, setSelectedConversationId }}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChatContext() {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}