
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ChatHistory from '@/components/ChatHistory';
import ChatInput from '@/components/ChatInput';
import SubjectSelector from '@/components/SubjectSelector';
import CitationHelper from '@/components/CitationHelper';
import { useChat } from '@/lib/chatUtils';
import { Book, GraduationCap, Trash2 } from 'lucide-react';

const Index = () => {
  const [showSubjects, setShowSubjects] = useState(true);
  const { 
    messages, 
    isLoading, 
    selectedSubject, 
    sendMessage, 
    changeSubject,
    clearChat
  } = useChat();

  return (
    <div className="min-h-screen flex flex-col bg-academic-cream paper-texture">
      {/* Header */}
      <header className="bg-academic-navy shadow-md py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-academic-cream rounded-full p-2">
              <GraduationCap className="text-academic-navy h-6 w-6" />
            </div>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-white">
              Scholar Scribe <span className="hidden sm:inline">AI</span>
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <CitationHelper />
            <Button
              variant="ghost"
              size="icon"
              onClick={clearChat}
              className="text-white hover:bg-white/20"
              title="Clear conversation"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-w-6xl mx-auto w-full p-4">
        {/* Subject Selection */}
        {showSubjects && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
            <SubjectSelector
              selectedSubject={selectedSubject}
              onSelectSubject={changeSubject}
            />
          </div>
        )}

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm overflow-hidden border border-academic-navy/10">
          {/* Chat Messages */}
          <ChatHistory 
            messages={messages} 
            isLoading={isLoading} 
          />
          
          {/* Input Area */}
          <div className="p-4 border-t border-academic-navy/10 bg-academic-lightblue">
            <ChatInput 
              onSendMessage={sendMessage}
              isLoading={isLoading}
              selectedSubject={selectedSubject}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 text-center text-xs text-academic-navy/70">
        <p>Scholar Scribe AI © {new Date().getFullYear()} - Academic Assistant for Research & Writing</p>
      </footer>
    </div>
  );
};

export default Index;
