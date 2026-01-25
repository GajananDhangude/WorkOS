import React from 'react'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'

import Navbar from "../src/components/landing/Navbar.jsx"
import Login from './components/auth/login.jsx'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Navbar/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </Router>
      
    </AuthProvider>
  )
}
