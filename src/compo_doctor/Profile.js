// src/components/Profile.js
import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs, doc, addDoc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { useHistory } from 'react-router-dom'; // Import useHistory
import { useAuthValue } from '../contex/AuthContext';


  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     const q = query(collection(db, 'doctor'), where('uid', '==', '3T2WHohNaqdyUb2Ow9XI7MOCSGw1'));
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach(doc => {
  //       setUserProfile(doc.data());
  //       console.log(doc.data());
  //     });
  //   };

  //   if (userProfile) {
  //     fetchUserProfile();
  //   }
  // }, [userProfile]);



function Profile() {
  const { currentUser } = useAuthValue();
  const [userProfile, setUserProfile] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: '',
    birth: '',
    major: '',
    email: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRef = doc(db, 'doctor', '3T2WHohNaqdyUb2Ow9XI7MOCSGw1');
        const userDoc = await getDoc(userRef);
        const data = userDoc.data();
        setUserProfile(data);
        setEditedProfile(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchData();
  }, [currentUser]);

  const handleInputChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  const handleCloseForm = () => {
    setEditingProfile(false);
  }

  const handleEditProfile = () => {
    setEditingProfile(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, 'doctor', '3T2WHohNaqdyUb2Ow9XI7MOCSGw1');
      await updateDoc(userRef, editedProfile);
      setUserProfile(editedProfile); // Update user profile with edited profile
      setEditingProfile(false); // Exit editing mode
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user profile:', error);
      alert('Failed to update profile. Please try again later.');
    }
  };

  return (
    <div>
      <header className="header">
        <div className='back-link'>
          <Link to="/" className='nav-link'>Home</Link>
        </div>
        <div className='back-link'>
          <Link to="/Profile" className="nav-link">Profile</Link>
        </div>
        <div className='back-link'>
          <Link to="/AppointmentForm" className="nav-link">Book an Appointment</Link>
        </div>
        <div className='back-link'>
          <Link to="/AppointmentList" className="nav-link">Appointment List</Link>
        </div>
        <div className='back-link'>
          <Link to="/UpdatePatient" className="nav-link">Update Patient</Link>
        </div>
        <div className='back-link'>
          <Link to="/UpdateMedicine" className="nav-link">Update Medicine</Link>
        </div>
      </header>
      <div className="container">
        <div className="profile">
          <h2>Profile</h2>

          {editingProfile && (
            <div className="modal">
              <div className="modal-content">
              <span className="close" onClick={handleCloseForm}>
                  &times;
                </span>
                <h2>Update Profile</h2>
                <form onSubmit={handleFormSubmit} className="device-form">
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      id="name"
                      name="name"
                      placeholder="Name"
                      value={editedProfile.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="birth">Birth:</label>
                    <input
                      id="birth"
                      name="birth"
                      placeholder="Birth"
                      value={editedProfile.birth}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="major">Major:</label>
                    <input
                      id="major"
                      name="major"
                      placeholder="Major"
                      value={editedProfile.major}
                      onChange={handleInputChange}
                    />
                  </div>
                    <button type="submit">Save</button>
                </form>
                
              </div>
            </div>
          )}

          {userProfile && <h3 className="BS">BS. {userProfile.name}</h3> }
          <div className="information">
            <div className='in4'>
              <strong>
                <p>Name: </p>
                <p>Birth: </p>
                <p>Major: </p>
                <p>Email: </p>
              </strong>
            </div>
            {userProfile && (
              <div className='infor'>
                <p> {userProfile.name}</p>
                <p> {userProfile.birth}</p>
                <p> {userProfile.major}</p>
                <p> {userProfile.email}</p>
              </div>
            )}
          </div>
          <button className='button' onClick={() => {
            setEditedProfile(userProfile);
            setEditingProfile(true);
          }
          }>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;

            {/* <p>
              <span><strong>Email verified:</strong></span> <span className='infor'> {`${currentUser.emailVerified}`}</span> 
            </p> */}
