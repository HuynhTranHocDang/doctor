import './App.css';
import Home from './compo_doctor/Home.js'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Profile from './compo_doctor/Profile.js';
import AppointmentForm from './compo_doctor/AppointmentForm.js';
import AppointmentList from './compo_doctor/AppointmentList.js';
import UpdatePatient from './compo_doctor/UpdatePatient.js';
import UpdateMedicine from './compo_doctor/UpdateMedicine.js';
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
