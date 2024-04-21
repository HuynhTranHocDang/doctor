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
        const userRef = doc(db, 'doctor', '3T2WHohNaqdyUb2Ow9XI7MOCSGw1');
        console.log('userRef: ',userRef);
        const userDoc = await getDoc(userRef);
        console.log('userDoc: ',userDoc);
        const userData = userDoc.data(); // Dữ liệu hiện tại của người dùng

        console.log('userData: ',userData);

        try{
            const qPatient = query(collection(db, 'patient'), where('name', '==', patient));
            const patientsQuerySnapshot = await getDocs(qPatient);
            const patientsDoc = patientsQuerySnapshot.docs[0];
            const patientsData = patientsDoc.data();

            if(isValid(patientsData, date, time)){
                const updatedPatientData = {
                    ...patientsData,
                    appointments: [
                        ...patientsData.appointments,
                    ]
                };
                
                
                    // Nếu mảng cuộc hẹn không rỗng, thêm cuộc hẹn mới vào cuối mảng
                    updatedPatientData.appointments.push({
                        doctorName: userData.name,
                        date: date,
                        time: time
                    });
                
                await updateDoc(patientsDoc.ref, updatedPatientData);
                
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
        if(isValid(userData, date, time)){
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
          console.log('Appointment update successfull!')
        }
        else {
          console.log('Appoinment is not update!')
        };
    } catch (error) {
        console.error('Error updating appointment: ', error);
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

      {/* <label htmlFor="patient-name">Patient Name: </label>
                    <input
                        type="text"
                        className="patient-name" name="patient-name"
                        value={patient}
                        onChange={(e) => setPatient(e.target.value)}
                        required
                    />
                    <p></p>
                    <label htmlFor="appointment-date">Appointment Date: </label>
                    <input
                        type="date"
                        className="appointment-date" name="appointment-date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                    <p></p>
                    <label htmlFor="appointment-time">Time: </label>
                    <input
                        type='time'
                        className="appointment-time" name="appointment-time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                    <p></p>              
                  <button type="submit" className="button">Submit</button> */}
      
      <div className="container">
        <div className="appointment-form">
          <h2>Book an Appointment</h2>
            {/* <div className='appoi-form'> */}
              <form  onSubmit={bookAppointment}>
                <div className='appoi-form'>
                  <div  className='form'>
                    <strong>
                    <p  className='patient-name1'>
                    <label htmlFor="patient-name"  >Patient: </label>
                    </p>
                    <p  className="appointment-date1" >
                    <label htmlFor="appointment-date"  >Date: </label>
                    </p>
                    <p className="appointment-time1" >
                    <label htmlFor="appointment-time" >Time: </label>
                    </p>
                    </strong>
                  </div>

                  <div className='form-ingr'>
                    <p>
                      <input
                          type="text"
                          className="patient-name" name="patient-name"
                          value={patient}
                          onChange={(e) => setPatient(e.target.value)}
                          required
                      />
                    </p>
                    <p>
                      <input
                          type="date"
                          className="appointment-date" name="appointment-date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          required
                      />
                    </p>
                    <p>
                      <input
                          type='time'
                          className="appointment-time" name="appointment-time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          required
                      />
                    </p>
                  </div>
                  <p></p>
                  </div>
                <button type="submit" className="button">Submit</button>
                </form>
            {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;
