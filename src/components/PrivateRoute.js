import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, setUser, children }) => {
  const [isValidUser, setIsValidUser] = useState(null);

  useEffect(() => {
    const validate = async () => {
      if (!user) {
        setIsValidUser(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:5001/users/${user.id}`);
        if (!res.ok) {
          localStorage.removeItem('user');
          setUser(null);
          setIsValidUser(false);
        } else {
          setIsValidUser(true);
        }
      } catch (err) {
        console.error("Сървърът не е достъпен:", err);
        localStorage.removeItem('user');
        setUser(null);
        setIsValidUser(false);
      }
    };

    validate();
  }, [user, setUser]);

  if (isValidUser === null) return null;

  return isValidUser ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
