import React from 'react';
import '../pages/App.scss';

const ConferenceDetail = ({ data }) => {
    const { title, img, date, duration, description } = data.conference;

    return (
        <div className="conference-detail | d-flex flex-column align-items-center">
            <h1>{title}</h1>
            <img src={img} alt={title} width="100%" />
            <p>Date: {date}</p>
            <p>Durée: {duration}</p>
            <p>{description}</p>
        </div>
    );
};



export default ConferenceDetail;
