import React from 'react'
import Login from './Login'
import { Route, Routes } from 'react-router-dom'
import Register from './Register'
import Home from './Home'
import './App.css'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
