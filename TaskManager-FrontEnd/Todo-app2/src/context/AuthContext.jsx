import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token')
    return token ? { token } : null
  })

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', credentials)
      localStorage.setItem('token', response.data.jwtToken)
      setUser({ token: response.data.jwtToken, username: response.data.username })
    } catch (error) {
      //console.error('Login failed:', error.response?.data?.message || error.message)
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  }

  const signup = async (userData) => {
  //console.log("Sending data to backend:", userData); // Debugging

  try {
    const response = await axios.post('http://localhost:8080/api/auth/signup', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Signup failed:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};

  
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
