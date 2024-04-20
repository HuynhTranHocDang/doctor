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

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     const q = query(collection(db, 'doctor'), where('uid', '==', '3T2WHohNaqdyUb2Ow9XI7MOCSGw1'));
  //     const querySnapshot = await getDocs(q);
  //     const userDoc = querySnapshot.docs[0];
  //     const userData = userDoc.data();
  //       setUserProfile(userData);
  //       console.log(userData);
  //   };

  //   if (userProfile) {
  //     fetchUserProfile();
  //   }
  // }, [userProfile]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const q = query(collection(db, 'doctor'), where('uid', '==', '3T2WHohNaqdyUb2Ow9XI7MOCSGw1'));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        setUserProfile(doc.data());
        console.log(doc.data());
      });
    };

    if (userProfile) {
      fetchUserProfile();
    }
  }, [userProfile]);

  // const handleSignOut = () => {
  //   signOut(auth);
  // };


  return (
    
    <div>
       {/* <h1 className="header-title">Doctor Profile</h1> */}
        {/* <div className="back-link">
          <Link to="/" className='nav-link'>Home</Link>
          <Link to="/Profile" className="nav-link">Profile</Link>
          <Link to="/AppointmentForm" className="nav-link">Appointment Form</Link>
          <Link to="/AppointmentList" className="nav-link">Appointment List</Link>
          <Link to="/UpdatePatient" className="nav-link">Update Patient</Link>
          <Link to="/UpdateMedicine" className="nav-link">Update Medicine</Link>
        </div> */}

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
          <h3 className="BS">BS. AMded Asoe</h3>
          <div className="information">
            <div className='in4'>
              <strong>
                <p>Name: </p>
                <p>Type: </p>
                <p>Email: </p>
              </strong>
            </div>

            <div className='infor'>
              <p>Amded Asoe</p>                     {/*Name*/}
              <p>Cadiordy</p>                       {/*Type*/}
              <p>hocdang1289@gmail.com</p>          {/*email*/}
            </div>

            {/* <p>
              <span><strong>Email verified:</strong></span> <span className='infor'> {`${currentUser.emailVerified}`}</span> 
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
