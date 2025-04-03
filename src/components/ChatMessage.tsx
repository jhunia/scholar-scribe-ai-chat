
import React from 'react';
import { Message } from '@/lib/chatUtils';
import { cn } from '@/lib/utils';
import { Book } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUserMessage = message.role === 'user';
  
  return (
    <div className={cn(
      'flex w-full mb-4 animate-in fade-in-0 slide-in-from-bottom-5 duration-300',
      isUserMessage ? 'justify-end' : 'justify-start'
    )}>
      <div className={cn(
        'flex items-start max-w-3xl',
        isUserMessage ? 'flex-row-reverse' : 'flex-row'
      )}>
        <div className={cn(
          'flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full mr-3',
          isUserMessage ? 'ml-3 mr-0 bg-academic-navy text-white' : 'bg-academic-cream text-academic-navy'
        )}>
          {isUserMessage ? (
            <span className="font-bold">{message.role.charAt(0).toUpperCase()}</span>
          ) : (
            <Book size={20} />
          )}
        </div>
        
        <div className={cn(
          'p-4 rounded-lg shadow-sm',
          isUserMessage 
            ? 'bg-academic-navy text-white rounded-tr-none' 
            : 'bg-white border border-academic-cream rounded-tl-none'
        )}>
          <div className="whitespace-pre-wrap">
            {message.content}
          </div>
          <div className={cn(
            'text-xs mt-1',
            isUserMessage ? 'text-academic-cream' : 'text-gray-500'
          )}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
