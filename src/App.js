import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MainContent from "./components/MainContent";

function App() {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <MainContent />
      </div>
    </div>
  );
}

export default App;
