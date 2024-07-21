import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "gatsby"
import Menu from "../components/Menu/menu";
import { MdDeleteOutline } from "react-icons/md";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    
    const checkAdminStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('Token manquant');

        const response = await axios.get('http://localhost:4555/isadmin', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.isAdmin) {
          setIsAdmin(true);
          fetchUsers();
        } else {
          setError('Vous devez être administrateur pour voir cette page');
          setLoading(false);
        }
      } catch (err) {
        console.error('Erreur lors de la vérification de l\'admin:', err);
        setError('Erreur lors de la vérification de l\'admin');
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:4555/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des utilisateurs');
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  const deleteUser = async (userId) => {
    if (!isAdmin) {
      setError('Vous devez être administrateur pour supprimer un utilisateur.');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:4555/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', err);
      setError('Erreur lors de la suppression de l\'utilisateur');
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <>
      <Menu />
      <h1 className='text-center m-5'>Liste des utilisateurs</h1>
      <Link to={`/edit-user`} style={{ cursor: 'pointer' }}>
        <p className='edit-user-button'> Modifier un utilisateur </p>
      </Link>
      <div className='table-container'>
        <table className='table-user'>
          <thead>
            <tr className='table-header'>
              <th>Nom d'utilisateur</th>
              <th>Type</th>
              <th> Actions </th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className='table-row'>
                <td className='table-cell'>{user.id}</td>
                <td className='table-cell'>{user.type}</td>
                <td className='table-cell' >
                  {isAdmin && (
                <MdDeleteOutline
                  onClick={() => deleteUser(user.id)}
                  style={{ color: 'red', cursor: 'pointer' }}
                />
              )}
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersList;
