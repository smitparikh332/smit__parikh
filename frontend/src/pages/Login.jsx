import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {

  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {

    e.preventDefault()
    setError('')

    const result = login(email, password)

    if (!result.success) {
      setError(result.message)
      return
    }

    alert('Login successful! 🎉')
    navigate('/')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#fff8f3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px'
      }}
    >

      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'white',
          padding: '35px',
          borderRadius: '18px',
          boxShadow: '0 10px 35px rgba(0,0,0,0.10)'
        }}
      >

        <div
          style={{
            textAlign: 'center',
            marginBottom: '25px'
          }}
        >
          <div style={{ fontSize: '50px' }}>
            🍔
          </div>

          <h1>
            Welcome Back
          </h1>

          <p style={{ color: '#777' }}>
            Login to continue with FoodFlow
          </p>
        </div>

        {error && (
          <div
            style={{
              background: '#ffe8e8',
              color: '#c62828',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '18px'
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <label>
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '13px',
              margin: '8px 0 18px',
              boxSizing: 'border-box'
            }}
          />

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '13px',
              margin: '8px 0 22px',
              boxSizing: 'border-box'
            }}
          />

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              border: 'none',
              borderRadius: '9px',
              background: '#ff5a1f',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Login
          </button>

        </form>

        <p style={{ textAlign: 'center', marginTop: '25px' }}>
          Don't have an account?{' '}

          <Link
            to="/signup"
            style={{
              color: '#ff5a1f',
              fontWeight: 'bold'
            }}
          >
            Sign Up
          </Link>
        </p>

        <p style={{ textAlign: 'center' }}>
          <Link to="/">
            ← Back to Home
          </Link>
        </p>

      </div>

    </div>
  )
}

export default Login 