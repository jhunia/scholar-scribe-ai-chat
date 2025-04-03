
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Key, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ApiKeyManager = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [hasStoredKey, setHasStoredKey] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if API key is stored in localStorage
    const storedKey = localStorage.getItem('openai_api_key');
    setHasStoredKey(!!storedKey);
    if (storedKey) {
      // Mask the key except for the last 4 characters
      const maskedKey = `...${storedKey.slice(-4)}`;
      setApiKey(maskedKey);
    }
  }, []);

  const handleSaveKey = () => {
    if (!apiKey.trim() || apiKey.startsWith('...')) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem('openai_api_key', apiKey);
    setHasStoredKey(true);
    
    toast({
      title: "Success",
      description: "API key saved successfully",
      variant: "default"
    });
    
    setDialogOpen(false);
  };

  const handleRemoveKey = () => {
    localStorage.removeItem('openai_api_key');
    setApiKey('');
    setHasStoredKey(false);
    
    toast({
      title: "Removed",
      description: "API key has been removed",
      variant: "default"
    });
    
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline"
          size="sm"
          className={`flex items-center gap-2 ${hasStoredKey ? 'text-green-600 border-green-200' : 'text-amber-600 border-amber-200'}`}
        >
          {hasStoredKey ? (
            <>
              <CheckCircle className="h-4 w-4" />
              <span>API Key Set</span>
            </>
          ) : (
            <>
              <Key className="h-4 w-4" />
              <span>Set API Key</span>
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>OpenAI API Key</DialogTitle>
          <DialogDescription>
            Enter your OpenAI API key to use the AI features. Your key is stored only in your browser.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Input
            placeholder="Enter your OpenAI API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            type="password"
          />
          <p className="text-xs text-gray-500">
            Your API key is stored locally in your browser and never sent to our servers.
            Get an API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-academic-navy underline">OpenAI</a>.
          </p>
        </div>
        <DialogFooter className="flex flex-row justify-between sm:justify-between">
          {hasStoredKey && (
            <Button variant="outline" onClick={handleRemoveKey} className="text-red-600">
              Remove Key
            </Button>
          )}
          <Button onClick={handleSaveKey}>Save Key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyManager;
