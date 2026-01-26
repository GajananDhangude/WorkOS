import React from 'react'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'

import Navbar from "./components/shared/Navbar.jsx"
import Login from './components/auth/login.jsx'
import Home from './pages/Home.jsx'
import Footer from './components/shared/Footer.jsx'
import SignUp from "../../frontend/src/components/auth/SignUp.jsx"

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<SignUp/>} />
        </Routes>
        <Footer/>
      </Router>
      
    </AuthProvider>
  )
}
