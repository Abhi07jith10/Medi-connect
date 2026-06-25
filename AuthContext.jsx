import { createContext, useContext, useState } from 'react'
import { patients as initialPatients, doctors as initialDoctors, appointments as initialAppointments } from '../data/mockData'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [patients, setPatients] = useState(initialPatients)
  const [doctors] = useState(initialDoctors)
  const [appointments, setAppointments] = useState(initialAppointments)

  const login = (userData) => setUser(userData)
  const logout = () => setUser(null)

  const updatePatient = (updatedPatient) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
    )
  }

  const bookAppointment = (patientId, doctor, slot, date) => {
    // Update patient data
    setPatients((prev) =>
      prev.map((p) =>
        p.id === patientId
          ? {
              ...p,
              appointmentDoctor: doctor.name,
              appointmentDate: date,
              appointmentTime: slot,
            }
          : p
      )
    )
    // Add to appointments list for doctor to see
    const newAppointment = {
      id: Date.now(),
      patientId,
      patientName: patients.find((p) => p.id === patientId)?.name,
      doctorId: doctor.id,
      doctorName: doctor.name,
      date,
      slot,
      status: 'Pending',
    }
    setAppointments((prev) => [...prev, newAppointment])
  }

  const updateAppointmentStatus = (appointmentId, status) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === appointmentId ? { ...a, status } : a))
    )
  }

  return (
    <AuthContext.Provider value={{
      user, login, logout,
      patients, updatePatient,
      doctors,
      appointments, bookAppointment, updateAppointmentStatus,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}