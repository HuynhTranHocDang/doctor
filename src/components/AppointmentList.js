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
                const userRef = doc(db, 'doctor', currentUser.uid);
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

    const deleteDoctorAppointments = async (appointment, doctorName) => {
        try {
            // Tìm tài liệu của bệnh nhân dựa trên tên
            const q = query(collection(db, 'patient'), where('name', '==', appointment.patientName));
            const querySnapshot = await getDocs(q);
            const doctorDoc = querySnapshot.docs[0];
            
                // Lọc ra các cuộc hẹn có 'patientName' giống với 'patientName' cần xóa
                const doctorAppointments = doctorDoc.data().appointments || [];
                const updatedAppointments = doctorAppointments.filter(appt => 
                    appt.date !== appointment.date || 
                    appt.time !== appointment.time || 
                    appt.doctorName !== doctorName // Corrected comparison
                );        
                // Cập nhật tài liệu với danh sách cuộc hẹn đã lọc

            await updateDoc(doctorDoc.ref, { appointments: updatedAppointments });
            

    
            // Cập nhật trạng thái cục bộ để cập nhật giao diện người dùng
            
            console.log('Doctor appointments deleted successfully!');
        } catch (error) {
            console.error('Error deleting doctor appointments:', error);
        }
    };

    const deleteAppointment = async (appointment) => {
        try {
            const userRef = doc(db, 'doctor', currentUser.uid);
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
      <div className="back-link">
        <Link to="/">Back</Link>
      </div>

      <header className="header">
        <h1 className="header-title">Appointment List</h1>
      </header>
      
      <div className="container">
        <div className="appointment-list">
          <h2>Appointment List</h2>
            <div className="calendar">
              {/* <!-- Ngày 1 --> */}
              <div className="appointment-item">
                <p className="date">April 15</p>
                <p className="time">10:30 AM</p>
                <p className="patient-name">Dr. John Doe</p>
              </div>
              {/* <!-- Ngày 2 --> */}
              <div className="appointment-item">
                <p className="date">April 16</p>
                <p className="time">11:00 AM</p>
                <p className="patient-name">Dr. Jane Smith</p>
              </div>

            </div>
            {userData && userData.appointments ? (
                    userData.appointments.map((appointment, index) => (
                        <li key={index}>
                            <div className="appointment-item">
                                <p className="date">{appointment.date}</p>
                                <p className="time">{appointment.time}</p>
                                <p className="patient-name">{appointment.doctorName}</p>
                                <button onClick={() => (deleteAppointment(appointment), deleteDoctorAppointments(appointment, userData.name))}>Cancel Appointment</button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No appointments found</li>
                )}
        </div>
      </div>
    </div>
  );
}

export default AppointmentList;
