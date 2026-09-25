import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()


export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {

    const savedUser =
      localStorage.getItem('foodflowCurrentUser')

    return savedUser
      ? JSON.parse(savedUser)
      : null

  })


  // ================= SIGN UP =================

  const signup = (name, email, password) => {

    const users =
      JSON.parse(
        localStorage.getItem('foodflowUsers') || '[]'
      )


    const cleanName = name.trim()
    const cleanEmail = email.trim().toLowerCase()


    if (!cleanName || !cleanEmail || !password) {

      return {
        success: false,
        message: 'Please fill all the details.'
      }

    }


    if (password.length < 6) {

      return {
        success: false,
        message: 'Password must be at least 6 characters.'
      }

    }


    const existingUser =
      users.find(
        (item) =>
          item.email === cleanEmail
      )


    if (existingUser) {

      return {
        success: false,
        message: 'An account with this email already exists.'
      }

    }


    const newUser = {

      id: Date.now().toString(),

      name: cleanName,

      email: cleanEmail,

      password: password

    }


    users.push(newUser)


    localStorage.setItem(
      'foodflowUsers',
      JSON.stringify(users)
    )


    const currentUser = {

      id: newUser.id,

      name: newUser.name,

      email: newUser.email

    }


    setUser(currentUser)


    localStorage.setItem(
      'foodflowCurrentUser',
      JSON.stringify(currentUser)
    )


    return {
      success: true,
      message: 'Account created successfully!'
    }

  }


  // ================= LOGIN =================

  const login = (email, password) => {

    const users =
      JSON.parse(
        localStorage.getItem('foodflowUsers') || '[]'
      )


    const cleanEmail =
      email.trim().toLowerCase()


    const existingUser =
      users.find(
        (item) =>
          item.email === cleanEmail &&
          item.password === password
      )


    if (!existingUser) {

      return {
        success: false,
        message: 'Invalid email or password.'
      }

    }


    const currentUser = {

      id: existingUser.id,

      name: existingUser.name,

      email: existingUser.email

    }


    setUser(currentUser)


    localStorage.setItem(
      'foodflowCurrentUser',
      JSON.stringify(currentUser)
    )


    return {
      success: true,
      message: 'Login successful!'
    }

  }


  // ================= LOGOUT =================

  const logout = () => {

    setUser(null)

    localStorage.removeItem(
      'foodflowCurrentUser'
    )

  }


  return (

    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  )

}


// ================= CUSTOM HOOK =================

export function useAuth() {

  return useContext(AuthContext)

} 