import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import API from '../../api/api';

const ListaMascotas = () => {
    const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);

    const mascotas = [
        { id: 1, nombre: "Keyla", especie: "Perro", raza: "Bulldog", genero: "masculino", edad: 3, dueño: "Alisson" },
        { id: 2, nombre: "Napoleon", especie: "Perro", raza: "Bulldog", genero: "masculino", edad: 2, dueño: "Juan" },
        { id: 3, nombre: "Rocky", especie: "Gato", raza: "Leopardo", genero: "masculino", edad: 1, dueño: "Gilma" },
        { id: 4, nombre: "Toby", especie: "Perro", raza: "Labrador", genero: "masculino", edad: 4, dueño: "Martin" },
    ];

    return (
        <div className="vh-100 d-flex flex-column">
            {/* Header */}
            <header className="bg-primary text-white py-3 px-4 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <Link to="/administrador">
                        <img src="/src/img/logovet.png" alt="Logo Veterinaria" className="rounded-circle me-3" style={{ width: '90px', height: '90px' }} />
                    </Link>
                    <h2 className="m-0 text-center flex-grow-1">Administración Ciudad Canina</h2>
                </div>
                <div>
                    <button className="btn btn-outline-light me-2">Perfil</button>
                    <button className="btn btn-danger">Cerrar Sesión</button>
                </div>
            </header>

            <div className="d-flex flex-grow-1">
                <div className="bg-dark text-white p-0 d-flex flex-column" style={{ width: '200px' }}>
                    <div className="list-group list-group-flush">
                        <a href="/administrador" className="list-group-item list-group-item-action bg-dark text-white py-3">
                            <i className="bi bi-house me-2"></i> Inicio
                        </a>
                        <a href="/ventas" className="list-group-item list-group-item-action bg-dark text-white py-3">
                            <i className="bi bi-cart me-2"></i> Ventas
                        </a>
                        <a href="/agendamiento" className="list-group-item list-group-item-action bg-dark text-white py-3">
                            <i className="bi bi-calendar2 me-2"></i> Agendamientos
                        </a>
                        <a href="/pedidos" className="list-group-item list-group-item-action bg-dark text-white py-3">
                            <i className="bi bi-box me-2"></i> Pedidos
                        </a>
                        <a href="/reportes" className="list-group-item list-group-item-action bg-dark text-white py-3">
                            <i className="bi bi-bar-chart-line"></i> Reportes
                        </a>
                        <a href="/configuracion" className="list-group-item list-group-item-action bg-dark text-white py-3 mt-auto">
                            <i className="bi bi-gear me-2"></i> Configuración
                        </a>
                    </div>
                </div>
                <div className="col-md-8">
                    {mascotas.map((mascota) => (
                        <div key={mascota.id} className="card mb-3 p-3">
                            <h4>{mascota.nombre}</h4>
                            <p><b>Especie:</b> {mascota.especie} | <b>Raza:</b> {mascota.raza}</p>
                            <p><b>Género:</b> {mascota.genero} | <b>Edad:</b> {mascota.edad} años | <b>Dueño:</b> {mascota.dueño}</p>
                            <button className="btn btn-primary" onClick={() => setMascotaSeleccionada(mascota)}>Ver mascota</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal para mostrar información de la mascota */}
            <Modal show={mascotaSeleccionada !== null} onHide={() => setMascotaSeleccionada(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>{mascotaSeleccionada?.nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        {/* Sección de imagen y acciones */}
                        <div className="col-md-4 text-center">
                            <img
                                src="/src/img/dog_placeholder.png"
                                alt="Mascota"
                                className="img-fluid rounded mb-2"
                            />
                            <h3>{mascotaSeleccionada?.nombre}</h3>
                            <p>Número de historial: 1521</p>
                            <div className="d-flex gap-2 mt-2">
                                <button className="btn btn-success btn-sm mb-2">Subir foto</button>
                            </div>
                            <div className="d-flex gap-2 mt-2">
                                <button className="btn btn-primary btn-sm mb-2">Tomar Foto</button>
                            </div>
                            <div className="d-flex gap-2 mt-2">
                                <button className="btn btn-warning btn-sm mb-2">Cambiar foto</button>
                            </div>
                            <div className="d-flex gap-2 mt-2">
                                <button className="btn btn-danger btn-sm">Eliminar foto</button>
                            </div>
                        </div>

                        {/* Sección de información */}
                        <div className="col-md-8">
                            <p><b>Especie:</b> {mascotaSeleccionada?.especie}</p>
                            <p><b>Raza:</b> {mascotaSeleccionada?.raza}</p>
                            <p><b>Género:</b> {mascotaSeleccionada?.genero}</p>
                            <p><b>Edad:</b> {mascotaSeleccionada?.edad} años</p>
                            <p><b>Dueño:</b> {mascotaSeleccionada?.dueño}</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setMascotaSeleccionada(null)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>



        </div>
    );
};

export default ListaMascotas;
