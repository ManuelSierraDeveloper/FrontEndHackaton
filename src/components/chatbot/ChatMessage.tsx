'use client';

import React from 'react';
import { ChatMessage as ChatMessageType } from '@/services/chatbot.service';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
      data-testid={`chat-message-${message.id}`}
    >
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-900 rounded-bl-none'
        }`}
      >
        <p className="text-sm">{message.content}</p>

        {message.metadata?.toolsUsed && message.metadata.toolsUsed.length > 0 && (
          <div className="mt-2 text-xs opacity-75">
            <span className="font-semibold">Herramientas:</span>{' '}
            {message.metadata.toolsUsed.join(', ')}
          </div>
        )}

        <span className="text-xs opacity-75 mt-1 block">
          {message.timestamp.toLocaleTimeString('es-CO')}
        </span>
      </div>
    </div>
  );
};
