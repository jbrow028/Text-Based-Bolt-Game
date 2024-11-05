"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { useGameStore } from '@/lib/store';
import { CharacterCreation } from '@/components/character-creation';
import { GameMessage } from '@/components/game-message';
import { Sword, Send, RotateCcw } from 'lucide-react';

export function GameInterface() {
  const [input, setInput] = useState('');
  const { messages, character, isLoading, addMessage, setLoading, resetGame } =
    useGameStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input } as const;
    addMessage(userMessage);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          character,
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      addMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
      addMessage({
        role: 'assistant',
        content: "I apologize, but I've encountered an error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!character) {
    return <CharacterCreation />;
  }

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sword className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">AI Text Adventure</h1>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={resetGame}
          className="h-8 w-8"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <Card className="flex-1 p-4">
        <ScrollArea className="h-[60vh]">
          <div className="flex flex-col gap-4 pb-4">
            {messages.map((message, index) => (
              <GameMessage key={index} message={message} />
            ))}
            {isLoading && (
              <div className="flex gap-1 animate-pulse">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="w-2 h-2 bg-primary rounded-full" />
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What would you like to do?"
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          <Send className="w-4 h-4 mr-2" />
          Send
        </Button>
      </form>
    </div>
  );
}