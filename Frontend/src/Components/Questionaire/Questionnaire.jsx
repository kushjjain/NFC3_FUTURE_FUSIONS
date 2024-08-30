import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './Questionnaire.css'; // Ensure you have this CSS file for styling

const questions = [
  { question: "Q1. How often are you home during the day?", options: [1, 2, 3, 4, 5] },
  { question: "Q2. Do you have a secure, pet-friendly environment (e.g., fenced yard, safe indoor space)?", options: [1, 2, 3, 4, 5] },
  { question: "Q3. How would you rate your knowledge of pet care and needs?", options: [1, 2, 3, 4, 5] },
  { question: "Q4. Do you have a plan for handling unexpected costs associated with pet care (e.g., medical emergencies)?", options: [1, 2, 3, 4, 5] },
  { question: "Q5. How committed are you to providing lifelong care for a pet?", options: [1, 2, 3, 4, 5] },
  { question: "Q6. Do you have previous experience with the type of pet you want to adopt?", options: [1, 2, 3, 4, 5] },
  { question: "Q7. How will you handle the pet's exercise and socialization needs?", options: [1, 2, 3, 4, 5] },
  { question: "Q8. Are you prepared for the time and effort required for training and behavior management?", options: [1, 2, 3, 4, 5] },
  { question: "Q9. How do you plan to integrate the pet into your home and daily routine?", options: [1, 2, 3, 4, 5] },
  { question: "Q10. Do you have a backup plan for pet care if you go on vacation or have emergencies?", options: [1, 2, 3, 4, 5] },
  { question: "Q11. How will you manage shedding, grooming, and other maintenance needs of the pet?", options: [1, 2, 3, 4, 5] },
  { question: "Q12. Are you aware of the long-term financial costs of pet ownership (e.g., food, veterinary care)?", options: [1, 2, 3, 4, 5] },
  { question: "Q13. How do you plan to address any potential behavioral issues that may arise?", options: [1, 2, 3, 4, 5] },
  { question: "Q14. How will you ensure the pet’s safety and well-being in different situations (e.g., while traveling, during a move)?", options: [1, 2, 3, 4, 5] },
  { question: "Q15. Are you prepared for the time commitment required for regular exercise and playtime?", options: [1, 2, 3, 4, 5] },
  { question: "Q16. How will you handle the pet’s health needs, including vaccinations and regular check-ups?", options: [1, 2, 3, 4, 5] },
  { question: "Q17. Do you have a support network for advice and assistance with pet care?", options: [1, 2, 3, 4, 5] },
  { question: "Q18. How will you balance pet care with your personal and professional responsibilities?", options: [1, 2, 3, 4, 5] },
  { question: "Q19. Are you aware of and prepared for any breed-specific traits or needs of the pet you wish to adopt?", options: [1, 2, 3, 4, 5] },
  { question: "Q20. How do you plan to involve all family members in the care and responsibilities of the pet?", options: [1, 2, 3, 4, 5] },
  { question: "Q21. How will you address any conflicts or challenges that arise in your home due to the new pet?", options: [1, 2, 3, 4, 5] },
];

const THRESHOLD_SCORE = 50; // Adjust this score based on your needs

const Questionnaire = () => {
  const [responses, setResponses] = useState(Array(questions.length).fill(0));
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const handleSubmit = () => {
    const totalScore = responses.reduce((acc, cur) => acc + cur, 0);

    if (totalScore >= THRESHOLD_SCORE) {
      Swal.fire({
        title: 'Congratulations!',
        text: `Your total score is ${totalScore}. You are eligible for adoption!`,
        icon: 'success',
        confirmButtonText: 'Proceed to Appointments',
      }).then(() => {
        navigate('/schapp');
      });
    } else {
      Swal.fire({
        title: 'Sorry!',
        text: `Your total score is ${totalScore}. Unfortunately, you do not meet the criteria for adoption.`,
        icon: 'error',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/petprofile');
      });
    }
  };

  return (
    <div className="questionnaireContainer">
      <div className="header">
        <button onClick={() => navigate(-1)} className="backButton">
          <FaArrowLeft className="backIcon" />
        </button>
        <h1>Questionnaire</h1>
      </div>
      <form className="questionnaireForm">
        {questions.map((q, index) => (
          <div key={index} className="questionBlock">
            <p className="questionText">{q.question}</p>
            <div className="optionsContainer">
              {q.options.map(option => (
                <label key={option} className="optionLabel">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={responses[index] === option}
                    onChange={() => handleChange(index, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="button" onClick={handleSubmit} className="submitButton">Submit</button>
      </form>
    </div>
  );
};

export default Questionnaire;
