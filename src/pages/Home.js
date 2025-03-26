import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🏋️‍♀️ Тракер</h1>
      <p className={styles.description}>
        Следи тренировките си, поставяй седмични и месечни цели и постигай резултати с лекота.
      </p>

      <div className={styles.features}>
        <div className={styles.feature}>
          <h3>📅 Планирай</h3>
          <p>Записвай тренировките си с дата, разстояние и интензивност.</p>
        </div>
        <div className={styles.feature}>
          <h3>📊 Анализирай</h3>
          <p>Проследявай напредъка си с визуални графики и статистики.</p>
        </div>
        <div className={styles.feature}>
          <h3>🎯 Цели</h3>
          <p>Поставяй и постигай седмични и месечни цели.</p>
        </div>
        <div className={styles.feature}>
          <h3>🧩 Контрол</h3>
          <p>Редактирай и управлявай всичките си тренировки лесно.</p>
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.btnPrimary} onClick={() => navigate('/register')}>
          Започни сега
        </button>
        <button className={styles.btnSecondary} onClick={() => navigate('/login')}>
          Вход
        </button>
      </div>
    </div>
  );
};

export default Home;
