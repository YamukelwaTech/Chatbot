import React from "react";
import { FiSend } from "react-icons/fi";

const MainContent = () => {
  return (
    <main className="flex-1 p-6 bg-gray-50 flex flex-col justify-between">
      <div className="flex-1">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold">Search History</h3>
          <div className="mt-4 flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Chat icon"
                className="mx-auto mb-4"
              />
              <p className="text-gray-600">No Questions added</p>
              <p className="text-gray-500">
                Type your questions to the input below and get fast answers
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Write Coding about new HTML Tags"
          className="flex-1 p-3 border border-gray-300 rounded-l-lg"
        />
        <button className="p-3 bg-purple-600 text-white rounded-r-lg">
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
