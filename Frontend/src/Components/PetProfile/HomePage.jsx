import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import PetCard from "./PetCards";  // Assume this is the card component
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = ({isAdmin, isLoggedIn}) => {
  const [pets, setPets] = useState([]);
  const [loading, setloading] = useState(false)
const navigate = useNavigate()
  const handleSearch = async (query) => {
    try {
      setloading(true)
      const response = await axios.post(`http://127.0.0.1:5008/pets/search?query=${query}`, {withCredentials: true});
      // console.log(response.data.pets)
      setPets(response.data.pets);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
    finally{
      setloading(false)
    }
  };
  const handleCardClick = (id) => {
    console.log(isLoggedIn)
    if(!isLoggedIn)
    {
      navigate("/login")
return
    }

    window.scrollTo({ top: 0});
    navigate(`/adopt-us/${id}`)
  };
  useEffect(() => {
    // Fetch all pets on component mount
    const fetchPets = async () => {
      try {
        setloading(true)
        const response = await axios.get('http://127.0.0.1:5008/pets/all-pets');
        setPets(response.data);
        // console.log(response.data)
      } catch (error) {
        console.error('Error fetching all pets:', error);
      }
      finally {
        setloading(false)
      }
    };

    fetchPets();
  }, []);

  return (
    <div>
      <>
        {
          loading ? "Loading Data" :
            <>
              <SearchBar onSearch={handleSearch} />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {pets.map((pet) => (
                  <PetCard key={pet.id} handleCardClick = {handleCardClick} pet={pet} id={pet.id} isAdmin={isAdmin}/>
                ))}
              </div>
            </>
        }
      </>


    </div>
  );
};

export default HomePage;
