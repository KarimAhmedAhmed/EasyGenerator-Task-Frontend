import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignIn from "./components/Auth/SignIn/signIn";
import SignUp from "./components/Auth/SignUp/signUp";
import Home from "./components/Home/Home";
import authService from "./services/authService";
import Navbar from "./components/Navbar/Navbar";

const App: React.FC = () => {
  const isAuthenticated = authService.getToken();
  console.log("isAuthenticated", isAuthenticated);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {authService.getToken() ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="*" element={<Navigate to="/signin" replace={true} />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
