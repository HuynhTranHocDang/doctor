import './App.css';
import Home from './components/Home.js'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Profile from './components/Profile';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
import UpdatePatient from './components/UpdatePatient.js';
import UpdateMedicine from './components/UpdateMedicine.js';
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { AuthProvider } from './contex/AuthContext'
import { useState, useEffect } from 'react'


function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])
  return (
    
    <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
     <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/Profile" element={<Profile/>}/>
          <Route exact path="/AppointmentForm" element={<AppointmentForm/>}/>
          <Route exact path="/AppointmentList" element={<AppointmentList/>}/>
          <Route exact path="/UpdatePatient" element={<UpdatePatient/>}/>
          <Route exact path="/UpdateMedicine" element={<UpdateMedicine/>}/>
      </Routes>
      </AuthProvider>
  );
}

export default App;
