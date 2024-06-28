import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../slices/chatSlice";
import { getAIResponse } from "../services/openai";
import { FiSend } from "react-icons/fi";

const MainContent = () => {
  const [input, setInput] = useState("");
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-red-500 p-6">
      <div className="flex-1 flex flex-col justify-between items-center w-full">
        <div className="overflow-auto p-4 h-[80vh] w-[90vw] lg:h-[70vh] lg:w-[60vw] bg-white rounded-lg shadow-md">
          {messages.length === 0 ? (
            <div className="p-6 text-center">
              <h3 className="text-lg font-semibold">Get answers in seconds</h3>
              <p className="text-gray-500 mt-4">
                Create and complete tasks using boards
              </p>
              <div className="bg-gray-200 p-4 rounded-lg mt-6">
                <h4 className="font-medium">Search History</h4>
                <p className="text-gray-500">No Questions added</p>
                <p className="text-gray-500">
                  Type your questions below to get fast answers
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-4 flex flex-col space-y-4 overflow-y-auto max-h-full">
              <h3 className="text-lg font-semibold">Chat</h3>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-100 self-end"
                      : "bg-gray-100"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        <div className="flex items-center mt-4 w-[90vw] lg:w-[60vw]">
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
      </div>
      <footer className="text-center text-gray-500 mt-4">
        Superpage AI Chat V1.2
      </footer>
    </main>
  );
};

export default MainContent;
