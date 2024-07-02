import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, deleteChatAsync } from "../slices/chatSlice";
import { getAIResponse } from "../services/openai";
import { FiSend } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import bubble from "../assets/Computer Icons Online Chat.png";
import face from "../assets/Man with Glasses Thinking.png";
import { motion, AnimatePresence } from "framer-motion";

const MainContent = () => {
  const [input, setInput] = useState("");
  const [hasSentMessage, setHasSentMessage] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [hasChatHistory, setHasChatHistory] = useState(false);
  const [highlightedChatId, setHighlightedChatId] = useState(null);
  const [showNotice, setShowNotice] = useState(false);
  const [localChatHistory, setLocalChatHistory] = useState([]);

  const messages = useSelector((state) => state.chat.messages);
  const chatHistory = useSelector((state) => state.auth.chatHistory);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setLocalChatHistory(chatHistory);
  }, [chatHistory]);

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

  const checkUserChatHistory = useCallback(() => {
    const userHasHistory = chatHistory && chatHistory.length > 0;
    setHasChatHistory(userHasHistory);
  }, [chatHistory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
      checkUserChatHistory();
    }, 5000);
    return () => clearTimeout(timer);
  }, [checkUserChatHistory]);

  useEffect(() => {
    const noticeTimer = setInterval(() => {
      setShowNotice(true);
      setTimeout(() => setShowNotice(false), 10000); // Show notice for 10 seconds
    }, 60000); // Show every 1 minute
    return () => clearInterval(noticeTimer);
  }, []);

  const clearChatHistory = () => {
    if (localChatHistory.length > 0) {
      const chatId = highlightedChatId || localChatHistory[0].id;
      dispatch(deleteChatAsync(chatId)).then(() => {
        setLocalChatHistory((prevHistory) =>
          prevHistory.filter((chat) => chat.id !== chatId)
        );
      });
    }
  };

  const handleHighlight = (id) => {
    console.log("Highlighted item ID:", id);
    setHighlightedChatId(id);
  };

  const formatTime = (time) => {
    const now = new Date();
    const date = new Date(time);
    const differenceInTime = now.getTime() - date.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    if (differenceInDays === 0) return "today";
    if (differenceInDays === 1) return "yesterday";
    return "a week ago";
  };

  const truncatePrompt = (prompt) => {
    const words = prompt.split(" ");
    if (words.length > 7) {
      return words.slice(0, 7).join(" ") + "...";
    }
    return prompt;
  };

  const ChatHistoryItem = ({ item }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center space-x-4 p-2 border-b border-white ${
        highlightedChatId === item.id ? "bg-purple-100 rounded-md" : ""
      }`}
      onClick={() => handleHighlight(item.id)}
    >
      <img
        src={face}
        alt="User"
        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-400"
      />
      <div className="flex flex-col flex-grow">
        <span className="text-sm font-medium text-black">
          {truncatePrompt(item.prompt)}
        </span>
        <div className="flex justify-between">
          <span className="text-xs text-gray-400">24 Questions asked</span>
          <span className="text-xs text-gray-400">
            {formatTime(item.created_at)}
          </span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <main className="flex flex-col items-center justify-between h-screen p-6">
      <div className="flex-1 flex flex-col items-center w-full">
        {!hasSentMessage && (
          <div className="w-full lg:w-[80%] text-left mb-2 pl-4">
            <motion.h3
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg font-semibold"
            >
              Get answers in seconds
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-500"
            >
              Create and complete tasks using boards
            </motion.p>
          </div>
        )}
        <div className="flex flex-col justify-between items-center w-full flex-grow">
          <AnimatePresence>
            {!hasSentMessage ? (
              hasChatHistory ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="h-[35vh] w-[90vw] lg:w-[60vw] border p-6 rounded-lg shadow-md mt-2 mb-4 flex flex-col justify-between items-center relative"
                >
                  <div className="self-start w-full flex justify-between items-center">
                    <h4 className="font-medium">Search History</h4>
                    <button
                      onClick={clearChatHistory}
                      className="text-xs bg-gray-200 rounded px-2 py-1"
                    >
                      Clear Chat History
                    </button>
                  </div>
                  <div className="mt-4 w-full h-full overflow-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                    {localChatHistory.map((item, index) => (
                      <ChatHistoryItem key={index} item={item} />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="h-[35vh] w-[90vw] lg:w-[60vw] border p-6 rounded-lg shadow-md mt-2 mb-4 flex flex-col justify-between items-center"
                >
                  <div className="self-start">
                    <h4 className="font-medium">Search History</h4>
                  </div>
                  <div className="flex-grow flex items-center justify-center">
                    <img
                      src={bubble}
                      alt="Your"
                      className="w-20 h-20 md:w-24 md:h-24 max-h-full max-w-full"
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
                </motion.div>
              )
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="overflow-auto p-4 h-[70vh] w-[90vw] lg:h-[70vh] lg:w-[60vw] rounded-lg shadow-md custom-scrollbar"
              >
                <div className="mt-4 flex flex-col space-y-4 overflow-y-auto max-h-full">
                  <h3 className="text-lg font-semibold">Chat</h3>
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`p-1 rounded-lg ${
                        msg.sender === "user"
                          ? "bg-blue-100 self-end"
                          : "bg-gray-100"
                      }`}
                    >
                      {msg.text}
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="relative mt-4 w-[80vw] lg:w-[60vw] flex flex-col space-y-2">
          <AnimatePresence>
            {showButtons && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">
                    Chat Suggestions
                  </span>
                </div>
                <div className="flex flex-wrap space-x-2 items-center relative">
                  <button className="text-xs bg-gray-200 rounded px-2 py-1">
                    Write Js code for it
                  </button>
                  <button className="text-xs bg-gray-200 rounded px-2 py-1">
                    Explain more
                  </button>
                  <button className="text-xs bg-gray-200 rounded px-2 py-1 hidden md:inline">
                    Explain more
                  </button>
                  <button className="text-xs bg-gray-200 rounded px-2 py-1 hidden md:inline">
                    Explain more
                  </button>
                  <button
                    onClick={() => setShowButtons(false)}
                    className="p-1 rounded-full border border-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <AiOutlineClose />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
          <AnimatePresence>
            {showNotice && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center mt-2 text-gray-500 text-xs"
              >
                All the results are generated by AI, if you get any wrong
                answers report here
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <footer className="text-center text-gray-500 mt-4 font-medium text-sm">
        Superpage AI Chat V1.2
      </footer>
    </main>
  );
};

export default MainContent;
