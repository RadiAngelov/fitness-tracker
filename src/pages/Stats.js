import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import styles from '../pages/Stats.module.css';
import GoalEditor from '../components/GoalEditor';

const Stats = ({ user }) => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [localUser, setLocalUser] = useState(user);

  useEffect(() => {
    if (!user) return;

    setLocalUser(user);

    fetch("http://localhost:5001/workouts")
      .then(res => res.json())
      .then(data => {
        const filtered = data
          .filter(workout => workout.userId === user.id)
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        setWorkouts(filtered);
      })
      .catch(err => console.error("Грешка при зареждане на статистика:", err));
  }, [user]);

  if (!workouts || workouts.length === 0) {
    return <h2 className={styles.container}>📊 Няма налични тренировки за статистика.</h2>;
  }

  const filteredWorkouts = selectedMonth === null
    ? workouts
    : workouts.filter(w =>
        new Date(w.date).getMonth() === selectedMonth
      );

  const totalDistance = filteredWorkouts.reduce((sum, workout) => sum + parseFloat(workout.distance), 0);
  const totalDuration = filteredWorkouts.reduce((sum, workout) => sum + parseFloat(workout.duration), 0);
  const avgSpeed = (totalDistance / totalDuration).toFixed(2);
  const avgDuration = (totalDuration / filteredWorkouts.length || 1).toFixed(1);
  const totalWorkouts = filteredWorkouts.length;

  const intensityCount = { light: 0, medium: 0, extreme: 0 };
  filteredWorkouts.forEach(workout => intensityCount[workout.intensity]++);

  const mostCommonIntensity = Object.entries(intensityCount).sort((a, b) => b[1] - a[1])[0]?.[0];
  const intensityLabel = {
    light: 'Леко',
    medium: 'Средно',
    extreme: 'Екстремно'
  }[mostCommonIntensity];

  const longestWorkout = filteredWorkouts.reduce((max, w) =>
    parseFloat(w.duration) > parseFloat(max.duration) ? w : max, filteredWorkouts[0]);

  const longestByTime = filteredWorkouts.reduce((max, w) =>
    parseFloat(w.duration) > parseFloat(max.duration) ? w : max, filteredWorkouts[0]);

  const longestByDistance = filteredWorkouts.reduce((max, w) =>
    parseFloat(w.distance) > parseFloat(max.distance) ? w : max, filteredWorkouts[0]);

  const mostIntenseWorkout = filteredWorkouts.find(w => w.intensity === 'extreme') ||
                             filteredWorkouts.find(w => w.intensity === 'medium') ||
                             filteredWorkouts.find(w => w.intensity === 'light');

  const chartData = filteredWorkouts.map(workout => ({
    date: workout.date,
    distance: parseFloat(workout.distance),
    intensity: workout.intensity,
  }));

  const monthlyGoal = localUser?.goal?.value || 0;
  const rawProgress = (totalDistance / monthlyGoal) * 100;
  const monthlyProgress = Math.min(rawProgress, 100);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📊 Статистики</h1>

      {/* Филтър по месец */}
      <div className={styles.summary}>
        <label htmlFor="month">Филтрирай по месец: </label>
        <select
          id="month"
          value={selectedMonth ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedMonth(value === "" ? null : Number(value));
          }}
        >
          <option value="">Всички</option>
          <option value="0">Януари</option>
          <option value="1">Февруари</option>
          <option value="2">Март</option>
          <option value="3">Април</option>
          <option value="4">Май</option>
          <option value="5">Юни</option>
          <option value="6">Юли</option>
          <option value="7">Август</option>
          <option value="8">Септември</option>
          <option value="9">Октомври</option>
          <option value="10">Ноември</option>
          <option value="11">Декември</option>
        </select>
      </div>

      {filteredWorkouts.length === 0 ? (
        <p className={styles.warning}>📅 Няма тренировки за избрания месец.</p>
      ) : (
        <>
          <div className={styles.summary}>
            <p>Общо изминати километри: <strong>{totalDistance} км</strong></p>
            <p>Средно времетраене: <strong>{avgDuration} мин</strong></p>
            <p>Средна скорост: <strong>{avgSpeed} км/мин</strong></p>
          </div>

          <div className={styles.summary}>
            <p>Общ брой тренировки: <strong>{totalWorkouts}</strong></p>
            <p>Най-дълга тренировка: <strong>{longestWorkout.duration} мин / {longestWorkout.distance} км</strong></p>
            <p>Най-често срещана интензивност: <strong>{intensityLabel}</strong></p>
          </div>

          {/* 🎯 Месечна цел и прогрес */}
          <div className={styles.summary}>
            <GoalEditor
              user={localUser}
              onGoalUpdate={(updatedGoal) =>
                setLocalUser({ ...localUser, goal: updatedGoal })
              }
            />
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${monthlyProgress}%` }}
              ></div>
            </div>
            <p>{monthlyProgress.toFixed(1)}% изпълнение</p>
            {rawProgress > 100 && (
              <p className={styles.success}>
                ✅ Целта е изпълнена! С {Math.floor(rawProgress - 100)}% над нея!
              </p>
            )}
          </div>

          <h2 className={styles.subtitle}>🔍 Топ 3 Тренировки</h2>
          <div className={styles.summary}>
            <p>⏳ Най-дълга по време: <strong>{longestByTime.duration} мин</strong> на {longestByTime.date}</p>
            <p>🚴 Най-дълга по разстояние: <strong>{longestByDistance.distance} км</strong> на {longestByDistance.date}</p>
            <p>💪 Най-интензивна: <strong>{intensityLabel}</strong> на {mostIntenseWorkout?.date}</p>
          </div>

          <div className={styles.legend}>
            <span><span className={styles.lightDot}></span> Лека</span>
            <span><span className={styles.mediumDot}></span> Средна</span>
            <span><span className={styles.extremeDot}></span> Екстремна</span>
          </div>

          <h2 className={styles.subtitle}>📈 Напредък във времето</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="distance"
                data={chartData.filter(d => d.intensity === 'light')}
                stroke="#90ee90"
                name="Лека"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="distance"
                data={chartData.filter(d => d.intensity === 'medium')}
                stroke="#ffc107"
                name="Средна"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="distance"
                data={chartData.filter(d => d.intensity === 'extreme')}
                stroke="#dc3545"
                name="Екстремна"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default Stats;
