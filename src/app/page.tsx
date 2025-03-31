"use client";

import React, { useState, useEffect, useRef } from "react";
import ConfigPanel from "@/components/ui/ConfigPanel";
import ChatMessage from "@/components/ui/ChatMessage";
import ChatInput from "@/components/ui/ChatInput";
import { Message } from "@/types";
import { Menu, ArrowLeft, Settings } from "lucide-react";
import LoadingIndicator from "@/components/ui/LoadingSpinner";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini");
  const [temperature, setTemperature] = useState(0.7);
  const [configOpen, setConfigOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (message: string) => {
    const userMessage: Message = { 
      role: "user", 
      content: message,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          model: selectedModel,
          temperature,
        }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      const botMessage: Message = { 
        role: "assistant", 
        content: data.response,
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't process your request. Please try again.",
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleConfig = () => {
    setConfigOpen(!configOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Main chat container */}
      <div className={`flex-1 flex flex-col h-screen transition-all duration-300 ${configOpen ? "md:mr-0" : ""}`}>
        {/* Chat header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              className="p-1 rounded-full hover:bg-gray-100 mr-2 md:hidden"
              onClick={toggleConfig}
            >
              {configOpen ? <ArrowLeft size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="font-semibold text-lg">AI Chat</h1>
          </div>
          <div className="flex items-center">
            <button 
              className="p-2 rounded-full hover:bg-gray-100 hidden md:block"
              onClick={toggleConfig}
              aria-label="Toggle settings panel"
            >
              <Settings size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
        
        {/* Messages container */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto bg-white md:bg-gray-50 p-4"
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Settings size={24} className="text-blue-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Start a conversation</h3>
              <p className="text-gray-500 max-w-sm">
                Ask a question or start a conversation with the AI assistant.
              </p>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {loading && <LoadingIndicator />}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat input */}
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={loading} 
          placeholder="Message AI..." 
        />
      </div>
      
      {/* Config panel - slide in on mobile, fixed on desktop */}
      <div 
        className={`fixed md:static inset-0 bg-white md:bg-gray-50 z-10 transform transition-transform duration-300 ease-in-out border-l border-gray-200 ${
          configOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        } md:block ${configOpen ? "block" : "hidden"}`}
      
      >
        <div className="md:hidden flex items-center p-4 border-b border-gray-200">
          <button 
            className="p-1 rounded-full hover:bg-gray-100 mr-2"
            onClick={() => setConfigOpen(false)}
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="font-semibold">Settings</h2>
        </div>
        <ConfigPanel
          selectedModel={selectedModel}
          temperature={temperature}
          onModelChange={setSelectedModel}
          onTemperatureChange={setTemperature}
        />
      </div>
    </div>
  );
}