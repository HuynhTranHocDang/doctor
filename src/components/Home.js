import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Profile from './Profile';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import { AuthProvider } from '../contex/AuthContext'
import { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

const Home = () => {

  return (
    <div>
      <header className="header-home">
        <h1 className="header-title">Doctor Appointment System</h1>
      </header>

      
      <div className="container" id="content">
        <nav>
          <ul>
            <li className="menu"><Link to="/Profile" className="nav-linki">Profile</Link></li>
            <li className="menu"><Link to="/AppointmentForm" className="nav-linki">Book an Appointment</Link></li>
            <li className="menu"><Link to="/AppointmentList" className="nav-linki">Appointment List</Link></li>
            <li className="menu"><Link to="/UpdatePatient" className="nav-linki">Update Patient</Link></li>
            <li className="menu"><Link to="/UpdateMedicine" className="nav-linki">Update Medicine</Link></li>

          </ul>
        </nav>
        {/* Content will be loaded dynamically here */}
      </div>
    </div>
  );
}

export default Home;
