import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PetProfile.css';
import { FaCheckCircle, FaTimesCircle, FaArrowRight } from 'react-icons/fa';

const PetProfile = ({ pet }) => {
  
  const navigate = useNavigate();

  const handleNavigateToQuestionnaire = () => {
    navigate('/qform');
  };

  return (
    <div className="profileContainer">
      <div className="header">
        <img src={pet.profilePicture} alt="Profile" className="profilePicture" />
        <div className="profileDetails">
          <h1>{pet.PetType}</h1>
          <p className="breed">{pet.Breed}</p>
        </div>
      </div>

      <div className="infoContainer">
        <div className="infoSection">
          <h2>Details</h2>
          <p><strong>Pet ID:</strong> {pet.PetID}</p>
          <p><strong>Age:</strong> {pet.AgeMonths} months</p>
          <p><strong>Color:</strong> {pet.Color}</p>
          <p><strong>Size:</strong> {pet.Size}</p>
          <p><strong>Weight:</strong> {pet.WeightKg} kg</p>
          <p><strong>Location:</strong> {pet.Location}</p>
        </div>

        <div className="infoSection">
          <h2>Health & Adoption</h2>
          <p><strong>Vaccinated:</strong> {pet.Vaccinated ? <FaCheckCircle className="icon" /> : <FaTimesCircle className="icon" />}</p>
          {pet.Vaccinated && (
            <p>
              <a href={pet.vaccinationCertificate} target="_blank" rel="noopener noreferrer" className="certificateLink">
                View Vaccination Certificate
              </a>
            </p>
          )}
          <p><strong>Health Condition:</strong> {pet.HealthCondition}</p>
          <p><strong>Time in Shelter:</strong> {pet.TimeInShelterDays} days</p>
          <p><strong>Adoption Fee:</strong> ${pet.AdoptionFee}</p>
          <p><strong>Previous Owner:</strong> {pet.PreviousOwner ? 'Yes' : 'No'}</p>
        </div>
      </div>

      <button onClick={handleNavigateToQuestionnaire} className="navigateButton">
        Go to Questionnaire <FaArrowRight className="arrowIcon" />
      </button>
    </div>
  );
};

export default PetProfile;
