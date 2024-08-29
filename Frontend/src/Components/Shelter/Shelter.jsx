import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Shelter = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    petType: '',
    breed: '',
    age: '',
    image: null,
  });

  const [errors, setErrors] = useState({
    userName: '',
    email: '',
    petType: '',
    breed: '',
    age: '',
    image: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handlePetTypeChange = (e) => {
    setFormData({ ...formData, petType: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Clear previous errors
    Object.keys(newErrors).forEach(key => newErrors[key] = '');

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    // Validate age
    if (isNaN(formData.age) || formData.age <= 0) {
      newErrors.age = 'Age must be a positive number';
      valid = false;
    }

    // Validate image
    if (!formData.image) {
      newErrors.image = 'Image upload is required';
      valid = false;
    }

    // Validate other fields
    Object.keys(formData).forEach(key => {
      if (!formData[key] && key !== 'image') {
        newErrors[key] = 'This field is required';
        valid = false;
      }
    });

    setErrors(newErrors);
    console.log('Form validation status:', valid); 
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate('/welcome');
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Shelter Form</h2>
        <form onSubmit={handleSubmit}>
          {/* Global error message */}
          {Object.values(errors).some(error => error) && (
            <div className="mb-4 text-red-600 text-center">
              {Object.values(errors).find(error => error)}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
              Your Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.userName && <p className="text-red-600 text-sm mt-1">{errors.userName}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Pet Type</label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="petType"
                  value="Dog"
                  checked={formData.petType === 'Dog'}
                  onChange={handlePetTypeChange}
                  className="form-radio text-blue-500"
                  required
                />
                <span className="ml-2">Dog</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="petType"
                  value="Cat"
                  checked={formData.petType === 'Cat'}
                  onChange={handlePetTypeChange}
                  className="form-radio text-blue-500"
                  required
                />
                <span className="ml-2">Cat</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="petType"
                  value="Bird"
                  checked={formData.petType === 'Bird'}
                  onChange={handlePetTypeChange}
                  className="form-radio text-blue-500"
                  required
                />
                <span className="ml-2">Bird</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="petType"
                  value="Rabbit"
                  checked={formData.petType === 'Rabbit'}
                  onChange={handlePetTypeChange}
                  className="form-radio text-blue-500"
                  required
                />
                <span className="ml-2">Rabbit</span>
              </label>
            </div>
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
              Age (in months)
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.age && <p className="text-red-600 text-sm mt-1">{errors.age}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Upload Pet Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image}</p>}
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Shelter;
