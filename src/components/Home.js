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
      <header className="header">
        <h1 className="header-title">Doctor Appointment System</h1>
      </header>
      <nav>
        <ul>
          <li className="menu"><Link to="/Profile" className="nav-link">Profile</Link></li>
          <li className="menu"><Link to="/AppointmentForm" className="nav-link">Appointment Form</Link></li>
          <li className="menu"><Link to="/AppointmentList"  id="appointment-list-link" className="nav-link">Appointment List</Link></li>
        </ul>
      </nav>
      <div className="container" id="content">
        {/* Content will be loaded dynamically here */}
      </div>
    </div>
  );
}

export default Home;
