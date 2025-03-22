import React, { useState, useEffect } from "react";
import axios from "axios";

const GoalTracker = ({ userId }) => {
  const [goal, setGoal] = useState(0);
  const [distanceSoFar, setDistanceSoFar] = useState(0);

  useEffect(() => {
    // Взимаме целта
    axios.get(`http://localhost:3000/users/${userId}`).then((res) => {
      const userGoal = res.data.goal;
      if (userGoal) {
        setGoal(userGoal.value || 0);
      }
    });

    // Взимаме тренировките и изчисляваме текущото разстояние
    axios.get(`http://localhost:3000/workouts?userId=${userId}`).then((res) => {
      const totalDistance = res.data.reduce(
        (sum, workout) => sum + (workout.distance || 0),
        0
      );
      setDistanceSoFar(totalDistance);
    });
  }, [userId]);

  const handleSaveGoal = () => {
    axios.patch(`http://localhost:3000/users/${userId}`, {
      goal: {
        value: goal,
        unit: "km",
        type: "distance",
        progress: distanceSoFar,
      },
    });
  };

  const percentage = goal ? Math.min((distanceSoFar / goal) * 100, 100) : 0;

  return (
    <div className="p-4 border rounded-md shadow-md max-w-md bg-white">
      <h2 className="text-xl font-semibold mb-2">🎯 Цел за месеца</h2>
      <input
        type="number"
        className="border p-2 w-full mb-2"
        value={goal}
        onChange={(e) => setGoal(Number(e.target.value))}
        placeholder="Напр. 100 км"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        onClick={handleSaveGoal}
      >
        Запази целта
      </button>

      <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
        <div
          className="bg-green-500 h-4 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-700">
        {distanceSoFar} км от {goal} км ({Math.round(percentage)}%)
      </p>
    </div>
  );
};

export default GoalTracker;
