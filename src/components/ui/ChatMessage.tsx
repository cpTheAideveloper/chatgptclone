import React from "react";
import { Message } from "@/types";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  // Use current time as default timestamp if none is provided
  const timestamp =  new Date();
  
  return (
    <div
      className={`flex items-end gap-2 mb-4 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 ${isUser ? "ml-2" : "mr-2"}`}>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
          isUser ? "bg-blue-500" : "bg-gray-300"
        }`}>
          {isUser ? (
            <User size={16} className="text-white" />
          ) : (
            <Bot size={16} className="text-gray-700" />
          )}
        </div>
      </div>

      {/* Message bubble */}
      <div
        className={`relative max-w-xs px-4 py-2 rounded-2xl ${
          isUser 
            ? "bg-blue-500 text-white rounded-tr-none" 
            : "bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200"
        }`}
      >
        <p className="text-sm">{message.content}</p>
        
        {/* Timestamp for user messages */}
        {isUser && (
          <div className="flex items-center justify-end mt-1">
            <span className="text-xs text-blue-100">
              {timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        )}
      </div>
      
      {/* Timestamp for bot messages */}
      {!isUser && (
        <div className="text-xs text-gray-500 self-start mt-1">
          {timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      )}
    </div>
  );
}