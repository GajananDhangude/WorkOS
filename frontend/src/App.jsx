import React from 'react'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'

import Navbar from "../src/components/landing/Navbar.jsx"

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          
        </Routes>
      </Router>
      
    </AuthProvider>
  )
}
