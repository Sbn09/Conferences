import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'gatsby';
import '../../pages/App.scss';


const ConfList = () => {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const response = await axios.get('http://localhost:4555/conferences');
        setConferences(response.data);
      } catch (err) {
        setError('Une erreur est survenue lors de la récupération des conférences.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConferences();
  }, []);

  useEffect(() => {
    // Vérifiez si le token est présent dans le localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    };
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  

  return (
    <div className="conf-wrapper | d-flex align-items-center justify-content-center flex-wrap gap-4 | mb-5">
        {conferences.map((conf) => (
        <div key={conf.id} className='conf-container | p-3'>
          <img width="100%" src={conf.img}/>
          <h2 className='text-center | my-3'>{conf.title}</h2>
          <div className='d-flex justify-content-between align-items-center'>
              <p> Le : <span className='fw-bold'>{conf.date} </span> </p>
              <p> Durée : <span className='fw-bold'> {conf.duration}</span> </p>
          </div>
          <p> {conf.description} </p>
          {isAuthenticated && (
            <Link
            to={`/conference/${conf.id}`}
            key={conf.id}
            className='see-more | my-4'
            >
              <p className='m-0'>En savoir plus  </p>
            </Link>
          )}
          {!isAuthenticated && (
            <Link
            to={'/login'}
            key={conf.id}
            className='see-more | my-4'
            >
              <p className='m-0'> Connecter vous pour en savoir plus  </p>
            </Link>
          )}
          
        </div>
        ))}
    </div>
  );
};

export default ConfList;
