import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChatProvider } from "./context/ChatContext";
import ChatInterface from "./components/ChatInterface";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <ChatProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ChatInterface />} />
        </Routes>
      </Router>
    </ChatProvider>
  );
}

export default App;
