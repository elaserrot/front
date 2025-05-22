import React from 'react'
import { Link, useLocation } from 'react-router-dom'


export default function Navegacion() {

    const location = useLocation();

    const ruta = location.pathname.split("/")[1];

    return (
        <div>
            <div className="bg-primary text-dark py-2 text-center bg-info">
                <p className="mb-0">La mejor opción para el cuidado de tu mascota</p>
            </div>

            <header className="bg-white py-3 border-bottom">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-4 d-flex align-items-center">
                            <Link to={"/"}><img src="/src/img/logovet.png" alt="Logo Veterinaria" className=" w-50 rounded-circle me-5" /></Link>
                            {/* <div className="input-group">
                                <input type="text" className="form-control" placeholder="Buscar..." />
                                <button className="btn btn-outline-secondary" type="button"><i className="fas fa-search"></i></button>
                            </div> */}
                        </div>
                        <div className="col-md-5 text-center">
                            <h1>Veterinaria Ciudad Canina</h1>
                        </div>
                        <div className="col-md-3 text-end">
                            <i class="bi bi-person"></i>
                            <Link to={"/PerfilUsuario"} className="text-decoration-none text-secondary me-3">PERFIL</Link>

                            <Link to={"/carrito"} className="text-decoration-none text-secondary">CARRITO</Link>
                            <i class="bi bi-cart4"></i>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <nav className="mt-4 bg-info text-center">
                        <ul className="nav d-flex justify-content-center text-center align-items-center">
                            <li className="nav-item "><a href="/ClienteHome" className="nav-link text-dark">Home</a></li>
                                         
                        </ul>
                    </nav>
                </div>
            </header>
        </div>
    )
}
