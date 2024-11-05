import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameState {
  messages: Message[];
  character: Character | null;
  isLoading: boolean;
  addMessage: (message: Message) => void;
  setCharacter: (character: Character) => void;
  setLoading: (loading: boolean) => void;
  resetGame: () => void;
  loadCharacter: (character: Character, messages: Message[]) => void;
}

export interface Message {
  id?: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  characterId?: string;
  createdAt?: Date;
}

export interface Character {
  id?: string;
  name: string;
  class: string;
  background: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      messages: [],
      character: null,
      isLoading: false,
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      setCharacter: (character) => set({ character }),
      setLoading: (loading) => set({ isLoading: loading }),
      resetGame: () => set({ messages: [], character: null }),
      loadCharacter: (character, messages) => set({ character, messages }),
    }),
    {
      name: 'game-storage',
    }
  )
);