import React, { useState, useEffect, useRef } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DropdownMenu = ({ onEdit, onDelete, isOpen, setIsOpen }) => {
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button to toggle the dropdown */}
      <button
        onClick={toggleDropdown}
        className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 focus:outline-none"
      >
        ⋮
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
          <button
            className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100"
            onClick={onEdit}
          >
            <FaEdit className="mr-2" /> Edit
          </button>
          <button
            className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100"
            onClick={onDelete}
          >
            <FaTrash className="mr-2" /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

const PetCard = ({ pet, isAdmin, handleCardClick }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const onEdit = () => {
    // Redirect to the edit page
    navigate(`/shelter/pets/update/${pet.id}`);
  };

  const onDelete = async (id) => {
    try {
      // await axios.delete(`http://127.0.0.1:5008/shelter/pets/delete/${id}`, { withCredentials: true });
    } catch (error) {
      console.log(error);
    }
    navigate(0); // Refresh the page after deleting
  };

  return (
    <div className="relative bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 px-3 w-64 flex justify-center flex-col pt-4">
      <img
        src={pet.imageUrl || 'default-image-url.jpg'}  // Provide a fallback image if imageUrl is missing
        alt={pet.breed || 'Unknown Breed'} // Provide a fallback alt text if Breed is missing
        className="w-48 h-48 object-cover py-3 mx-auto rounded-3xl"
      />
      <div className="p-4 justify-center flex-col flex">
        <h2 className="text-xl font-bold mb-2">{pet.breed || 'Unknown Breed'}</h2>
        <p className="text-gray-700 mb-1">Type: {pet.type || 'Unknown Type'}</p>
        <p className="text-gray-700 mb-1">Age: {pet.age ? Math.floor(pet.age) : 'Unknown Age'} Months</p>
        <p className="text-gray-700 mb-1">Color: {pet.color || 'Unknown Color'}</p>
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
          onClick={() => handleCardClick(pet.id)}
        >
          Adopt
        </button>
        {isAdmin && (
          <>
            <div className="absolute top-0 left-0 bg-yellow-500 text-white pt-1 px-2 rounded-bl-lg">
              Adoption Likelihood: <strong>{pet.adoption_likelihood}</strong>
            </div>
            <div className="absolute top-0 right-0">
              <DropdownMenu 
                onEdit={() => onEdit(pet.id)} 
                onDelete={() => onDelete(pet.id)} 
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PetCard;
