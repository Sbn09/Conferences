import React from 'react';

const ConferenceTemplate = ({ pageContext }) => {
  const { conference } = pageContext;

  return (
    <div>
      <h1>{conference.title}</h1>
      <p>{conference.description}</p>
      {/* Affichez d'autres détails de la conférence ici */}
    </div>
  );
};

export default ConferenceTemplate;
