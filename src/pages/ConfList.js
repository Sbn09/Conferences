// src/pages/test.js
import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";

const ConfList = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifiez si le token est présent dans le localStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate("/login"); // Redirige vers la page de connexion si non authentifié
    }
    
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return null; // Ne pas afficher le contenu si non authentifié
  }

  return (
    <div>
      <h2>Liste des Conférences</h2>
      {/* Contenu protégé */}
    </div>
  );
};

export default ConfList;
