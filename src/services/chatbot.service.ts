import { ApiException } from '@/lib/api-client';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    toolsUsed?: string[];
    sources?: string[];
  };
}

export interface ChatRequest {
  message: string;
  conversationHistory?: ChatMessage[];
}

export interface ChatResponse {
  response: string;
  sources?: string[];
  toolsUsed?: string[];
}

class ChatbotService {
  private readonly N8N_WEBHOOK_URL =
    process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
    'https://n8n-production.up.railway.app/webhook/agrotrace-chatbot';

  private readonly TIMEOUT = 30000; // 30 seconds

  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), this.TIMEOUT);

      const response = await fetch(this.N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: request.message,
          conversationHistory: request.conversationHistory || [],
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const error = await response.text();
        throw new Error(
          `Chatbot error: ${response.statusText} - ${error}`
        );
      }

      const data = await response.json();
      return {
        response: data.response || data.output || 'Sin respuesta',
        sources: data.sources,
        toolsUsed: data.toolsUsed,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Chatbot request timeout - took more than 30 seconds');
        }
        throw error;
      }
      throw new Error('Chatbot request failed');
    }
  }

  async clearHistory(): Promise<void> {
    // Optional: Clear conversation history on backend if supported
    // For now, this is client-side only
  }
}

export const chatbotService = new ChatbotService();
