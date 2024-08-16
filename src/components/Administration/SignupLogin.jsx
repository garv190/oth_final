import React from 'react';
import { Link } from 'react-router-dom';
import './SignupLogin.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/SignUp">★ Sign Up</Link>
        </li>
        <li>
          <Link to="/Login">★ Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;