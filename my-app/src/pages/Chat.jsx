
import { useState } from "react";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "AI",
      text: "Hello! How can I assist you today?"
    }
  ]);

  async function sendMessage(e) {
    e.preventDefault();

    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      { sender: "You", text: userMessage }
    ]);

    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/ai/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

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
          text: "Unable to connect to the server.",
        },
      ]);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Shopping Assistant</h1>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "350px",
          overflowY: "auto",
          marginBottom: "20px",
        }}
      >
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ width: "75%", padding: "10px" }}
        />

        <button
          type="submit"
          style={{ marginLeft: "10px", padding: "10px 20px" }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;