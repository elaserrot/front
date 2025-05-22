import React from 'react'

export default function InicioAdmin() {
    return (
        <div className="container-fluid vh-100">
            {/* <!-- Header --> */}


            <div className="row vh-100">
                {/* <!-- Sidebar --> */}
                <div className="col-2 bg-dark text-white p-0">
                    <div className="list-group list-group-flush">
                        <a href="#" className="list-group-item list-group-item-action bg-dark text-white py-3">
                            <i className="bi bi-house me-2"></i> Inicio
                        </a>
                        <a href="#" className="list-group-item list-group-item-action bg-dark text-white py-3">
                            <i className="bi bi-cart me-2"></i> Ventas
                        </a>
                        <a href="#" className="list-group-item list-group-item-action bg-dark text-white py-3">
                            <i className="bi bi-calendar2 me-2"></i> Agendamientos
                        </a>
                        <a href="#" className="list-group-item list-group-item-action bg-dark text-white py-3">
                            <i className="bi bi-box me-2"></i> Pedidos
                        </a>
                        <a href="#" className="list-group-item list-group-item-action bg-dark text-white py-3 mt-auto">
                            <i className="bi bi-gear me-2"></i> Configuración
                        </a>
                    </div>
                </div>

                {/* <!-- Main Content --> */}
                <div className="col-10 bg-light p-4">
                    <h2 className="text-center mb-4">CLINICA VETERINARIA CIUDAD CANINA</h2>

                    <div className="row mb-5">
                        {/* <!-- Appointments Box --> */}
                        <div className="col-6">
                            <div className="card">
                                <div className="card-header bg-primary text-white">
                                    {/* Agendados hoy */}
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Vacunación - Kira - 20/03/2024</li>
                                        <li className="list-group-item">Vacunación - Kira - 20/03/2024</li>
                                        <li className="list-group-item">Vacunación - Kira - 20/03/2024</li>
                                        <li className="list-group-item">Vacunación - Kira - 20/03/2024</li>
                                    </ul>
                                    <a href="#" className="btn btn-link">Ver más...</a>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Orders Box --> */}
                        <div className="col-6">
                            <div className="card">
                                <div className="card-header bg-primary text-white">
                                    Pedidos hoy
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Purina - Kira - 20/03/2024</li>
                                        <li className="list-group-item">Nexgart - Keyla - 20/03/2024</li>
                                        <li className="list-group-item">Correa - Kira - 20/03/2024</li>
                                        <li className="list-group-item">Peluche - Kira - 20/03/2024</li>
                                    </ul>
                                    <a href="#" className="btn btn-link">Ver más...</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Bottom Icons --> */}
                    <div className="row justify-content-center text-center">
                        <div className="col-2">
                            <button className="btn btn-light border p-4">
                                <i className="bi bi-gear fs-3"></i>
                                <div className="mt-2">Configuración</div>
                            </button>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-light border p-4">
                                <i className="bi bi-cloud fs-3"></i>
                                <div className="mt-2">Cloud</div>
                            </button>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-light border p-4">
                                <i className="bi bi-paw fs-3"></i>
                                <div className="mt-2">Mascotas</div>
                            </button>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-light border p-4">
                                <i className="bi bi-file-text fs-3"></i>
                                <div className="mt-2">Reportes</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
