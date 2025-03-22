import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../pages/Login.module.css';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`http://localhost:5001/users?email=${email}`);
      const users = await res.json();
      const foundUser = users.find(user => user.password === password);

      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem("user", JSON.stringify(foundUser));
        navigate("/workouts");
      } else {
        setError("Невалиден имейл или парола.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Възникна грешка при входа.");
    }
  };

  return (
    <div className={styles['login-container']}>
      <h2>Вход</h2>
      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles['form-group']}>
          <label htmlFor="email">Имейл:</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Въведи имейл адрес"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="password">Парола:</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Въведи парола"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.button}>Вход</button>
      </form>
    </div>
  );
};

export default Login;