
import React from 'react';
import { cn } from '@/lib/utils';
import { academicSubjects } from '@/lib/academicData';

interface SubjectSelectorProps {
  selectedSubject: string;
  onSelectSubject: (subjectId: string) => void;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ 
  selectedSubject, 
  onSelectSubject 
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-serif font-semibold mb-3 text-academic-navy">Select Your Subject Area</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {academicSubjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => onSelectSubject(subject.id)}
            className={cn(
              'p-2 rounded-lg text-sm transition-all duration-200 flex flex-col items-center justify-center text-center h-24',
              selectedSubject === subject.id
                ? 'bg-academic-navy text-white shadow-lg scale-[1.03]'
                : 'bg-white border border-academic-navy/20 text-academic-navy hover:bg-academic-cream'
            )}
          >
            <span className="font-semibold mb-1">{subject.name}</span>
            <span className="text-xs opacity-80 line-clamp-2">{subject.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelector;
