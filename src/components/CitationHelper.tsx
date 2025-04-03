
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { citationStyles, type CitationStyle } from '@/lib/academicData';
import { formatCitation } from '@/lib/chatUtils';

const CitationHelper: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState<CitationStyle>('APA');
  const [sourceData, setSourceData] = useState({
    authors: '',
    title: '',
    publication: '',
    year: '',
    publisher: '',
    location: '',
    pages: '',
    url: '',
    doi: ''
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setSourceData(prev => ({ ...prev, [field]: value }));
  };

  const formatAndCopy = () => {
    const citation = formatCitation(selectedStyle, sourceData);
    navigator.clipboard.writeText(citation)
      .then(() => {
        toast.success('Citation copied to clipboard');
        setIsOpen(false);
      })
      .catch(() => toast.error('Failed to copy citation'));
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="bg-academic-cream text-academic-navy border-academic-navy/20 hover:bg-academic-navy hover:text-white">
          Citation Helper
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] md:w-[450px] p-4">
        <h3 className="font-serif text-lg font-semibold mb-3 text-academic-navy">Format Citations</h3>
        
        <Tabs defaultValue={selectedStyle} onValueChange={(value) => setSelectedStyle(value as CitationStyle)}>
          <TabsList className="grid grid-cols-4 mb-4">
            {Object.keys(citationStyles).map((style) => (
              <TabsTrigger key={style} value={style} className="text-xs md:text-sm">
                {style}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.entries(citationStyles).map(([style, { example }]) => (
            <TabsContent key={style} value={style}>
              <div className="text-xs text-gray-600 mb-4 italic">
                Format: {example}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="space-y-3 mb-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="authors" className="text-sm">Author(s)</Label>
              <Input 
                id="authors" 
                value={sourceData.authors}
                onChange={(e) => handleInputChange('authors', e.target.value)}
                placeholder="e.g., Smith, J. A."
                className="h-8"
              />
            </div>
            <div>
              <Label htmlFor="year" className="text-sm">Year</Label>
              <Input 
                id="year" 
                value={sourceData.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                placeholder="e.g., 2023"
                className="h-8"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="title" className="text-sm">Title</Label>
            <Input 
              id="title" 
              value={sourceData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Title of article or book"
              className="h-8"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="publication" className="text-sm">Journal/Publication</Label>
              <Input 
                id="publication" 
                value={sourceData.publication}
                onChange={(e) => handleInputChange('publication', e.target.value)}
                placeholder="e.g., Journal of Science"
                className="h-8"
              />
            </div>
            <div>
              <Label htmlFor="publisher" className="text-sm">Publisher</Label>
              <Input 
                id="publisher" 
                value={sourceData.publisher}
                onChange={(e) => handleInputChange('publisher', e.target.value)}
                placeholder="e.g., Oxford University Press"
                className="h-8"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="location" className="text-sm">Location</Label>
              <Input 
                id="location" 
                value={sourceData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., New York, NY"
                className="h-8"
              />
            </div>
            <div>
              <Label htmlFor="pages" className="text-sm">Pages</Label>
              <Input 
                id="pages" 
                value={sourceData.pages}
                onChange={(e) => handleInputChange('pages', e.target.value)}
                placeholder="e.g., 45-67"
                className="h-8"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="url" className="text-sm">URL/Website</Label>
            <Input 
              id="url" 
              value={sourceData.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              placeholder="e.g., https://example.com/article"
              className="h-8"
            />
          </div>
          
          <div>
            <Label htmlFor="doi" className="text-sm">DOI</Label>
            <Input 
              id="doi" 
              value={sourceData.doi}
              onChange={(e) => handleInputChange('doi', e.target.value)}
              placeholder="e.g., 10.1000/xyz123"
              className="h-8"
            />
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsOpen(false)}
            className="text-academic-navy border-academic-navy/20"
          >
            Cancel
          </Button>
          <Button 
            size="sm" 
            onClick={formatAndCopy}
            className="bg-academic-navy hover:bg-academic-navy/80 text-white"
          >
            Format & Copy
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CitationHelper;
