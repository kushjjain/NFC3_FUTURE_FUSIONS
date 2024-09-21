import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import axios from 'axios';
const UserProfile = () => {
  const [user, setuser] = useState({
    "full_name": "",
    "gender": "",
    "profile_pic": "",
    "role": "adopter",
    "username": ""
  })
  useEffect(()=>{
    const get_user = async()=>{
      const resp = await axios.get("http://127.0.0.1:5008/api/auth/get-user", {withCredentials: true})
      // console.log(resp.data)
      setuser(resp.data);

    }
    get_user()
  }, [])
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-image">
          <img
            src={user.profile_pic}
            alt="User"
          />
        </div>
        <h2 className="user-name">{user.username}</h2>
        <p className="user-info"><strong>Full name:</strong> {user.full_name}</p>
        <p className="user-info"><strong>Gender:</strong> {user.gender}</p>
        <p className="user-info"><strong>Age:</strong> 28</p>
        <p className="user-info"><strong>Address:</strong> 123 Main St, City, Country</p>
        <p className="user-info"><strong>Pets Adopted:</strong> 3</p>
        <button className="appointments-btn">Appointments</button>
      </div>
    </div>
  );
};

export default UserProfile;
