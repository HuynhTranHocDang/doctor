// src/components/AppointmentForm.js
import React from 'react';
import { useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { getDoc, updateDoc, doc } from "firebase/firestore"; // Import các biến và hàm từ Firebase Firestore
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthValue } from '../contex/AuthContext';



const UpdateMedicine = () => {

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

      
                {/* <label htmlFor='medicine-name'>Medicine: </label>
                <input
                    type='text'
                    className="medicine-name" name='medicine-name'
                    required
                />
                <p></p>

                <label htmlFor='quantity'>Quantity: </label>
                <input
                    type='number'
                    id="quantity" name='quantity'
                    required
                />
                <p></p>

                <button type='submit' className='button'>Submit</button> */}
      
      <div className="container">
        <div className="appointment-form">
          <h2>Update Medicine</h2>
              <form id="update-medicine">

                <div className='appoi-form'>
                  <div  className='form'>
                    <strong>
                    <p>
                        <label htmlFor='medicine-name'>Medicine: </label>
                    </p>
                    <p>
                        <label htmlFor='quantity'>Quantity: </label>
                    </p>
                    </strong>
                  </div>

                  <div className='form-ingr'>
                    <p>
                      <input
                        type='text'
                        className="medicine-name" name='medicine-name'
                        required
                      />
                    </p>
                    <p>
                      <input
                        type='number'
                        className="quantity" name='quantity'
                        required
                      />
                    </p>
                  </div>
                  <p></p>
                  </div>
                <button type="submit" className="button">Submit</button>
              </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateMedicine;
