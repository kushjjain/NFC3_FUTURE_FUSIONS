import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
const Shelter = ({ isAdmin }) => {

  const { shelterId } = useParams();
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const shelterIdFromState = location.state?.shelterId;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    petType: 'Rabbit',
    breed: '',
    age_months: '',
    color: '',
    size: '',
    weight_kg: '',
    vaccinationCertificate: null,
    health_condition: '',
    time_in_shelter_days: '',
    adoption_fee: '',
    previous_owner_name: '',
    adoption_likelihood: true,
    profilePictureURL: null,
    shelter_id:shelterId
  });
  // console.log(shelterId,shelterIdFromState)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate fields
    if (!formData.breed) {
      newErrors.breed = 'Breed is required';
      valid = false;
    }
    if (!formData.age_months || isNaN(formData.age_months) || formData.age_months <= 0) {
      newErrors.age_months = 'Age must be a positive number';
      valid = false;
    }
    if (!formData.color) {
      newErrors.color = 'Color is required';
      valid = false;
    }
    if (!formData.size) {
      newErrors.size = 'Size is required';
      valid = false;
    }
    if (!formData.weight_kg || isNaN(formData.weight_kg) || formData.weight_kg <= 0) {
      newErrors.weight_kg = 'Weight must be a positive number';
      valid = false;
    }
    // if (!formData.vaccinationCertificate) {
    //   newErrors.vaccinationCertificate = 'Vaccination certificate is required';
    //   valid = false;
    // }
    if (!formData.health_condition) {
      newErrors.health_condition = 'Health condition is required';
      valid = false;
    }
    if (!formData.time_in_shelter_days || isNaN(formData.time_in_shelter_days) || formData.time_in_shelter_days < 0) {
      newErrors.time_in_shelter_days = 'Time in shelter must be a non-negative number';
      valid = false;
    }
    if (!formData.adoption_fee || isNaN(formData.adoption_fee) || formData.adoption_fee < 0) {
      newErrors.adoption_fee = 'Adoption fee must be a non-negative number';
      valid = false;
    }
    if (!formData.previous_owner_name) {
      newErrors.previous_owner_name = 'Name is required';
      valid = false;
    }
    if (!formData.profilePictureURL) {
      newErrors.profilePictureURL = 'Profile picture is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const data = {
        "pet_type": formData.petType,
        "breed": formData.breed,
        "age_months": formData.age_months,
        "color": formData.color,
        "size": formData.size,
        "weight_kg": formData.weight_kg,
        "vaccinationCertificate": "https://example.com/sample-certificate.pdf",
        "health_condition": formData.health_condition,
        "time_in_shelter_days": formData.time_in_shelter_days,
        "adoption_fee": formData.adoption_fee,
        "previous_owner_name": formData.previous_owner_name,
        "adoption_likelihood": true,
        "profilePicture": formData.profilePictureURL,
        "shelter_id": shelterId
      }
      // data.append('pet_type', formData.petType);
      // data.append('breed', formData.breed);
      // data.append('age_months', formData.age_months);
      // data.append('color', formData.color);
      // data.append('size', formData.size);
      // data.append('weight_kg', formData.weight_kg);
      // data.append('vaccinationCertificate', "https://example.com/sample-certificate.pdf");
      // data.append('health_condition', formData.health_condition);
      // data.append('time_in_shelter_days', formData.time_in_shelter_days);
      // data.append('adoption_fee', formData.adoption_fee);
      // data.append('previous_owner_name', formData.previous_owner_name);
      // data.append('adoption_likelihood', formData.adoption_likelihood);
      // data.append('profilePicture', formData.profilePictureURL);
      // data.forEach((value, key) => {
      //   console.log(key, value);
      // });
      // console.log(data)
      try {

        await axios.post('http://127.0.0.1:5008/shelter/pets/add', data);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate('/welcome');
      } catch (error) {
        console.error('Error submitting form', error);
      }
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      {
        isAdmin ?
          <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Add Pets To Shelter</h2>
            <form onSubmit={handleSubmit}>
              {/* Global error message */}
              {Object.values(errors).some((error) => error) && (
                <div className="mb-4 text-red-600 text-center">
                  {Object.values(errors).find((error) => error)}
                </div>
              )}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="previous_owner_name">
                  Previous Owner Name
                </label>
                <input
                  type="text"
                  id="previous_owner_name"
                  name="previous_owner_name"
                  value={formData.previous_owner_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                {errors.previous_owner_name && (
                  <p className="text-red-600 text-sm mt-1">{errors.previous_owner_name}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petType">
                  Pet Type
                </label>
                <select
                  id="petType"
                  name="petType"
                  value={formData.petType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">Select a pet type</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Rabbit">Rabbit</option>
                </select>
                {errors.petType && <p className="text-red-600 text-sm mt-1">{errors.petType}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="breed">
                  Breed
                </label>
                <input
                  type="text"
                  id="breed"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                {errors.breed && <p className="text-red-600 text-sm mt-1">{errors.breed}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age_months">
                  Age (in months)
                </label>
                <input
                  type="number"
                  id="age_months"
                  name="age_months"
                  value={formData.age_months}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                {errors.age_months && <p className="text-red-600 text-sm mt-1">{errors.age_months}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
                  Color
                </label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                {errors.color && <p className="text-red-600 text-sm mt-1">{errors.color}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="size">
                  Size
                </label>
                <input
                  type="text"
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                {errors.size && <p className="text-red-600 text-sm mt-1">{errors.size}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight_kg">
                  Weight (in kg)
                </label>
                <input
                  type="number"
                  id="weight_kg"
                  name="weight_kg"
                  value={formData.weight_kg}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                {errors.weight_kg && <p className="text-red-600 text-sm mt-1">{errors.weight_kg}</p>}
              </div>

              {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vaccinationCertificate">
              Vaccination Certificate
            </label>
            <input
              type="file"
              id="vaccinationCertificate"
              name="vaccinationCertificate"
              accept="application/pdf"
              onChange={handleFileChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.vaccinationCertificate && (
              <p className="text-red-600 text-sm mt-1">{errors.vaccinationCertificate}</p>
            )}
          </div> */}

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="health_condition">
                  Health Condition
                </label>
                <input
                  type="text"
                  id="health_condition"
                  name="health_condition"
                  value={formData.health_condition}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                {errors.health_condition && (
                  <p className="text-red-600 text-sm mt-1">{errors.health_condition}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time_in_shelter_days">
                  Time in Shelter (in days)
                </label>
                <input
                  type="number"
                  id="time_in_shelter_days"
                  name="time_in_shelter_days"
                  value={formData.time_in_shelter_days}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                {errors.time_in_shelter_days && (
                  <p className="text-red-600 text-sm mt-1">{errors.time_in_shelter_days}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adoption_fee">
                  Adoption Fee
                </label>
                <input
                  type="number"
                  id="adoption_fee"
                  name="adoption_fee"
                  value={formData.adoption_fee}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                {errors.adoption_fee && <p className="text-red-600 text-sm mt-1">{errors.adoption_fee}</p>}
              </div>



              {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adoption_likelihood">
              Adoption Likelihood
            </label>
            <select
              id="adoption_likelihood"
              name="adoption_likelihood"
              value={formData.adoption_likelihood}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div> */}

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePictureURL">
                  Profile Picture URL
                </label>
                <input
                  type="url"
                  id="profilePictureURL"
                  name="profilePictureURL"
                  value={formData.profilePictureURL}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                {errors.profilePictureURL && <p className="text-red-600 text-sm mt-1">{errors.profilePictureURL}</p>}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          : "Not an admin user"
      }

    </div>
  );
};

export default Shelter;
