import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../slices/chatSlice";
import { getAIResponse } from "../services/openai";
import { FiSend } from "react-icons/fi";

const MainContent = () => {
  const [input, setInput] = useState("");
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    dispatch(addMessage(userMessage));

    try {
      const aiResponse = await getAIResponse(input);
      const aiMessage = { text: aiResponse, sender: "ai" };
      dispatch(addMessage(aiMessage));
    } catch (error) {
      console.error("Error getting AI response:", error);
    }

    setInput("");
  };

  return (
    <main className="flex-1 p-6 bg-gray-50 flex flex-col justify-between">
      <div className="flex-1">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold">Chat</h3>
          <div className="mt-4 flex flex-col space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  msg.sender === "user" ? "bg-blue-100 self-end" : "bg-gray-100"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-3 border border-gray-300 rounded-l-lg"
        />
        <button
          onClick={handleSend}
          className="p-3 bg-purple-600 text-white rounded-r-lg"
        >
          <FiSend />
        </button>
      </div>
      <footer className="text-center text-gray-500">
        Superpage AI Chat V1.2
      </footer>
    </main>
  );
};

export default MainContent;
