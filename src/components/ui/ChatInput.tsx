"use client";

import { useState, useRef, useEffect } from "react";
import { Settings, Send, Mic, Paperclip, X } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  onOpenSettings: () => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, onOpenSettings, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClear = () => {
    setMessage("");
    inputRef.current?.focus();
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, this would start/stop voice recording
  };

  // Focus input on initial load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className=" flex flex-col max-w-4xl  mx-auto w-full">
      {/* Input container with Material Design-inspired elevation */}
      <div
        className={`
          flex items-center border border-black/10 p-3 mx-4   rounded-t-3xl
          bg-white dark:bg-gray-800
          shadow-md transition-all duration-200
          ${isFocused ? "shadow-xl " : ""}
        `}
      >
        {/* Attachment button */}
        <button
          className="p-2 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Add attachment"
        >
          <Paperclip size={20} />
        </button>

        {/* Input wrapper */}
        <div className="relative flex-1 mx-2">
          <textarea
            ref={inputRef}
            className="w-full px-3 py-2 bg-transparent border-none focus:outline-none dark:text-white placeholder-gray-400"
            placeholder="Type a message..."
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
          />

          {/* Clear button - only show when text is present */}
          {message && (
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              onClick={handleClear}
              aria-label="Clear input"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Action buttons container */}
        <div className="flex items-center">
          {/* Voice button */}
          <button
            className={`
              p-2 mr-1 rounded-full transition-colors
              ${
                isRecording
                  ? "text-red-500 bg-red-100 dark:bg-red-900 animate-pulse"
                  : "text-gray-500 hover:text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              }
            `}
            onClick={toggleRecording}
            aria-label={isRecording ? "Stop recording" : "Start recording"}
          >
            <Mic size={20} />
          </button>

          {/* Settings button */}
          <button
            className="p-2 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 mr-1"
            onClick={onOpenSettings}
            aria-label="Open settings"
          >
            <Settings size={20} />
          </button>

          {/* Send button - changes appearance based on whether there's a message */}
          <button
            className={`
              p-2 rounded-full transition-all
              ${
                message.trim()
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-200 text-gray-400 dark:bg-gray-700 cursor-not-allowed"
              }
            `}
            onClick={handleSend}
            disabled={!message.trim()}
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
