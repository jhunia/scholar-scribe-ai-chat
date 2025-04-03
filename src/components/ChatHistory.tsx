
import React, { useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { Message, useScrollToBottom } from '@/lib/chatUtils';

interface ChatHistoryProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, isLoading }) => {
  const { ref, scrollToBottom } = useScrollToBottom();

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <div 
      ref={ref}
      className="flex-1 overflow-y-auto p-4 space-y-4 academic-scrollbar"
    >
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-24 h-24 mb-6 rounded-full bg-academic-navy flex items-center justify-center">
            <span className="text-white text-3xl font-serif">S</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-academic-navy mb-2">
            Scholar Scribe AI
          </h2>
          <p className="text-gray-600 max-w-md mb-6">
            Your academic research assistant. Ask questions about any subject or get help with writing, research, and citations.
          </p>
          <div className="w-16 h-1 bg-academic-gold rounded-full"></div>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isLoading && (
            <div className="flex items-center space-x-2 p-4 rounded-lg bg-white border border-academic-cream max-w-3xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-academic-navy opacity-75 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-academic-navy opacity-75 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-academic-navy opacity-75 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span className="text-sm text-gray-500">Scholar Scribe is thinking...</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChatHistory;
