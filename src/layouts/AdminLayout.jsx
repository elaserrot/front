import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderAdmin from '../navigation/HeaderAdmin'
import SidebarAdmin from '../navigation/SidebarAdmin'
import Footer from '../components/Footer'

export default function AdminLayout() {
    return (
        <div className="vh-100 d-flex flex-column">
            <HeaderAdmin />
            <div className="d-flex flex-grow-1">
                <SidebarAdmin />
                <div className="flex-grow-1 bg-light p-4">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    )
}
