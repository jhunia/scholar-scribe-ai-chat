
import { useState, useEffect, useRef } from 'react';
import { academicSubjects, citationStyles, type CitationStyle } from './academicData';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';

export type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
};

export type ChatState = {
  messages: Message[];
  isLoading: boolean;
  selectedSubject: string;
  conversationId?: string;
};

interface OpenAIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export function useChat(initialSubject = 'general') {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    selectedSubject: initialSubject,
  });
  const { toast } = useToast();

  const getSystemPrompt = (subject: string) => {
    const subjectInfo = academicSubjects.find(s => s.id === subject);
    const subjectName = subjectInfo ? subjectInfo.name : 'General Academics';
    
    return `You are Scholar Scribe, an AI academic assistant that helps with ${subjectName} studies and research.
    
    Your primary goal is to provide accurate, comprehensive, and academically sound information. Support your explanations with relevant theories, methodologies, and academic references when possible.
    
    When addressing questions:
    - Present information in a scholarly, well-structured format
    - Maintain academic integrity and rigor
    - Include brief citations or references to academic sources where relevant
    - If uncertain, acknowledge limitations rather than presenting speculation as fact
    
    Use an academic but approachable tone that's helpful to students and researchers.`;
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: `user-${uuidv4()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }));

    try {
      const systemPrompt = getSystemPrompt(state.selectedSubject);
      const messagesForAPI: OpenAIMessage[] = [
        { role: 'system', content: systemPrompt },
        ...state.messages.map(m => ({ role: m.role, content: m.content })),
        { role: userMessage.role, content: userMessage.content }
      ];
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY || localStorage.getItem('openai_api_key')}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: messagesForAPI,
          temperature: 0.3,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const responseData = await response.json();
      
      const assistantMessage: Message = {
        id: `assistant-${uuidv4()}`,
        role: 'assistant',
        content: responseData.choices[0].message.content,
        timestamp: new Date(),
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "There was a problem connecting to the AI service. Please check your API key or try again later.",
        variant: "destructive"
      });
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const changeSubject = (subjectId: string) => {
    if (academicSubjects.some(subject => subject.id === subjectId)) {
      setState(prev => ({ ...prev, selectedSubject: subjectId }));
    }
  };

  const clearChat = () => {
    setState(prev => ({ 
      ...prev, 
      messages: [],
      conversationId: undefined
    }));
  };

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    selectedSubject: state.selectedSubject,
    sendMessage,
    changeSubject,
    clearChat
  };
}

// A simple mock function to generate responses based on the subject
function generateMockResponse(prompt: string, subject: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  // General academic responses
  if (lowerPrompt.includes('hello') || lowerPrompt.includes('hi')) {
    return "Hello! I'm your academic AI assistant. How can I help with your studies or research today?";
  }

  if (lowerPrompt.includes('help') && lowerPrompt.includes('write')) {
    return "To improve your academic writing, focus on clarity, structure, and evidence. Start with a clear thesis statement, support it with evidence in your body paragraphs, and conclude by synthesizing your main points. Remember to cite your sources properly and revise for cohesion and coherence.";
  }

  if (lowerPrompt.includes('citation') || lowerPrompt.includes('cite')) {
    return "Academic citations are crucial for acknowledging sources and avoiding plagiarism. Common citation styles include APA, MLA, Chicago, and Harvard. Each has specific formatting requirements for different source types. You can select a citation style from the Citation Helper below to format your references correctly.";
  }

  // Subject-specific responses
  if (subject === 'literature' && (lowerPrompt.includes('essay') || lowerPrompt.includes('write'))) {
    return "When writing a literary analysis essay, focus on textual evidence that supports your interpretation. Start with a strong thesis statement about the work's themes, characters, or literary devices. Use specific quotations from the text, and explain how they support your argument. Remember to consider the historical and cultural context of the work when relevant.";
  }

  if (subject === 'stem' && lowerPrompt.includes('explain')) {
    return "To explain complex STEM concepts effectively, start with the fundamental principles and build up to more complex ideas. Use analogies to connect abstract concepts to real-world examples. Visual representations like diagrams or graphs can help illustrate relationships between variables. Remember to define specialized terminology and explain how mathematical equations relate to physical phenomena.";
  }

  if (subject === 'humanities' && (lowerPrompt.includes('revolution') || lowerPrompt.includes('history'))) {
    return "Historical events like revolutions are best understood through multiple perspectives and causal factors. Consider economic conditions, social inequalities, intellectual movements, and specific triggering events. Primary sources from the period provide invaluable insights into how people experienced these changes. When analyzing historical events, avoid presentism by understanding the context and values of the time period.";
  }

  if (subject === 'research' && lowerPrompt.includes('research')) {
    return "Effective research design begins with a clear research question and appropriate methodology. Qualitative research explores in-depth experiences and meanings, while quantitative research tests hypotheses with numerical data. Mixed methods combine both approaches. Consider ethical implications, sampling strategies, and potential biases. Your literature review should identify gaps in existing research that your study addresses.";
  }

  // Default response
  return "That's an interesting academic question. To provide the most helpful response, I'd need more information about the specific subject area and the particular aspects you're exploring. Could you provide more details about what you're working on?";
}

export function formatCitation(
  style: CitationStyle,
  source: {
    authors?: string;
    title?: string;
    publication?: string;
    year?: string;
    publisher?: string;
    location?: string;
    pages?: string;
    url?: string;
    doi?: string;
  }
): string {
  const { authors, title, publication, year, publisher, location, pages, url, doi } = source;
  
  switch (style) {
    case 'APA':
      return `${authors || '[Author]'}. (${year || '[Year]'}). ${title || '[Title]'}. ${publisher ? `${publisher}.` : ''} ${doi ? `https://doi.org/${doi}` : url || ''}`;
    
    case 'MLA':
      return `${authors || '[Author]'}. "${title || '[Title]'}." ${publication ? `${publication}, ` : ''}${publisher ? `${publisher}, ` : ''}${year || '[Year]'}${pages ? `, pp. ${pages}` : ''}.`;
    
    case 'Chicago':
      return `${authors || '[Author]'}, ${title || '[Title]'} (${location ? `${location}: ` : ''}${publisher ? `${publisher}, ` : ''}${year || '[Year]'})${pages ? `, ${pages}` : ''}.`;
    
    case 'Harvard':
      return `${authors || '[Author]'} (${year || '[Year]'}). ${title || '[Title]'}. ${location ? `${location}: ` : ''}${publisher || '[Publisher]'}${pages ? `, p.${pages}` : ''}.`;
    
    default:
      return 'Please select a citation style and fill in the source information.';
  }
}

export function useScrollToBottom() {
  const ref = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  };
  
  return { ref, scrollToBottom };
}
