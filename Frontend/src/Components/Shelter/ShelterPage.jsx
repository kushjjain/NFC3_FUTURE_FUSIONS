import React, { useState, useEffect } from 'react';
import ShelterCard from './ShelterCard';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const ShelterPage = () => {
  const [shelters, setShelters] = useState([]);
//   const history = useHistory();
    const navigate = useNavigate();
  useEffect(() => {
    // Fetch shelters from the API
    const fetch_shelter = async ()=>{
        try {
            const res = await axios.get('http://127.0.0.1:5008/shelter/get-all', {withCredentials: true})
            const data = res.data
            // console.log(data)
            setShelters(data);
        } catch (error) {
            console.log(error)
        }

    }
    fetch_shelter()
  }, []);

  const handleAddShelter = () => {
    // history.push('/add-shelter');
    navigate("/add-shelter");
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold text-center">Select Shelter</h1>
        <button
          onClick={handleAddShelter}
          className="bg-blue-500 text-white py-2 px-4 rounded-full"
        >
          + Add Shelter
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {shelters.map(shelter => (
          <ShelterCard key={shelter.id} shelter={shelter} />
        ))}
      </div>
    </div>
  );
};

export default ShelterPage;
