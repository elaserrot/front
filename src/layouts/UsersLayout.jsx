import React from 'react'
import { Outlet } from 'react-router-dom'
import Navegacion from '../navigation/Navegacion'
import Footer from '../components/Footer'

export default function UsersLayout() {
    return (
        <div className="">
            <Navegacion />
            <Outlet />
            <Footer />
        </div>
    )
}