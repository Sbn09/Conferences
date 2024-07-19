import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [id, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:4555/login', {
        id,
        password,
      });

      const token = response.data;

      if (token) {
        localStorage.setItem('authToken', token);
        
        // window.location.href = '/dashboard';
      } else {
        setError('Vous ne pouvez pas vous connecter');
      }
      
    } catch (error) {
      const message = error.response
        ? `Erreur ${error.response.status}: ${error.response.data.message || 'Une erreur est survenue.'}`
        : `Erreur réseau: ${error.message}`;
      setError(message);
      console.error('Erreur lors de la connexion:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">Login:</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
