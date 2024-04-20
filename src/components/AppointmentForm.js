// src/components/AppointmentForm.js
import React from 'react';
import { useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { getDoc, updateDoc, doc } from "firebase/firestore"; // Import các biến và hàm từ Firebase Firestore
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthValue } from '../contex/AuthContext';

const isValid = (e, date, time) => {
  if (e.appointments == null) {
      console.log('Appointment is valid');
      return true;
  }
  
  // Check if there are existing appointments that match the provided date and time
  const conflictingAppointment = e.appointments.find(appointment => appointment.date === date && appointment.time === time);
  
  if (!conflictingAppointment) {
      console.log('Appointment is valid');
      return true;
  }

  // If there is a conflicting appointment, it's invalid
  console.log('Appointment is not valid');
  return false;
};


const AppointmentForm = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [patient, setPatient] = useState('');
  const { currentUser } = useAuthValue();

  const bookAppointment = async (e) => {
    e.preventDefault();
    console.log('currentUser: ',currentUser);
    try {
        // Lấy tài liệu người dùng từ Firestore
        //currentUser.uid
        const userRef = doc(db, 'doctor', currentUser.uid);
        console.log('userRef: ',userRef);
        const userDoc = await getDoc(userRef);
        console.log('userDoc: ',userDoc);
        const userData = userDoc.data(); // Dữ liệu hiện tại của người dùng

        console.log('userData: ',userData);

        try{
            const qDoctor = query(collection(db, 'patient'), where('name', '==', 'doc'));
            const doctorsQuerySnapshot = await getDocs(qDoctor);
            const doctorsDoc = doctorsQuerySnapshot.docs[0];
            const doctorsData = doctorsDoc.data();

            if(isValid(doctorsData, date, time)){
                const updatedDoctorData = {
                    ...doctorsData,
                    appointments: [
                        ...doctorsData.appointments,
                    ]
                };
                
                
                    // Nếu mảng cuộc hẹn không rỗng, thêm cuộc hẹn mới vào cuối mảng
                    updatedDoctorData.appointments.push({
                        patientName: userData.name,
                        date: date,
                        time: time
                    });
                
                await updateDoc(doctorsDoc.ref, updatedDoctorData);
                
            }
            else{
                console.log('Appointment is not valid');
                return;
            }
          }
        catch(error){
            console.error('Error getting doctors: ', error);
        }

        // Cập nhật hoặc thêm các trường mới vào tài liệu người dùng
        const updatedUserData = {
            ...userData,
            appointments: [
                ...userData.appointments,
            ]
        };
        
            // Nếu mảng cuộc hẹn không rỗng, thêm cuộc hẹn mới vào cuối mảng
            updatedUserData.appointments.push({
                patientName: patient,
                date: date,
                time: time
            });

        // Cập nhật tài liệu người dùng với dữ liệu mới
        await updateDoc(userRef, updatedUserData);

        console.log('Appointment updated successfully!');
    } catch (error) {
        console.error('Error updating appointment: ', error);
    }
};

  return (
    <div>
      <div className="back-link">
        <Link to="/">Back</Link>
      </div>

      <header className="header">
        <h1 className="header-title">Appointment Form</h1>
      </header>
      
      <div className="container">
        <div className="appointment-form">
          <h2>Book an Appointment</h2>
          <form id="appointment-form"> 
            {/* <div className="appointment-submit">
              <label htmlFor="patient-name">Patient Name:</label>
              <input type="text" id="patient-name" name="patient-name" required />
            </div>
            
            <div className="appointment-submit">
              <label htmlFor="appointment-date">Appointment Date:</label>
              <input type="date" id="appointment-date" name="appointment-date" required />
            </div>
            
            <div className="appointment-submit">
              <label htmlFor="appointment-time">Time:</label>
              <input type="time" id="appointment-time" name="appointment-time" required />
            </div>
              Add more input fields as needed */}

              <form onSubmit={bookAppointment}>
                    <label htmlFor="patient-name">Patient Name: </label>
                    <input
                        type="text"
                        id="patient-name" name="patient-name"
                        value={patient}
                        onChange={(e) => setPatient(e.target.value)}
                        required
                    />
                    <p></p>
                    <label htmlFor="appointment-date">Appointment Date: </label>
                    <input
                        type="date"
                        id="appointment-date" name="appointment-date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                    <p></p>
                    <label htmlFor="appointment-time">Time: </label>
                    <input
                        type='time'
                        id="appointment-time" name="appointment-time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                    <p></p>              
                  <button type="submit" className="button">Submit</button>
                </form>
              <div className="appointment-submit">
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;
