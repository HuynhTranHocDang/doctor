// src/components/AppointmentForm.js
import React from 'react';
import { useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { getDoc, updateDoc, doc } from "firebase/firestore"; // Import các biến và hàm từ Firebase Firestore
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthValue } from '../contex/AuthContext';

const UpdatePatient = () => {
  const [patient, setPatient] = useState('');
  const [date, setDate] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [health, setHealth] = useState('');
  const { currentUser } = useAuthValue();

  const updatePatient = async (e) => {
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

            const updatedPatientData = {
              ...patientsData,
              history: [
                  ...patientsData.history,
              ]
           };
          
          
            // Nếu mảng cuộc hẹn không rỗng, thêm cuộc hẹn mới vào cuối mảng
            updatedPatientData.history.push({
                Day_start: date,
                Diagnosis: diagnosis,
                Health_status: health
            }); 
          
            await updateDoc(patientsDoc.ref, updatedPatientData);
          }
        catch(error){
            console.error('Error getting patient: ', error);
        }

        console.log('Updated Patient successfully!');
    } catch (error) {
        console.error('Error Updated Patient: ', error);
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

         {/* <label htmlFor='patient-name'>Patient Name: </label>
                <input
                    type='text'
                    className="patient-name" name='patient-name'
                    required
                />
                <p></p>

                <label htmlFor='start-day'>Start day: </label>
                <input
                    type='date'
                    id="start-day" name='start-day'
                    required
                />
                <p></p>

                <label htmlFor='diagnosis'>Diagnosis: </label>
                <input
                    type='text'
                    className="diagnosis" name='diagnosis'
                    required
                />
                <p></p>

                <label htmlFor='health'>Health status: </label>
                <input
                    type='text'
                    className="health" name='health'
                    required
                />
                <p></p>

                <button type='submit' className='button'>Submit</button> */}



      
      <div className="container">
        <div className="appointment-form">
          <h2>Update Patient</h2>
              <form id="update-patient" onSubmit={updatePatient}>
             

                <div className='appoi-form'>
                  <div  className='form'>
                    <strong>
                    <p>
                        <label htmlFor="patient-time" >Patient: </label>
                    </p>
                    <p>
                        <label htmlFor='start-day'>Start day: </label>
                    </p>
                    <p>
                        <label htmlFor='diagnosis'>Diagnosis: </label>
                    </p>
                    <p>
                        <label htmlFor='health'>Health status: </label>
                    </p>
                    </strong>
                  </div>

                  <div className='form-ingr'>
                    <p>
                      <input
                            type='text'
                            className="patient-name" name='patient-name'
                            value={patient}
                            onChange={(e) => setPatient(e.target.value)}
                            required
                      />
                    </p>
                    <p>
                      <input
                        type='date'
                        id="start-day" name='start-day'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                      />
                    </p>
                    <p>
                      <input
                        type='text'
                        className="diagnosis" name='diagnosis'
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        required
                      />
                    </p>
                    <p>
                      <input
                        type='text'
                        className="health" name='health'
                        value={health}
                        onChange={(e) => setHealth(e.target.value)}
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

export default UpdatePatient;
