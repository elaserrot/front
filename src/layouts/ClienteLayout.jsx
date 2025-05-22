import React from 'react'
import { Outlet } from 'react-router-dom'
import NavegacionCliente from '../navigation/NavegacionCliente'
import Footer from '../components/Footer'

export default function ClienteLayout() {
    return (
        <div className="">
            <div className="vh-100">
                <NavegacionCliente />
                <Outlet />
                <Footer />
            </div>
        </div>
    )
}
