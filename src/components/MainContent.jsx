import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../slices/chatSlice";
import { getAIResponse } from "../services/openai";
import { FiSend } from "react-icons/fi";

const MainContent = () => {
  const [input, setInput] = useState("");
  const [hasSentMessage, setHasSentMessage] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    dispatch(addMessage(userMessage));
    setHasSentMessage(true);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col items-center justify-between h-screen p-6">
      <div className="flex-1 flex flex-col items-center w-full">
        {!hasSentMessage && (
          <div className="w-full lg:w-[80%] text-left mb-2 pl-4">
            <h3 className="text-lg font-semibold">Get answers in seconds</h3>
            <p className="text-gray-500">
              Create and complete tasks using boards
            </p>
          </div>
        )}
        <div className="flex flex-col justify-between items-center w-full flex-grow">
          {!hasSentMessage ? (
            <div className="h-[35vh] w-[90vw] lg:w-[60vw] border p-6 rounded-lg shadow-md mt-2 mb-4 flex flex-col justify-between items-center">
              <div className="self-start">
                <h4 className="font-medium">Search History</h4>
              </div>
              <div className="flex-grow flex items-center justify-center">
                <img
                  src="path/to/your/image.jpg"
                  alt="Your"
                  className="max-h-full max-w-full"
                />
              </div>
              <div className="text-center">
                <p className="text-gray-500 font-semibold">
                  No Questions added
                </p>
                <p className="text-gray-500">
                  Type your questions below to get fast answers
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-auto p-4 h-[70vh] w-[90vw] lg:h-[70vh] lg:w-[60vw] bg-white rounded-lg shadow-md">
              <div className="mt-4 flex flex-col space-y-4 overflow-y-auto max-h-full">
                <h3 className="text-lg font-semibold">Chat</h3>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-1 rounded-lg ${
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
            </div>
          )}
        </div>
        <div className="relative mt-4 w-[80vw] lg:w-[60vw] flex flex-col space-y-2">
          {showButtons && (
            <div className="flex space-x-6">
              <button className="text-xs bg-gray-200 rounded px-2 py-1">
                Write Js code for it
              </button>
              <button className="text-xs bg-gray-200 rounded px-2 py-1">
                Explain more
              </button>
              <button className="text-xs bg-gray-200 rounded px-2 py-1">
                Explain more
              </button>
              <button className="text-xs bg-gray-200 rounded px-2 py-1">
                Explain more
              </button>
              <button className="text-xs bg-gray-200 rounded px-2 py-1">
                Explain more
              </button>
            </div>
          )}
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Write Coding about new HTML Tags"
              className="flex-1 p-3 border border-purple-400 rounded-lg w-full pr-12"
            />
            <button
              onClick={handleSend}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2"
            >
              <FiSend />
            </button>
          </div>
        </div>
      </div>
      <footer className="text-center text-gray-500 mt-4 font-medium text-sm">
        Superpage AI Chat V1.2
      </footer>
    </main>
  );
};

export default MainContent;
