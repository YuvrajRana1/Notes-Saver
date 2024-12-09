import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Import the dedicated CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-link">
          Home
        </NavLink>
        <NavLink to="/pastes" className="navbar-link">
          Paste
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;


