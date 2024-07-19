import React from 'react';
import { navigate } from 'gatsby';

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Supprimer le token d'authentification
    navigate('/login'); // Rediriger vers la page de connexion après déconnexion
  };

  return (
    <button onClick={handleLogout}>Déconnexion</button>
  );
};

export default LogoutButton;
