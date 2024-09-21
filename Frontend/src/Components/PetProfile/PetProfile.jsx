import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './PetProfile.css';
import { FaCheckCircle, FaTimesCircle, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';

const PetProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setpet] = useState({})
  const [loading, setloading] = useState(false)

  const handleNavigateToQuestionnaire = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/qform');
  };
  useEffect(() => {
    const func = async () => {
      try {
        setloading(true)
        //console.log("id: " + id)
        const resp = await axios.get(`http://127.0.0.1:5008/pets/${id}`, { withCredentials: true })
        // console.log(resp.data)
        setpet(resp.data)
      } catch (error) {
        console.log(error)
      }
      finally {
        setloading(false)
      }
    }
    func()
  }, []
  )
  return (
    <div className="profileContainer">
      <div>
        {
          loading ? "Loading Data" :
            <>
              <div className="header">
                <img src={pet.profilePicture} alt="Profile" className="profilePicture"/>
                <div className="profileDetails">
                  <h1>{pet.PetType}</h1>
                  <p className="breed">{pet.Breed}</p>
                </div>
              </div>

              <div className="infoContainer">
                <div className="infoSection">
                  <h2>Details</h2>
                  {/* <p><strong>Pet ID:</strong> {pet.PetID}</p> */}
                  <p><strong>Age:</strong> {pet.AgeMonths} months</p>
                  <p><strong>Color:</strong> {pet.Color}</p>
                  <p><strong>Size:</strong> {pet.Size}</p>
                  <p><strong>Weight:</strong> {pet.WeightKg} kg</p>
                  <p><strong>Shelter Location:</strong> {pet.shelter_address}</p>
                  <p><strong>City:</strong> {pet.shelter_location}</p>
                  <p><strong>State:</strong> {pet.shelter_state}</p>
                  <p><strong>Contact number:</strong> {pet.shelter_phone_number}</p>
                </div>

                <div className="infoSection">
                  <h2>Health & Adoption</h2>
                  <p className='flex gap-4 align-middle items-center'><strong className='flex items-center'>Vaccinated:{pet.Vaccinated ? <FaCheckCircle className="icon" /> : <FaTimesCircle className="icon" />}</strong>
                  {pet.Vaccinated && (
                    <p>
                      <a href={pet.vaccinationCertificate} target="_blank" rel="noopener noreferrer" className="certificateLink items-center mb-2">
                        View Vaccination Certificate
                      </a>
                    </p>
                  )}
                   </p>
                  <p><strong>Health Condition:</strong> {pet.HealthCondition}</p>
                  <p><strong>Time in Shelter:</strong> {pet.TimeInShelterDays} days</p>
                  <p><strong>Adoption Fee:</strong> ₹ {pet.AdoptionFee*10}</p>
                  <p><strong>Previous Owner:</strong> {pet.PreviousOwner ? 'Yes' : 'No'}</p>
                </div>
              </div>

              <button onClick={handleNavigateToQuestionnaire} className="navigateButton">
                Go to Questionnaire <FaArrowRight className="arrowIcon" />
              </button>
            </>
        }
      </div>

    </div>
  );
};

export default PetProfile;
