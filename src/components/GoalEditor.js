import React, { useState } from 'react';
import styles from './GoalEditor.module.css';
import {Target} from 'lucide-react';


const GoalEditor = ({ user, onGoalUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newGoalValue, setNewGoalValue] = useState(user?.goal?.value || 0);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (Number(newGoalValue) <= 0) return alert('Целта трябва да е положително число.');
    setLoading(true);

    const updatedGoal = {
      ...user.goal,
      value: Number(newGoalValue)
    };

    const res = await fetch(`http://localhost:5001/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goal: updatedGoal }),
    });

    if (res.ok) {
      onGoalUpdate(updatedGoal);
      setIsEditing(false);
    } else {
      alert('Грешка при запазване на новата цел.');
    }

    setLoading(false);
  };

  return (
    <div className={styles.goalEditor}>
      <h3><Target size={24} className={styles.icon}/> Месечна цел</h3>
      {isEditing ? (
        <>
          <label>Нова цел (в км):</label>
          <input
            type="number"
            value={newGoalValue}
            onChange={(e) => setNewGoalValue(e.target.value)}
            min="1"
          />
          <div className={styles.buttons}>
            <button onClick={handleSave} disabled={loading}>
              {loading ? 'Запазване...' : 'Запази'}
            </button>
            <button onClick={() => setIsEditing(false)}>Отказ</button>
          </div>
        </>
      ) : (
        <>
          <p>Цел: <strong>{user.goal.value} км</strong></p>
          <button onClick={() => setIsEditing(true)}>Редактирай целта</button>
        </>
      )}
    </div>
  );
};

export default GoalEditor;
