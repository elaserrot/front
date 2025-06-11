import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
;
import moment from 'moment';
import Swal from 'sweetalert2';
import API from '../../api/api';

;

export default function AdminMascotas() {

    const [mascotas, setMascotas] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [mascotaEncontrada, setMascotaEncontrada] = useState(null);
    const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
    const [isDataUpdated, setIsDataUpdated] = useState(false);

    useEffect(() => {
        const obtenerMascotas = async () => {
            try {
                const response = await API.get(`/mascota/listarMascotas`);
                setMascotas(response.data);
            } catch (error) {
                console.error('Error al obtener mascotas:', error);
            }
        };
        obtenerMascotas();
        setIsDataUpdated(false);
    }, [isDataUpdated]);

    const eliminarMascota = async (id) => {
        const confirm = await Swal.fire({
            icon: 'question',
            title: 'Eliminar Mascota',
            text: '¿Estás seguro de eliminar esta mascota?',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar',
        });
        if (!confirm.isConfirmed) {
            return;
        }
        const response = await API.delete(`/mascota/eliminarMascota/${id}`)
        if (response.status === 200) {
            await Swal.fire({
                icon: 'success',
                title: 'Mascota eliminada',
                text: 'La mascota ha sido eliminada con éxito.',
            })
            setIsDataUpdated(true);
        }
    };

    const mascotasFiltradas = mascotas
        .filter(mascota => {
            const term = busqueda.toLowerCase();
            const mascota_nombre = mascota.Nombre_Mascota.toLowerCase();
            return (
                mascota_nombre.toLowerCase().includes(term)
            );
        });


    return (
        <div>
            <h2 className="mb-4"> Mascotas</h2>
            <div className="d-flex gap-2 mt-2">

                <Link to='/agregarmascota'><button className="btn btn-primary mb-4">Agregar Nueva Mascota</button></Link>
                <Link to='/administrador'><button className="btn btn-primary mb-4">Volver a Inicio</button></Link>

            </div>
            {/* Buscador de mascota */}
            <div className="mb-3 d-flex gap-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar Mascota"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>

            {mascotaEncontrada && (
                <div className="alert alert-success">
                    <h5>{mascotaEncontrada.nombre}</h5>
                    <p><strong>Id:</strong> {mascotaEncontrada.ID_Mascota}</p>
                    <p><strong>Nombre:</strong> {mascotaEncontrada.Nombre_Mascota}</p>
                    <p><strong>Edad:</strong> {mascotaEncontrada.Edad_Mascota}</p>
                    <p><strong>Raza:</strong> {mascotaEncontrada.Raza_Mascota}</p>
                    <p><strong>Genero:</strong> {mascotaEncontrada.Genero_Mascota}</p>
                </div>
            )}
            {/* Lista de mascotas */}
            <div className="row">
                {mascotasFiltradas.length > 0 ? (
                    mascotasFiltradas.map(mascota => (
                        <div id={mascota.ID_Mascota} key={mascota.ID_Mascota} className="col-md-12">
                            <div className="card mb-4">
                                <div className="card-body d-flex justify-content-between align-items-center">
                                    <h4 className="card-title">{mascota.Nombre_Mascota}</h4>
                                    <div className="d-flex gap-2 mt-2">
                                        <button className="btn btn-primary" onClick={() => setMascotaSeleccionada(mascota)}>Ver mascota</button>
                                        <button className="btn btn-danger" onClick={() => eliminarMascota(mascota.ID_Mascota)}>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p>No hay mascotas registradas</p>
                    </div>
                )}
            </div>

            {/* Modal para mostrar información de la mascota */}
            <Modal show={mascotaSeleccionada !== null} onHide={() => setMascotaSeleccionada(null)} size="xl">
                <Modal.Header closeButton className="bg-primary text-white">
                    <Modal.Title><h1>{mascotaSeleccionada?.Nombre_Mascota}</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row d-flex align-items-start">
                            <div className="col-md-4">
                                <img
                                    src={mascotaSeleccionada?.imagen || "/img/dog_placeholder.png"}
                                    alt={mascotaSeleccionada?.Nombre_Mascota}
                                    className="img-fluid rounded"
                                    style={{ height: "300px", objectFit: "cover" }} />
                            </div>

                            <div className="col-md-4">
                                <p><b><strong>Fecha de nacimiento:</strong></b> {moment(mascotaSeleccionada?.Fecha_nacimiento).format('DD/MM/YYYY')}</p>
                                <p><b><strong>Raza:</strong></b> {mascotaSeleccionada?.Raza_Mascota}</p>
                                <p><b><strong>Edad:</strong></b> {mascotaSeleccionada?.Edad_Mascota} {mascotaSeleccionada?.Edad_Mascota === 1 ? "año" : "años"}</p>
                            </div>


                            <div className="col-md-4">
                                <p><b><strong>Dueño:</strong></b> {mascotaSeleccionada?.nombre_completo}</p>
                                <p><b><strong>Telefono:</strong></b> {mascotaSeleccionada?.telefono}</p>
                                <p><b><strong>Email:</strong></b> {mascotaSeleccionada?.correo_electronico}</p>
                                <p><b><strong>Direccion:</strong></b> {mascotaSeleccionada?.direccion}</p>
                            </div>
                        </div>
                    </div>
                    {/* Sección de Observaciones */}
                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="border p-3 rounded">
                                <h5 className="fw-bold">Observaciones</h5>
                                <p>{mascotaSeleccionada?.Observaciones_Mascota || "No hay observaciones registradas."}</p>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setMascotaSeleccionada(null)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
