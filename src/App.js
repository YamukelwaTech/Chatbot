import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {isAuthenticated ? (
          <Route
            path="/"
            element={
              <div className="flex flex-col lg:flex-row h-screen">
                <Sidebar />
                <div className="flex flex-col flex-1">
                  <Header />
                  <MainContent />
                </div>
              </div>
            }
          />
        ) : (
          <Route path="*" element={<Navigate to="/signup" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
