interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const responses = [
  "I'm sorry, but I'm a mock AI assistant. I can't provide real answers at the moment.",
  "The OpenAI service is currently unavailable. This is a placeholder response.",
  "I'm a temporary stand-in for the AI. The real service will be back soon!",
  "Apologies, but I'm not connected to the OpenAI API right now. I can only provide pre-written responses.",
  "I'm afraid I can't give you a proper answer right now. I'm just a mock service.",
];

export function getMockResponse(messages: Message[]): string {
  const lastMessage = messages[messages.length - 1];
  console.log('Last user message:', lastMessage.content);
  
  return responses[Math.floor(Math.random() * responses.length)];
}

