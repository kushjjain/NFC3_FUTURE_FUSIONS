import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [role, setRole] = useState('user'); 
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [organizationName, setOrganizationName] = useState(''); 
    const [error, setError] = useState('');
    const navigate = useNavigate(); 
    const defaultProfilePic = '../../Images/profile_default.png';

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username) {
            setError("Username cannot be empty");
            return;
        }
        if (!validatePassword(password)) {
            setError("Password must be at least 8 characters long, contain at least one special character, and one number");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (role === 'user' && !name) {
            setError("Name cannot be empty");
            return;
        }
        if (role === 'admin' && !organizationName) {
            setError("Organization name cannot be empty");
            return;
        }

        // Construct request payload
        // const payload = {
        //     username,
        //     password,
        //     gender,
        //     profilePic: profilePic || defaultProfilePic, // Default or provided URL
        //     ...(role === 'user' ? { fullName: name } : { organizationName })
        // };

        // try {
        //     const response = await axios.post('http://localhost:5008/api/auth/signup', payload, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     });
        //     console.log('Registration successful:', response.data);
        //     navigate('/login'); 
        // } catch (err) {
        //     console.error('Error registering:', err);
        //     setError('Registration failed');
        // }
        navigate('/login')
    };

    return (
        <div className="bg-footprints flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg backdrop-blur-md bg-opacity-60">
                <h2 className="text-center text-2xl mb-4 font-bold text-gray-800">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Role Dropdown */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-600" htmlFor="role">
                            Role
                        </label>
                        <select
                            id="role"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {/* Conditional Fields */}
                    {role === 'user' && (
                        <>
                            {/* Name Field */}
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-600" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    )}
                    {role === 'admin' && (
                        <>
                            {/* Organization Name Field */}
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-600" htmlFor="organizationName">
                                    Organization Name
                                </label>
                                <input
                                    type="text"
                                    id="organizationName"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your organization name"
                                    value={organizationName}
                                    onChange={(e) => setOrganizationName(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    )}

                    {/* Gender Selection */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-600">
                            Gender
                        </label>
                        <div className="flex items-center space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="gender"
                                    value="Male"
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                />
                                <span className="ml-2">Male</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="gender"
                                    value="Female"
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                />
                                <span className="ml-2">Female</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="gender"
                                    value="Other"
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                />
                                <span className="ml-2">Other</span>
                            </label>
                        </div>
                    </div>

                    {/* Username Field */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-600" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-600" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-600" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Profile Picture Upload */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-600" htmlFor="profilePic">
                            Profile Picture
                        </label>
                        <input
                            type="file"
                            id="profilePic"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                            onChange={(e) => setProfilePic(e.target.files[0])}
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md mt-3 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Register
                    </button>

                    {/* Redirect to Login */}
                    <div className="text-center mt-3 text-[14px]">
                        <span className="text-gray-400">Already have an account? </span>
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Login here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
