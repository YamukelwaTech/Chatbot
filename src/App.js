import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { fetchUser } from "./slices/authSlice";
import loadIcon from "./assets/Load icon 4404742.png";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUser());
    } else {
      dispatch({ type: "auth/fetchUser/rejected" });
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img
          src={loadIcon}
          alt="Loading..."
          className="w-1/2 max-w-xs animate-spin-slow"
        />
      </div>
    );
  }

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
