import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [goalValue, setGoalValue] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Паролите не съвпадат!');
      return;
    }

    if (Number(goalValue) <= 0) {
      setError('Целта трябва да е положително число.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5001/users?email=${email}`);
      const existingUsers = await res.json();

      if (existingUsers.length > 0) {
        setError('Потребител с този имейл вече съществува.');
        return;
      }

      const newUser = {
        email,
        password,
        goal: {
          value: Number(goalValue),
          unit: 'км',
          type: 'distance'
        }
      };

      const postRes = await fetch('http://localhost:5001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (postRes.ok) {
        navigate('/login');
      } else {
        setError('Регистрацията не бе успешна.');
      }
    } catch (err) {
      console.error('Register error:', err);
      setError('Грешка при регистрация.');
    }
  };

  return (
    <div className={styles['register-container']}>
      <h2>Регистрация</h2>
      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleRegister}>
        <div className={styles['form-group']}>
          <label htmlFor="email">Имейл:</label>
          <input
            type="email"
            id="email"
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
            type="password"
            id="password"
            name="password"
            placeholder="Създай парола"
            autoComplete="new-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="confirmPassword">Повтори паролата:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Повтори паролата"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* 🎯 Поле за цел */}
        <div className={styles['form-group']}>
          <label htmlFor="goalValue">Цел за разстояние (в километри):</label>
          <input
            type="number"
            id="goalValue"
            name="goalValue"
            placeholder="напр. 100"
            value={goalValue}
            onChange={e => setGoalValue(e.target.value)}
            required
            min="1"
          />
          <small>Единицата е фиксирана като „км“</small>
        </div>

        <button type="submit" className={styles['register-btn']}>
  Регистрирай се
</button>

      </form>
    </div>
  );
};

export default Register;
