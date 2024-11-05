import { GameInterface } from '@/components/game-interface';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/80 flex flex-col items-center">
      <div className="w-full max-w-4xl p-4 md:p-8 flex-1 flex flex-col">
        <GameInterface />
      </div>
    </main>
  );
}