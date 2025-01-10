import React from "react";
import { Message } from "@/types";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      } my-2`}
    >
      <div
        className={`max-w-md px-4 py-2 rounded-lg ${
          message.role === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
