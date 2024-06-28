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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
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
        <div className="w-full text-left mb-6 bg-orange-700 pl-9">
          <h3 className="text-lg font-semibold">Get answers in seconds</h3>
          <p className="text-gray-500">Create and complete tasks using boards</p>
        </div>
        <div className="overflow-auto p-4 h-[70vh] w-[90vw] lg:h-[70vh] lg:w-[60vw] bg-white rounded-lg shadow-md">
          {messages.length === 0 ? (
            <div className="h-1/2 bg-yellow-500 p-6 rounded-lg shadow-md mb-6 flex flex-col justify-center items-center">
              <h4 className="font-medium">Search History</h4>
              <p className="text-gray-500">No Questions added</p>
              <p className="text-gray-500">
                Type your questions below to get fast answers
              </p>
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
        <div className="relative mt-4 w-[90vw] lg:w-[60vw]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-300 rounded-lg w-full pr-12"
          />
          <button
            onClick={handleSend}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-purple-600 text-white rounded-full"
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
