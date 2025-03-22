import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../components/Navbar.module.css';

const Navbar = ({ user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>🏋️‍♂️ Тракер</div>

      <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <ul className={`${styles['nav-links']} ${menuOpen ? styles.open : ''}`}>
        <li><Link to="/" className={styles['nav-link']} onClick={() => setMenuOpen(false)}>🏠 Начало</Link></li>
        {user && (
          <>
            <li><Link to="/workouts" className={styles['nav-link']} onClick={() => setMenuOpen(false)}>🚴 Тренировки</Link></li>
            <li><Link to="/stats" className={styles['nav-link']} onClick={() => setMenuOpen(false)}>📊 Статистики</Link></li>
          </>
        )}

        {!user ? (
          <>
            <li><Link to="/login" className={styles['nav-link']} onClick={() => setMenuOpen(false)}>🔐 Вход</Link></li>
            <li><Link to="/register" className={styles['nav-link']} onClick={() => setMenuOpen(false)}>📝 Регистрация</Link></li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout} className={`${styles['nav-link']} ${styles['logout-btn']}`}>🚪 Изход</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
