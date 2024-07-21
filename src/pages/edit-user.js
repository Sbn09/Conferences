import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Menu from "../components/Menu/menu";

const EditUser = () => {
  const [idPermission, setIdPermission] = useState('');
  const [idPassword, setIdPassword] = useState('');
  const [newType, setNewType] = useState('');
  const [password, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingPermissions, setLoadingPermissions] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [errorPermissions, setErrorPermissions] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const changePermissions = async (event) => {
    event.preventDefault();
    setLoadingPermissions(true);
    setErrorPermissions(null);

    try {
      const token = localStorage.getItem('authToken');
      await axios.patch(`http://localhost:4555/usertype/${idPermission}`, {
        newType,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Permissions mises à jour avec succès !');
    } catch (error) {
      const message = error.response
        ? `Erreur ${error.response.status}: ${error.response.data.message || 'Une erreur est survenue.'}`
        : `Erreur réseau: ${error.message}`;
      setErrorPermissions(message);
      console.error('Erreur lors de la mise à jour des permissions:', error.response ? error.response.data : error.message);
    } finally {
      setLoadingPermissions(false);
    }
  };

  const changePassword = async (event) => {
    event.preventDefault();
    setLoadingPassword(true);
    setErrorPassword(null);
  
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Token not found');
      }
      console.log("Auth token:", token);
      console.log("Parameters being sent:", { oldPassword, newPassword: password });
  
      const response = await axios.patch(`http://localhost:4555/userpassword/${idPassword}`, {
        oldPassword,
        newPassword: password,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Response from server:", response.data);
      alert('Mot de passe mis à jour avec succès !');
    } catch (error) {
      const message = error.response
        ? `Erreur ${error.response.status}: ${error.response.data.message || 'Une erreur est survenue.'}`
        : `Erreur réseau: ${error.message}`;
      setErrorPassword(message);
      console.error('Erreur lors de la mise à jour du mot de passe:', error.response ? error.response.data : error.message);
    } finally {
      setLoadingPassword(false);
    }
  };  
  

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }

    const checkAdminStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('Token manquant');

        const response = await axios.get('http://localhost:4555/isadmin', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.isAdmin) {
          setIsAdmin(true);
        } else {
          setErrorPermissions('Vous devez être administrateur pour voir cette page');
          setLoadingPermissions(false);
        }
      } catch (err) {
        console.error('Erreur lors de la vérification de l\'admin:', err);
        setErrorPermissions('Erreur lors de la vérification de l\'admin');
        setLoadingPermissions(false);
      }
    };

    checkAdminStatus();
  }, []);

  if (!isAuthenticated) {
    return <p>Vous devez être connecté pour modifier les permissions des utilisateurs.</p>;
  }

  if (!isAdmin) {
    return <p>Vous devez être administrateur pour modifier les permissions des utilisateurs.</p>;
  }

  return (
    <>
      <Menu />
      <h1 className='ms-5 mt-3'>Modifier un utilisateur</h1>
      <div>
        <h2 className='fs-3 text | text-center | mt-5 mb-4'>Modifier les permissions de l'utilisateur</h2>
        <form onSubmit={changePermissions} className='d-flex flex-column gap-3 justify-content-center | mx-auto | update-form'>
          <div>
            <label className='d-none' htmlFor="idPermission">Login:</label>
            <input
              type="text"
              id="idPermission"
              value={idPermission}
              onChange={(e) => setIdPermission(e.target.value)}
              placeholder='Login'
              required
            />
          </div>
          <div>
            <label className='d-none' htmlFor="newtype">Permissions:</label>
            <select
              id="newtype"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              required
            >
              <option value="" disabled>Choisissez une permission</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <button className='update-button' type="submit" disabled={loadingPermissions}>
            {loadingPermissions ? 'Mise à jour...' : 'Mettre à jour'}
          </button>
          {errorPermissions && <p style={{ color: 'red' }}>{errorPermissions}</p>}
        </form>
      </div>
      <div>
        <h2 className='fs-3 text | text-center | mt-5 mb-4'>Modifier le mot de passe d'un utilisateur</h2>
        <form onSubmit={changePassword} className='d-flex flex-column gap-3 justify-content-center | mx-auto | update-form'>
          <div>
            <label className='d-none' htmlFor="idPassword">Login:</label>
            <input
              type="text"
              id="idPassword"
              value={idPassword}
              onChange={(e) => setIdPassword(e.target.value)}
              placeholder='Login'
              required
            />
          </div>
          <div>
            <label className='d-none' htmlFor="oldPassword">Ancien mot de passe:</label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder='Ancien mot de passe'
              required
            />
          </div>
          <div>
            <label className='d-none' htmlFor="password">Nouveau mot de passe:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder='Nouveau mot de passe'
              required
            />
          </div>
          <button className='update-button' type="submit" disabled={loadingPassword}>
            {loadingPassword ? 'Mise à jour...' : 'Mettre à jour'}
          </button>
          {errorPassword && <p style={{ color: 'red' }}>{errorPassword}</p>}
        </form>
      </div>
    </>
  );
};

export default EditUser;
