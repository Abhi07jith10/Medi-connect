import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Register() {
  const [role, setRole] = useState('patient')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [specialization, setSpecialization] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert('Please fill in all fields')
      return
    }
    login({ name, role, email, specialization })
    if (role === 'doctor') navigate('/doctor')
    else if (role === 'patient') navigate('/patient')
    else navigate('/pharmacist')
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>MediConnect</h2>
        <p style={styles.subtitle}>Create your account</p>

        <div style={styles.roleContainer}>
          {['patient', 'doctor', 'pharmacist'].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              style={{
                ...styles.roleBtn,
                backgroundColor: role === r ? '#2563eb' : '#f1f5f9',
                color: role === r ? '#fff' : '#334155',
              }}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        <input
          style={styles.input}
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {role === 'doctor' && (
          <select
            style={styles.input}
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          >
            <option value="">Select Specialization</option>
            <option value="General Physician">General Physician</option>
            <option value="Orthopedic">Orthopedic</option>
            <option value="Dentist (BDS)">Dentist (BDS)</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Pediatrician">Pediatrician</option>
          </select>
        )}

        <button style={styles.registerBtn} onClick={handleRegister}>
          Create Account
        </button>

        <p style={styles.loginText}>
          Already have an account?{' '}
          <Link to="/" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '420px',
  },
  title: {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e3a5f',
    marginBottom: '4px',
  },
  subtitle: {
    textAlign: 'center',
    color: '#64748b',
    marginBottom: '24px',
  },
  roleContainer: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
  },
  roleBtn: {
    flex: 1,
    padding: '10px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    marginBottom: '16px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  registerBtn: {
    width: '100%',
    padding: '13px',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '16px',
  },
  loginText: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: '14px',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: '600',
  },
}

export default Register