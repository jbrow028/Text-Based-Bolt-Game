"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useGameStore } from '@/lib/store';
import { Sword } from 'lucide-react';

const CLASSES = [
  'Warrior',
  'Mage',
  'Rogue',
  'Cleric',
  'Ranger',
  'Paladin',
  'Warlock',
  'Bard',
];

const BACKGROUNDS = [
  'Noble',
  'Soldier',
  'Scholar',
  'Criminal',
  'Merchant',
  'Sailor',
  'Hermit',
  'Outlander',
];

export function CharacterCreation() {
  const [name, setName] = useState('');
  const [characterClass, setCharacterClass] = useState('');
  const [background, setBackground] = useState('');
  const { setCharacter, addMessage } = useGameStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !characterClass || !background) return;

    const character = { name, class: characterClass, background };
    setCharacter(character);

    // Add initial system message
    addMessage({
      role: 'system',
      content: `You are now playing as ${name}, a ${background} ${characterClass}. Your adventure begins...`,
    });

    // Add initial game master message
    addMessage({
      role: 'assistant',
      content: `Welcome, brave ${name}! As a ${background} turned ${characterClass}, your journey begins in a world of magic and mystery. What would you like to do?`,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="flex items-center gap-2 justify-center">
          <Sword className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-center">Create Your Character</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Character Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your character's name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Class</label>
            <Select
              value={characterClass}
              onValueChange={setCharacterClass}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your class" />
              </SelectTrigger>
              <SelectContent>
                {CLASSES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Background</label>
            <Select value={background} onValueChange={setBackground} required>
              <SelectTrigger>
                <SelectValue placeholder="Select your background" />
              </SelectTrigger>
              <SelectContent>
                {BACKGROUNDS.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Begin Adventure
          </Button>
        </form>
      </Card>
    </div>
  );
}