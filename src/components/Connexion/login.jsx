import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        setIsAuthenticated(true);
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

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className='form-bg'>
      {!isAuthenticated && (
        <div>
          <h2 className='text-white text-center text-uppercase | mb-4'>Connexion</h2>
          <form onSubmit={handleSubmit} className='login-form | d-flex flex-column gap-3 justify-content-center | mx-auto'>
            <div>
              <label className='d-none' htmlFor="id">Login:</label>
              <input
                type="text"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder='Login'
                required
              />
            </div>
            <div>
              <label className='d-none' htmlFor="password">Mot de passe:</label>
              <input
                type="password"
                id="password"
                placeholder='Mot de passe'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className='' type="submit" disabled={loading}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        </div>
      )}
      {isAuthenticated && (
        <div className='text-white text-center'>
          <p className='fs-3 text'>Vous êtes connecté en tant que {id} !  </p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
