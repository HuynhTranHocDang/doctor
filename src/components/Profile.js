// src/components/Profile.js
import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useHistory } from 'react-router-dom'; // Import useHistory
import { useAuthValue } from '../contex/AuthContext';





function Profile() {
  const { currentUser } = useAuthValue();
  const [userProfile, setUserProfile] = useState(null);
  // const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    const fetchUserProfile = async () => {
      const q = query(collection(db, 'doctor'), where('uid', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        setUserProfile(doc.data());
        console.log(doc.data());
      });
    };

    if (currentUser) {
      fetchUserProfile();
    }
  }, [currentUser]);

  // const handleSignOut = () => {
  //   signOut(auth);
  // };


  return (
    <div>
      <div className="back-link">
        <Link to="/">Back</Link>
      </div>

      <header className="header">
        <h1 className="header-title">Doctor Profile</h1>
      </header>
      
      <div className="container">
        <div className="profile">
          <h2>Profile</h2>
          <h3 className="BS">BS. {userProfile.name}</h3>
          <div className="information">
            <p>
              <span><strong>Name:</strong></span> <span className='infor'> {userProfile.name}</span> 
            </p>

            <p>
              <span><strong>Type:</strong></span> <span className='infor'> {userProfile.type}</span> 
            </p>

            <p>
              <span><strong>Email:</strong></span> <span className='infor'> {currentUser.email}</span> 
            </p>

            <p>
              <span><strong>Email verified:</strong></span> <span className='infor'> {`${currentUser.emailVerified}`}</span> 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
