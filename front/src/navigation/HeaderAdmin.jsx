import React from 'react'
import { Link } from 'react-router-dom'

export default function HeaderAdmin() {

    function cerrarSesion() {
        localStorage.removeItem("token");
        window.location.href = "/";
    }
    return (
        <header className="bg-primary text-white py-3 px-4 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
                <Link to="/administrador">
                    <img src="/src/img/logovet.png" alt="Logo Veterinaria" className="rounded-circle me-3" style={{ width: '90px', height: '90px' }} />
                </Link>
                <h2 className="m-0 text-center flex-grow-1">Administración Ciudad Canina</h2>
            </div>
            <div>
                <button className="btn btn-danger" onClick={cerrarSesion}>Cerrar Sesión</button>
            </div>
        </header>
    )
}

