import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import PetCard from "./PetCards";  // Assume this is the card component
import axios from 'axios';

const HomePage = () => {
  const [pets, setPets] = useState([]);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5008/pets/search?query=${query}`);
      setPets(response.data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  useEffect(() => {
    // Fetch all pets on component mount
    const fetchPets = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5008/pets/all-pets');
        setPets(response.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching all pets:', error);
      }
    };

    fetchPets();
  }, []);

  return (
    <div>
      {
        console.log(pets)
      }
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>

    </div>
  );
};

export default HomePage;