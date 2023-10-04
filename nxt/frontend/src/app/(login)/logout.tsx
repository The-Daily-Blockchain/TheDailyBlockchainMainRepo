'user client'
import { useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    // Send a POST request to the Django LogoutView
    fetch('/api/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 204) {
          // Logout was successful
          console.log('Logout successful');
        } else {
          // Handle logout failure
          console.error('Logout failed');
        }
      })
      .catch((error) => {
        // Handle network errors
        console.error('Network error:', error);
      });
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
