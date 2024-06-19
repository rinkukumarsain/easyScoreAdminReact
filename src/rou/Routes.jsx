import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Provider from './Provider'
import Dashboard from '../routes/Dashboard'
import UsersTable from '../routes/UsersTable'
import AdminProfile from '../routes/adminProfile'
import Login from '../routes/Login'

function Routers() {
    const userProps = { type: true, };
    return (
        <Routes>
            <Route path='/' element={<Provider Components={Dashboard} />} />
            <Route path='/login' element={<Provider Components={Login} />} />
            <Route path='/Users' element={<UsersTable {...userProps} />} />
            <Route path='/adminProfile' element={<AdminProfile {...userProps} />} />
        </Routes>
    )
}

export default Routers