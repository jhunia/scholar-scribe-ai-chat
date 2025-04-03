
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { sampleQueries } from '@/lib/academicData';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  selectedSubject: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isLoading,
  selectedSubject 
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const filteredQueries = sampleQueries.filter(
    query => query.subject === 'general' || query.subject === selectedSubject
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const insertSampleQuery = (text: string) => {
    setMessage(text);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [message]);

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {filteredQueries.slice(0, 3).map((query, index) => (
          <button
            key={index}
            onClick={() => insertSampleQuery(query.text)}
            className="px-3 py-1.5 text-sm bg-academic-lightblue text-academic-navy rounded-full hover:bg-academic-navy hover:text-white transition-colors border border-academic-navy/20"
          >
            {query.text}
          </button>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="relative">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask any academic question..."
          className="w-full p-4 pr-24 min-h-[60px] max-h-[150px] border-2 border-academic-navy/20 rounded-xl focus-visible:ring-academic-navy bg-white resize-none"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          disabled={isLoading || !message.trim()} 
          className="absolute right-2 bottom-2 bg-academic-navy hover:bg-academic-navy/80 text-white px-4 h-10 rounded-lg"
        >
          {isLoading ? 'Processing...' : 'Send'}
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
