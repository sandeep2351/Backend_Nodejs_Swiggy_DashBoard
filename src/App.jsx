import React from 'react'
import LandingPage from './Vendordashboard/pages/LandingPage'
import Notfound from './Vendordashboard/components/Notfound'
import "./App.css"
import { Routes,Route } from 'react-router-dom'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/*' element={<Notfound/>}/>
    </Routes>
    </>
  )
}

export default App