import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import DoctorDashboard from './pages/doctor/DoctorDashboard'
import PatientDashboard from './pages/patient/PatientDashboard'
import PharmacistDashboard from './pages/pharmacist/PharmacistDashboard'
import { AuthProvider } from './context/AuthContext'
import BrowseDoctors from './pages/patient/BrowseDoctors'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/pharmacist" element={<PharmacistDashboard />} />
          <Route path="/browse-doctors" element={<BrowseDoctors />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App