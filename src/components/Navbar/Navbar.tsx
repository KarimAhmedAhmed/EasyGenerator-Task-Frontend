import React from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    authService.removeToken();

    navigate("/signin");
  };
  console.log("isAuthenticated", authService.getToken());

  if (authService.getToken()) {
    return (
      <nav>
        <ul>
          <li>
            <button onClick={handleSignOut}>Sign Out</button>
          </li>
        </ul>
      </nav>
    );
  } else {
    return <div></div>;
  }
};

export default Navbar;
