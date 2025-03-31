import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, Paperclip, Smile } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function ChatInput({
  onSendMessage,
  placeholder = "Type your message...",
  disabled = false
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea as content grows
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "0px";
      const scrollHeight = inputRef.current.scrollHeight;
      inputRef.current.style.height = Math.min(scrollHeight, 120) + "px";
    }
  }, [input]);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`flex items-end p-2 ${isFocused ? "bg-gray-50" : "bg-white"} border-t border-gray-200 transition-colors duration-200`}>
      {/* Attachment button */}
      <button 
        className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-150"
        aria-label="Add attachment"
      >
        <Paperclip size={20} />
      </button>
      
      {/* Input area */}
      <div className={`relative flex-1 mx-2 ${isFocused ? "bg-white" : "bg-gray-100"} rounded-2xl border ${isFocused ? "border-blue-400" : "border-transparent"} transition-colors duration-200`}>
        <textarea
          ref={inputRef}
          className="w-full px-4 py-3 bg-transparent text-gray-900 resize-none overflow-hidden outline-none text-base"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
        />
        
        {/* Emoji button */}
        <button 
          className="absolute right-2 bottom-2 p-1 rounded-full text-gray-500 hover:text-gray-700 transition-colors duration-150"
          aria-label="Add emoji"
        >
          <Smile size={20} />
        </button>
      </div>
      
      {/* Send or mic button */}
      {input.trim() ? (
        <button
          className={`p-3 rounded-full ${
            disabled
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
          } text-white transition-colors duration-150`}
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          aria-label="Send message"
        >
          <Send size={18} className="fill-current" />
        </button>
      ) : (
        <button
          className="p-3 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors duration-150"
          aria-label="Voice message"
        >
          <Mic size={20} />
        </button>
      )}
    </div>
  );
}