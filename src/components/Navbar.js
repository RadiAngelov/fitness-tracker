import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Импортираме CSS стиловете

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="brand">🚴 Fitness Tracker</div>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/" className="nav-link">🏠 Home</Link></li>
        <li><Link to="/workouts" className="nav-link">🚴 Workouts</Link></li>
        <li><Link to="/stats" className="nav-link">📊 Stats</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
