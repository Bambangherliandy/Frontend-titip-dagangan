import { useState } from "react";
import axios from "axios";
import BaseUrl from "../constant/Url";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Halo! Saya asisten TitipDagangan. Ada yang bisa saya bantu? 😊",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("access_token");
      const { data } = await axios.post(
        `${BaseUrl}/chat`,
        { message: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Maaf, saya sedang tidak bisa membantu. Coba lagi nanti.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {open && (
        <div className="mb-4 w-80 bg-white rounded-2xl shadow-2xl border flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-green-600 text-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-lg">🤖</span>
              <div>
                <p className="font-bold text-sm">TitipDagangan Assistant</p>
                <p className="text-xs text-green-100">Online</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:text-green-200 text-lg"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-80">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-green-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-500 px-3 py-2 rounded-2xl rounded-bl-none text-sm">
                  Mengetik...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik pesan..."
              className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-500"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-green-600 text-white px-3 py-2 rounded-xl text-sm disabled:opacity-50 hover:bg-green-700"
            >
              Kirim
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-green-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-green-700 transition"
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}
