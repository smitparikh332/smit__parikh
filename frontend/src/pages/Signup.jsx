import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


function Signup() {

  const navigate = useNavigate()

  const { signup } = useAuth()


  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] =
    useState('')

  const [error, setError] = useState('')


  const handleSignup = (e) => {

    e.preventDefault()

    setError('')


    if (password !== confirmPassword) {

      setError(
        'Passwords do not match.'
      )

      return

    }


    const result =
      signup(
        name,
        email,
        password
      )


    if (!result.success) {

      setError(result.message)

      return

    }


    alert(
      'Account created successfully! 🎉'
    )

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
          maxWidth: '450px',
          background: 'white',
          padding: '35px',
          borderRadius: '18px',
          boxShadow:
            '0 10px 35px rgba(0,0,0,0.10)'
        }}
      >

        {/* Header */}

        <div
          style={{
            textAlign: 'center',
            marginBottom: '25px'
          }}
        >

          <div
            style={{
              fontSize: '50px'
            }}
          >
            🍔
          </div>


          <h1
            style={{
              margin: '10px 0',
              color: '#222'
            }}
          >
            Create Your Account
          </h1>


          <p
            style={{
              color: '#777'
            }}
          >
            Join FoodFlow today
          </p>

        </div>


        {/* Error */}

        {error && (

          <div
            style={{
              background: '#ffe8e8',
              color: '#c62828',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '18px',
              fontSize: '14px'
            }}
          >
            {error}
          </div>

        )}


        {/* Form */}

        <form
          onSubmit={handleSignup}
        >

          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold'
            }}
          >
            Full Name
          </label>


          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={{
              width: '100%',
              padding: '13px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              marginBottom: '18px',
              boxSizing: 'border-box',
              fontSize: '15px'
            }}
          />


          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold'
            }}
          >
            Email
          </label>


          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={{
              width: '100%',
              padding: '13px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              marginBottom: '18px',
              boxSizing: 'border-box',
              fontSize: '15px'
            }}
          />


          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold'
            }}
          >
            Password
          </label>


          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={{
              width: '100%',
              padding: '13px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              marginBottom: '18px',
              boxSizing: 'border-box',
              fontSize: '15px'
            }}
          />


          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold'
            }}
          >
            Confirm Password
          </label>


          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            style={{
              width: '100%',
              padding: '13px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              marginBottom: '22px',
              boxSizing: 'border-box',
              fontSize: '15px'
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
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Create Account
          </button>

        </form>


        {/* Login */}

        <p
          style={{
            textAlign: 'center',
            marginTop: '25px',
            color: '#777'
          }}
        >

          Already have an account?{' '}

          <Link
            to="/login"
            style={{
              color: '#ff5a1f',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}
          >
            Login
          </Link>

        </p>


        <div
          style={{
            textAlign: 'center',
            marginTop: '15px'
          }}
        >

          <Link
            to="/"
            style={{
              color: '#555',
              textDecoration: 'none',
              fontSize: '14px'
            }}
          >
            ← Back to Home
          </Link>

        </div>

      </div>

    </div>

  )

}


export default Signup 