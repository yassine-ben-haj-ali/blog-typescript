import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { logout } from "../config/Api";

const Header = () => {
  const handleLogout = async () => {
    await logout();
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light p-3"
      style={{ position: "sticky", top: 0, left: 0, zIndex: 9 }}
    >
      <Link className="navbar-brand" to="/">
        BlogDev
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <Search />
        <ul>
          <li>
            <button onClick={handleLogout}>logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
