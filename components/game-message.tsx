"use client";

import { Message } from '@/lib/store';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { Bot, User } from 'lucide-react';

interface GameMessageProps {
  message: Message;
}

export function GameMessage({ message }: GameMessageProps) {
  const isSystem = message.role === 'system';
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex gap-3 p-4 rounded-lg',
        isSystem
          ? 'bg-muted/50 text-muted-foreground'
          : isUser
          ? 'bg-primary/10'
          : 'bg-muted'
      )}
    >
      <div className="mt-1 flex-shrink-0">
        {isUser ? (
          <User className="h-5 w-5" />
        ) : (
          <Bot className="h-5 w-5 text-primary" />
        )}
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        <ReactMarkdown
          components={{
            p: ({ children }) => <p className="leading-7">{children}</p>,
            ul: ({ children }) => (
              <ul className="my-2 ml-6 list-disc">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="my-2 ml-6 list-decimal">{children}</ol>
            ),
            li: ({ children }) => <li className="mt-2">{children}</li>,
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}