import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../components/Navbar.module.css';
import { Home, BarChart2, Dumbbell, LogIn, LogOut, UserPlus } from 'lucide-react';


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
      <Link to="/" className={styles.brand}><Dumbbell size={32} className={styles.icon} /> Тракер</Link>


      <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <ul className={`${styles['nav-links']} ${menuOpen ? styles.open : ''}`}>
        <li><Link to="/" className={styles['nav-link']} onClick={() => setMenuOpen(false)}><Home size={18} className={styles.icon} /> Начало</Link></li>
        {user && (
          <>
            <li><Link to="/workouts" className={styles['nav-link']} onClick={() => setMenuOpen(false)}><Dumbbell size={18} className={styles.icon} /> Тренировки</Link></li>
            <li><Link to="/stats" className={styles['nav-link']} onClick={() => setMenuOpen(false)}><BarChart2 size={18} className={styles.icon} /> Статистики</Link></li>
          </>
        )}

        {!user ? (
          <>
            <li><Link to="/login" className={styles['nav-link']} onClick={() => setMenuOpen(false)}><LogIn size={18} className={styles.icon} /> Вход</Link></li>
            <li><Link to="/register" className={styles['nav-link']} onClick={() => setMenuOpen(false)}><UserPlus size={18} className={styles.icon} /> Регистрация</Link></li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout} className={`${styles['nav-link']} ${styles['logout-btn']}`}><LogOut size={18} className={styles.icon} /> Изход</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
