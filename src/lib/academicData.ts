
export type CitationStyle = 'APA' | 'MLA' | 'Chicago' | 'Harvard';

export type AcademicSubject = {
  id: string;
  name: string;
  description: string;
};

export const academicSubjects: AcademicSubject[] = [
  {
    id: 'general',
    name: 'General',
    description: 'General academic inquiries and assistance'
  },
  {
    id: 'literature',
    name: 'Literature & Writing',
    description: 'Essay structure, literary analysis, creative writing'
  },
  {
    id: 'stem',
    name: 'STEM',
    description: 'Mathematics, physics, chemistry, biology, computer science'
  },
  {
    id: 'humanities',
    name: 'Humanities & Social Sciences',
    description: 'History, philosophy, psychology, sociology, economics'
  },
  {
    id: 'research',
    name: 'Research Methods',
    description: 'Research design, data analysis, methodology'
  }
];

export const citationStyles: Record<CitationStyle, { name: string; example: string }> = {
  APA: {
    name: 'APA (7th edition)',
    example: 'Author, A. A. (Year). Title of work. Publisher. DOI or URL'
  },
  MLA: {
    name: 'MLA (9th edition)',
    example: 'Author. "Title of Source." Title of Container, Other contributors, Version, Number, Publisher, Publication Date, Location.'
  },
  Chicago: {
    name: 'Chicago (17th edition)',
    example: 'Author, Title of Book (Place of publication: Publisher, Year), page number.'
  },
  Harvard: {
    name: 'Harvard',
    example: 'Author, Initial. (Year). Title of book. City: Publisher, p.page number.'
  }
};

export type SampleQuery = {
  subject: string;
  text: string;
};

export const sampleQueries: SampleQuery[] = [
  { subject: 'general', text: 'How do I structure an academic argument?' },
  { subject: 'literature', text: 'Analyze the themes in Shakespeare\'s Hamlet' },
  { subject: 'stem', text: 'Explain the concept of quantum entanglement' },
  { subject: 'humanities', text: 'What caused the French Revolution?' },
  { subject: 'research', text: 'How to design a qualitative research study?' }
];
