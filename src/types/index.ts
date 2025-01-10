// src/types/index.ts
export interface Message {
    role: 'user' | 'assistant';
    content: string;
  }
  
  export interface ChatRequest {
    messages: Message[];
    model?: string;
    temperature?: number;
  }
  
  export interface ChatResponse {
    response: string;
    error?: string;
  }