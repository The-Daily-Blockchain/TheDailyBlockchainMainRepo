'use client'
import { API_URL } from '@/app/config';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    const token = Cookies.get('token');
    const csrfToken = Cookies.get('csrftoken');

    fetch(`${API_URL}/api/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token || ''}`, // Provide a default value to avoid errors
      },
    })
      .then(() => {
        Cookies.remove('token');
        setIsLoggedIn(false);
        onLogout();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  if (!isLoggedIn) {
    return null; // or return an alternative component
  }

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
