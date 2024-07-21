import React, { useEffect, useState } from 'react';
import { Link } from "gatsby"
import "./Menu.scss";
import axios from 'axios';
import { IoPersonCircleOutline } from "react-icons/io5";
import Deconnexion from '../Connexion/deconnexion';


const Menu = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState();
    useEffect(() => {
        // Vérifiez si le token est présent dans le localStorage
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

    

    return(

        <div className="navbar-wrapper | d-flex align-items-center gap-3 justify-content-around | px-5 py-3">
            <Link className="h1" to="/">
                WebConférences
            </Link>
            {isAuthenticated && isAdmin && (
                <div className="navbar-nav">
                    <Link className="connexion" to="/UsersList">
                        Liste des utilisateurs
                    </Link>
                </div>
            )}
            <div className='d-flex align-items-center gap-3'>
                <Link className="connexion" to="/login">
                    <IoPersonCircleOutline />        
                </Link>
                {isAuthenticated && (
                    <Deconnexion to="/"/>
                )}
            </div>
        </div>
    )
}

export default Menu;