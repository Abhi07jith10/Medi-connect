import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [role, setRole] = useState('patient')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!email || !password) {
      alert('Please fill in all fields')
      return
    }
    login({ name: email, role: role })
    if (role === 'doctor') navigate('/doctor')
    else if (role === 'patient') navigate('/patient')
    else navigate('/pharmacist')
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>MediConnect</h2>
        <p style={styles.subtitle}>Login to your account</p>

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

        <button style={styles.loginBtn} onClick={handleLogin}>
          Login
        </button>

        <p style={styles.registerText}>
          Don't have an account?{' '}
          <Link to="/register" style={styles.link}>Register here</Link>
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
    transition: 'all 0.2s',
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
  loginBtn: {
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
  registerText: {
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

export default Login