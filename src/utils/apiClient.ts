import { ChatRequest, ChatResponse } from "@/types";

export const sendMessage = async (data: ChatRequest): Promise<ChatResponse> => {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error in API request.");
  }

  return res.json();
};
