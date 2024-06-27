import React, { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { fetchAIResponse } from "../services/api";

const ChatInterface = () => {
  const { messages, addMessage } = useContext(ChatContext);
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      addMessage({ user: "You", text: input });
      const response = await fetchAIResponse(input);
      addMessage({ user: "AI", text: response });
      setInput("");
    }
  };

  return (
    <div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.user === "AI" ? "ai" : "user"}`}
          >
            <strong>{msg.user}</strong>: {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Type your message..."
        />
        <button type="submit" className="btn-primary ml-2">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
