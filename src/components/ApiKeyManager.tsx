
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Key, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Pre-configured API key
const DEFAULT_API_KEY = "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";

const ApiKeyManager = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [hasStoredKey, setHasStoredKey] = useState<boolean>(true); // Default to true since we have a default key
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if API key is stored in localStorage
    const storedKey = localStorage.getItem('openai_api_key');
    
    // If no key is stored, set the default one
    if (!storedKey) {
      localStorage.setItem('openai_api_key', DEFAULT_API_KEY);
      setHasStoredKey(true);
      const maskedKey = `...${DEFAULT_API_KEY.slice(-4)}`;
      setApiKey(maskedKey);
    } else {
      setHasStoredKey(true);
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
    // When removing custom key, set back to default instead of removing completely
    localStorage.setItem('openai_api_key', DEFAULT_API_KEY);
    const maskedKey = `...${DEFAULT_API_KEY.slice(-4)}`;
    setApiKey(maskedKey);
    setHasStoredKey(true);
    
    toast({
      title: "Reset to Default",
      description: "Using the default API key now",
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
          className="flex items-center gap-2 text-green-600 border-green-200"
        >
          <CheckCircle className="h-4 w-4" />
          <span>API Key Set</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>OpenAI API Key</DialogTitle>
          <DialogDescription>
            A default API key is provided, but you can use your own if needed.
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
            A default API key is pre-configured, but you can use your own if needed.
            Keys are stored locally in your browser and never sent to our servers.
          </p>
        </div>
        <DialogFooter className="flex flex-row justify-between sm:justify-between">
          <Button variant="outline" onClick={handleRemoveKey} className="text-amber-600">
            Reset to Default
          </Button>
          <Button onClick={handleSaveKey}>Save Custom Key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyManager;
