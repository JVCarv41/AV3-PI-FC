import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserHeader.css";

function UserHeader() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("authToken");
    navigate("/");
  }
  function handleHome(){
    navigate("/shopping-list")
  }

  return (
    <div className="user-header">
      <header>
        <div className="user-header-text">
          <h1>TS-Market</h1>
          <h2>Your Shopping Lists, Online</h2>
        </div>
        <section>
          <button className="user-header-button" onClick={handleHome}>Home</button>
          <button className="user-header-button" onClick={handleLogout}>Logout</button>
        </section>
      </header>
    </div>
  );
}

export default UserHeader;