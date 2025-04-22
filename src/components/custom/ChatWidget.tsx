"use client";

import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { usePathname } from "next/navigation";
type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const locale = usePathname()?.split("/")[1] ?? "en";

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: "user", content: input };
    setMessages([...messages, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`/${locale}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        newMessage,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Error sending message", error);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-16 right-2 flex flex-col items-end z-10">
      {/* Small Bar (Collapsed Chat) */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="flex items-center group gap-2 bg-[#07153b] border border-white cursor-pointer text-white 
          px-4 py-2 rounded-full shadow-lg hover:bg-white hover:text-[#07153b] hover:-translate-y-1 duration-300 transition-all"
        >
          <MessageSquare size={18} />
          <span className="text-white group-hover:text-[#07153b]">
            Ask me anything...
          </span>
        </button>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="w-80 bg-white shadow-lg rounded-md border p-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-lg font-semibold text-[#07153b]">Chat Assistant</h3>
            <button
              onClick={toggleChat}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="h-64 overflow-y-auto p-2">
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-2 text-[#07153b]`}>
                <strong>{msg.role === "user" ? "You" : "Bot"}:</strong>{" "}
                {msg.content}
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border p-2 flex-1 rounded text-[#07153b]"
              placeholder="Type your question..."
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              className="bg-[#07153b] border border-transparent text-white px-4 py-2 rounded hover:bg-white hover:text-[#07153b] hover:border-[#07153b] transition-all duration-300 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
