'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useChatbot } from '@/hooks/useChatbot';
import { ChatMessage } from './ChatMessage';

export interface ChatbotWidgetProps {
  title?: string;
  placeholder?: string;
  onClose?: () => void;
  isOpen?: boolean;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  title = 'AgroTrace Assistant',
  placeholder = 'Pregunta sobre productos, fincas, certificaciones...',
  onClose,
  isOpen = true,
}) => {
  const { messages, isLoading, error, sendMessage, clearMessages } = useChatbot();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [widgetOpen, setWidgetOpen] = useState(isOpen);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    await sendMessage(input);
    setInput('');
  };

  const handleClose = () => {
    setWidgetOpen(false);
    clearMessages();
    onClose?.();
  };

  const handleOpen = () => {
    setWidgetOpen(true);
  };

  if (!widgetOpen) {
    return (
      <button
        onClick={handleOpen}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full w-16 h-16 shadow-2xl hover:shadow-xl transition-shadow flex items-center justify-center text-2xl"
        aria-label="Open chatbot"
        data-testid="chatbot-open-button"
      >
        💬
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-4 right-4 w-96 max-w-[90vw] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col"
      style={{ maxHeight: '600px' }}
      data-testid="chatbot-widget"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 flex justify-between items-center">
        <h2 className="font-semibold text-lg">{title}</h2>
        <button
          onClick={handleClose}
          className="text-white hover:opacity-80 transition"
          aria-label="Close chatbot"
          data-testid="chatbot-close-button"
        >
          ✕
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 text-center">
            <div>
              <p className="font-semibold text-lg">Hola! 👋</p>
              <p className="text-sm mt-2">{placeholder}</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-200 text-gray-900 rounded-lg px-4 py-2 rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border-t border-red-200 px-4 py-2 text-red-700 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
            data-testid="chatbot-input"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 disabled:bg-gray-400 transition font-semibold"
            data-testid="chatbot-send-button"
          >
            {isLoading ? '...' : 'Enviar'}
          </button>
        </div>
      </form>
    </div>
  );
};
