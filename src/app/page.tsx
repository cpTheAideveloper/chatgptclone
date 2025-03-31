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
  const [systemConfigurations, setSystemConfigurations] = useState('you are a helpful assistant');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle window resize to adapt config panel behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && configOpen) {
        // Close panel when switching to mobile
        setConfigOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [configOpen]);

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
          systemConfigurations
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
    <div className="min-h-screen  flex">
      {/* Main chat container */}
      <div className={`flex-1 flex flex-col h-screen transition-all duration-300 ease-in-out ${configOpen ? "md:mr-80" : "md:mr-0"}`}>
        {/* Chat header */}
      
        
        {/* Messages container */}
        <div 
          ref={chatContainerRef}
          className="flex-1 px-36 overflow-y-auto  p-4"
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
          onSend={handleSendMessage} 
          disabled={loading} 
          onOpenSettings={toggleConfig}
        />
      </div>
      
      {/* Config panel */}
      <div 
        className={`
          fixed md:absolute inset-y-0 right-0 
          md:w-80 bg-white md:bg-gray-50 z-20
          border-l border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${configOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="md:hidden flex items-center p-4 border-b border-gray-200">
          <button 
            className="p-1 rounded-full hover:bg-gray-100 mr-2"
            onClick={toggleConfig}
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
          systemConfigurations={systemConfigurations}
          onSystemConfigurationsChange={setSystemConfigurations}
        />
      </div>
    </div>
  );
}