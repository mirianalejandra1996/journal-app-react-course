import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage, RegisterPage } from '../pages'


function AuthRoutes() {
  return (
    <Routes>
        <Route path='login' element={<LoginPage/>} />
        <Route path='register' element={<RegisterPage/>} />

        <Route path='/*' element={<Navigate to='login'/> }/>
    </Routes>
  )
}

export default AuthRoutes