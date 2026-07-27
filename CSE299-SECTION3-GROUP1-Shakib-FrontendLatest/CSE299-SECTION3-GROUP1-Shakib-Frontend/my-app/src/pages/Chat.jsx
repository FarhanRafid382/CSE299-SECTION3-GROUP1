import { useState } from "react";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "AI",
      text: "Hello! How can I assist you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();

    const userMessage = message.trim();

    if (!userMessage || isLoading) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        sender: "You",
        text: userMessage,
      },
    ]);

    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/ai/chat/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.details ||
            data.error ||
            "The chatbot request failed."
        );
      }

      if (!data.reply) {
        throw new Error("The chatbot returned an empty reply.");
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text:
            error.message ||
            "Unable to connect to the chatbot server.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-950 py-16">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-indigo-400 font-semibold text-sm uppercase tracking-wide mb-2">
            Support
          </p>

          <h1 className="text-4xl font-bold text-white">
            AI Shopping Assistant
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="border border-gray-100 rounded-3xl shadow-sm h-96 overflow-y-auto p-6 mb-4 space-y-3 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "You"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap ${
                  msg.sender === "You"
                    ? "bg-indigo-600 text-white rounded-br-sm"
                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 text-gray-500 px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm">
                AI is thinking...
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={sendMessage}
          className="flex gap-3"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 border border-gray-200 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
          />

          <button
            type="submit"
            disabled={isLoading || !message.trim()}
            className="bg-gray-950 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;