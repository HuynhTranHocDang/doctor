import { useState, useEffect, createContext, useContext } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuthValue } from './AuthContext';

// Create context
const AppointmentContext = createContext();

const AppointmentProvider = ({ children }) => {
  const { currentUser } = useAuthValue();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (currentUser) {
      // Fetch appointments for the current user from Firestore
      const fetchAppointments = async () => {
        const q = query(
          collection(db, 'appointments'),
          where('userId', '==', currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const appointmentData = [];
        querySnapshot.forEach((doc) => {
          appointmentData.push({ id: doc.id, ...doc.data() });
        });
        setAppointments(appointmentData);
      };

      fetchAppointments();
    }
  }, [currentUser]);

  // Function to update appointment data
  const updateAppointment = async (id, newData) => {
    const appointmentRef = doc(db, 'appointments', id);
    await updateDoc(appointmentRef, newData);
    // Update the local state with the updated data
    setAppointments(prevAppointments =>
      prevAppointments.map(appointment =>
        appointment.id === id ? { ...appointment, ...newData } : appointment
      )
    );
  };

  return (
    <AppointmentContext.Provider value={{ appointments, updateAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};

// Custom hook to use the appointment context
const useAppointmentContext = () => {
  return useContext(AppointmentContext);
};

export { AppointmentProvider, useAppointmentContext };
