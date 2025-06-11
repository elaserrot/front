import React from 'react'
import { Link, useLocation } from 'react-router-dom';

export default function SidebarAdmin() {

    const location = useLocation();
    const ruta = location.pathname.split("/")[1];

    function rutaActiva(link) {
        return ruta === link ? "active" : "";
    }

    return (
        <div className="bg-dark text-white p-0 d-flex flex-column" style={{ width: '200px' }}>
            <div className="list-group list-group-flush">
                <Link to="/administrador" className={rutaActiva("administrador") ? "list-group-item list-group-item-action bg-success text-white py-3" : "list-group-item list-group-item-action bg-dark text-white py-3"}>
                    <i className="bi bi-house me-2"></i> Inicio
                </Link>
                <Link to="/ventas" className={rutaActiva("ventas") ? "list-group-item list-group-item-action bg-success text-white py-3" : "list-group-item list-group-item-action bg-dark text-white py-3"}>
                    <i className="bi bi-cart me-2"></i> Ventas
                </Link>
                <Link to="/productosadmin" className={rutaActiva("productosadmin") || rutaActiva("agregarProducto") ? "list-group-item list-group-item-action bg-success text-white py-3" : "list-group-item list-group-item-action bg-dark text-white py-3"}>
                    <i className="bi bi-boxes me-2"></i> Productos
                </Link>
                <Link to="/mascotas" className={rutaActiva("mascotas") || rutaActiva("agregarmascota") ? "list-group-item list-group-item-action bg-success text-white py-3" : "list-group-item list-group-item-action bg-dark text-white py-3"}>
                    <i className="fa fa-paw me-2"></i> Mascotas
                </Link>
                <Link to="/clientes" className={rutaActiva("clientes") || rutaActiva("agregarcliente") ? "list-group-item list-group-item-action bg-success text-white py-3" : "list-group-item list-group-item-action bg-dark text-white py-3"}>
                    <i className="bi bi-people me-2"></i> Clientes
                </Link>
                <Link to="/agendamiento" className={rutaActiva("agendamiento") ? "list-group-item list-group-item-action bg-success text-white py-3" : "list-group-item list-group-item-action bg-dark text-white py-3"}>
                    <i className="bi bi-calendar2 me-2"></i> Agendamientos
                </Link>
                <Link to="/reportes" className={rutaActiva("reportes") ? "list-group-item list-group-item-action bg-success text-white py-3" : "list-group-item list-group-item-action bg-dark text-white py-3"}>
                    <i className="bi bi-bar-chart-line"></i> Reportes
                </Link>
                {/* <Link to="/configuracion" className={rutaActiva("configuracion") ? "list-group-item list-group-item-action bg-success text-white py-3" : "list-group-item list-group-item-action bg-dark text-white py-3"}>
                    <i className="bi bi-gear me-2"></i> Configuración
                </Link> */}
            </div>
        </div>
    )
}
