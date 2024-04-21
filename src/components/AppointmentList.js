// src/components/AppointmentList.js
import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, doc, addDoc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthValue } from '../contex/AuthContext';



function AppointmentList() {
  const { currentUser } = useAuthValue();
    const [userData, setUserData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRef = doc(db, 'doctor', '3T2WHohNaqdyUb2Ow9XI7MOCSGw1');
                const userDoc = await getDoc(userRef);
                const data = userDoc.data();
                console.log('userDoc:', data);
                
                setUserData(data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchData();
    }, [currentUser]);

    const deletePatientAppointments = async (appointment, doctorName) => {
        try {
            // Tìm tài liệu của bệnh nhân dựa trên tên
            const q = query(collection(db, 'patient'), where('name', '==', appointment.patientName));
            const querySnapshot = await getDocs(q);
            const patientDoc = querySnapshot.docs[0];
            
                // Lọc ra các cuộc hẹn có 'patientName' giống với 'patientName' cần xóa
                const patientAppointments = patientDoc.data().appointments || [];
                const updatedAppointments = patientAppointments.filter(appt => 
                    appt.date !== appointment.date || 
                    appt.time !== appointment.time || 
                    appt.doctorName !== doctorName // Corrected comparison
                );        
                // Cập nhật tài liệu với danh sách cuộc hẹn đã lọc

            await updateDoc(patientDoc.ref, { appointments: updatedAppointments });
            

    
            // Cập nhật trạng thái cục bộ để cập nhật giao diện người dùng
            
            console.log('Doctor appointments deleted successfully!');
        } catch (error) {
            console.error('Error deleting doctor appointments:', error);
        }
    };

    const deleteAppointment = async (appointment) => {
        try {

          // currentUser.uid
            const userRef = doc(db, 'doctor', '3T2WHohNaqdyUb2Ow9XI7MOCSGw1');
            const userDoc = await getDoc(userRef);
            // Find the document containing the appointment
                const userAppointments = userDoc.data().appointments || [];
                const updatedAppointments = userAppointments.filter(appt => 
                    appt.date !== appointment.date || 
                    appt.time !== appointment.time || 
                    appt.doctorName !== appointment.doctorName);
                console.log('updatedAppointments:', updatedAppointments);
                console.log('userAppointments:', userAppointments);
                console.log('appointment:', appointment);
                // Update the document with the updated appointments array
                await updateDoc(userRef, { appointments: updatedAppointments });

            // Update the local state to reflect the deletion
            setUserData({ ...userData, appointments: updatedAppointments });
                          
            console.log('Appointment deleted successfully!');
        } catch (error) {
            console.error('Error deleting appointment:', error);
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
        <div className="appointment-list">
          <h2>Appointment List</h2>
            <div className='calendar'>
            {userData && userData.appointments ? (
                    userData.appointments.map((appointment, index) => (
                        <ul key={index}>
                            <div className="appointment-item">
                                <p className="date">{appointment.date}</p>
                                <p className="time">{appointment.time}</p>
                                <p className="patient-name">{appointment.patientName}</p>
                                <button onClick={() => (deleteAppointment(appointment), deletePatientAppointments(appointment, userData.name))}>Cancel Appointment</button>
                            </div>
                        </ul>
                    ))
                ) : (
                    <ul>No appointments found</ul>
                )}
              </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentList;

            {/* <div className="calendar">

              <div className="appointment-item">
                <p className="date">April 15</p>
                <p className="time">10:30 AM</p>
                <p className="patient-name">Dr. John Doe</p>
              </div>

              <div className="appointment-item">
                <p className="date">April 16</p>
                <p className="time">11:00 AM</p>
                <p className="patient-name">Dr. Jane Smith</p>
              </div>

            </div> */}