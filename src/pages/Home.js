import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { Calendar, BarChart2, Target, Settings2, Dumbbell, User } from 'lucide-react';


const Home = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}><Dumbbell size={32} className={styles.icon} /> Тракер</h1>
      <p className={styles.description}>
        Следи тренировките си, поставяй седмични и месечни цели и постигай резултати с лекота.
      </p>

      <div className={styles.features}>
        <div className={styles.feature}>
          <h3><Calendar size={20} className={styles.icon} /> Планирай</h3>
          <p>Записвай тренировките си с дата, разстояние и интензивност.</p>
        </div>
        <div className={styles.feature}>
          <h3><BarChart2 size={20} className={styles.icon} />  Анализирай</h3>
          <p>Проследявай напредъка си с визуални графики и статистики.</p>
        </div>
        <div className={styles.feature}>
          <h3><Target size={20} className={styles.icon} />  Цели</h3>
          <p>Поставяй и постигай седмични и месечни цели.</p>
        </div>
        <div className={styles.feature}>
          <h3><Settings2 size={20} className={styles.icon} />  Контрол</h3>
          <p>Редактирай и управлявай всичките си тренировки лесно.</p>
        </div>
      </div>


      {!user ? (
        <div className={styles.buttons}>
          <button className={styles.btnPrimary} onClick={() => navigate('/register')}>
            Започни сега
          </button>
          <button className={styles.btnSecondary} onClick={() => navigate('/login')}>
            Вход
          </button>
        </div>
      ) : (
        <div className={styles.welcome}>
          <User size={20} className={styles.icon} /> Добре дошъл, <strong>{user.email}</strong>
        </div>
      )}

    </div>
  );
};

export default Home;
