import React from 'react';
import { navigate } from 'gatsby';

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
    window.location.reload();
  };

  return (
    <button style={styles.logoutButton} onClick={handleLogout}>
      Déconnexion
    </button>
  );
};

const styles = {
  logoutButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    marginTop: '10px',
    border: 'none',
    cursor: 'pointer',
  }
};

export default LogoutButton;
