import React from 'react';
import { useNavigate } from 'react-router-dom';
const PetCard = ({ pet }) => {
  const navigate = useNavigate();
  if (!pet) return null; // Return null if pet is undefined

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 px-3 w-64 flex justify-center flex-col">
      <img
        src={pet.imageUrl || 'default-image-url.jpg'}  // Provide a fallback image if profilePicture is missing
        alt={pet.breed || 'Unknown Breed'} // Provide a fallback alt text if Breed is missing
        className="w-48 h-48 object-cover py-3 mx-auto" />
      <div className="p-4 justify-center flex-col flex">
        <h2 className="text-xl font-bold mb-2">{pet.breed || 'Unknown Breed'}</h2>
        <p className="text-gray-700 mb-1">Type: {pet.type || 'Unknown Type'}</p>
        <p className="text-gray-700 mb-1">Age: {pet.age ? Math.floor(pet.age / 12) : 'Unknown Age'} years</p>
        <p className="text-gray-700 mb-1">Color: {pet.color || 'Unknown Color'}</p>
        <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600" onClick={() => navigate('/petprofile')}>
          Adopt
        </button>
      </div>
    </div>
  );
};

export default PetCard;
