import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShelterCard = ({ shelter }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to the form page and pass the shelter ID as a route parameter or state
    navigate(`add-pet/${shelter.id}`, { state: { shelterId: shelter.id } });
  };

  return (
    <div
      className="border p-4 rounded-lg shadow-lg cursor-pointer"
      onClick={handleCardClick}
    >
      <h2 className="text-xl font-bold">{shelter.name}</h2>
      <p>{shelter.address}, {shelter.city}, {shelter.state}</p>
      <p>Phone: {shelter.phone_number}</p>
      {shelter.email && <p>Email: {shelter.email}</p>}
      {shelter.website && (
        <p>
          Website: <a href={shelter.website} target="_blank" rel="noopener noreferrer">{shelter.website}</a>
        </p>
      )}
      {shelter.description && <p>Description: {shelter.description}</p>}
    </div>
  );
};

export default ShelterCard;
