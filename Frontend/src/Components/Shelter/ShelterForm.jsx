import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ShelterForm = () => {
  const [shelter, setShelter] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    phone_number: '',
    email: '',
    website: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let validationErrors = {};
    let isValid = true;

    if (shelter.name === "") {
      validationErrors.name = "Name is required";
      isValid = false;
    }

    if (shelter.address === "") {
      validationErrors.address = "Address is required";
      isValid = false;
    }

    if (shelter.city === "") {
      validationErrors.city = "City is required";
      isValid = false;
    }

    if (shelter.state === "") {
      validationErrors.state = "State is required";
      isValid = false;
    }

    if (shelter.email === "") {
      validationErrors.email = "Email is required";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setShelter({ ...shelter, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    } else {
      try {
        await axios.post('http://127.0.0.1:5008/shelter/shelters/add', shelter, { withCredentials: true });
        navigate("/shelter");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Shelter</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input type="text" name="name" value={shelter.name} onChange={handleChange} className="w-full p-2 border rounded"/>
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Address</label>
        <input type="text" name="address" value={shelter.address} onChange={handleChange} className="w-full p-2 border rounded"/>
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">City</label>
        <input type="text" name="city" value={shelter.city} onChange={handleChange} className="w-full p-2 border rounded"/>
        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">State</label>
        <input type="text" name="state" value={shelter.state} onChange={handleChange} className="w-full p-2 border rounded"/>
        {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Phone Number</label>
        <input type="text" name="phone_number" value={shelter.phone_number} onChange={handleChange} className="w-full p-2 border rounded"/>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input type="email" name="email" value={shelter.email} onChange={handleChange} className="w-full p-2 border rounded"/>
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Website</label>
        <input type="text" name="website" value={shelter.website} onChange={handleChange} className="w-full p-2 border rounded"/>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea name="description" value={shelter.description} onChange={handleChange} className="w-full p-2 border rounded"></textarea>
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Add Shelter</button>
    </form>
  );
};

export default ShelterForm;
