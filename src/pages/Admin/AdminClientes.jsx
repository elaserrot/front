import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
;
import moment from 'moment';
import Swal from 'sweetalert2';
import API from '../../api/api';

;

export default function AdminClientes() {

    const [clientes, setClientes] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [isDataUpdated, setIsDataUpdated] = useState(false);

    useEffect(() => {
        const obtenerClientes = async () => {
            try {
                const response = await API.get(`/usuarios/clientes/`);
                setClientes(response.data);
            } catch (error) {
                console.error('Error al obtener clientes:', error);
            }
        };
        obtenerClientes();
        setIsDataUpdated(false);
    }, [isDataUpdated]);

    const eliminarCliente = async (id) => {
        const confirm = await Swal.fire({
            icon: 'question',
            title: 'Eliminar Cliente',
            text: '¿Estás seguro de eliminar este cliente?',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar',
        });
        if (!confirm.isConfirmed) {
            return;
        }
        const response = await API.delete(`/usuarios/eliminar/${id}`)
        if (response.status === 200) {
            await Swal.fire({
                icon: 'success',
                title: 'Cliente eliminado',
                text: 'El cliente ha sido eliminado con éxito.',
            })
            setIsDataUpdated(true);
        }
    };

    const clientesFiltrados = clientes
        .filter(cliente => {
            const term = busqueda.toLowerCase();
            const nombre_completo = cliente.nombre_completo.toLowerCase();
            return (
                nombre_completo.toLowerCase().includes(term)
            );
        });


    return (
        <div>
            <h2 className="mb-4">Clientes</h2>
            <div className="d-flex gap-2 mt-2">
                <Link to='/administrador'><button className="btn btn-primary mb-4">Volver a Inicio</button></Link>
            </div>
            {/* Buscador de mascota */}
            <div className="mb-3 d-flex gap-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar cliente..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>
            {/* Lista de mascotas */}
            <div className="row">
                {clientesFiltrados.length > 0 ? (
                    clientesFiltrados.map(cliente => (
                        <div id={cliente.id_usuario} key={cliente.id_usuario} className="col-md-12">
                            <div className="card mb-4">
                                <div className="card-body d-flex justify-content-between align-items-center">
                                    <h4 className="card-title">{cliente.nombre_completo}</h4>
                                    <div className="d-flex gap-2 mt-2">
                                        <button className="btn btn-primary" onClick={() => setClienteSeleccionado(cliente)}>Ver cliente</button>
                                        <button className="btn btn-danger" onClick={() => eliminarCliente(cliente.id_usuario)}>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p>No hay clientes registrados</p>
                    </div>
                )}
            </div>

            {/* Modal para mostrar información de la mascota */}
            <Modal show={clienteSeleccionado !== null} onHide={() => setClienteSeleccionado(null)} size="xl">
                <Modal.Header closeButton className="bg-primary text-white">
                    <Modal.Title><h1>{clienteSeleccionado?.Nombre_Mascota}</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row d-flex align-items-start">
                            <div className="col-md-4">
                                <img
                                    src={clienteSeleccionado?.imagen || "/img/dog_placeholder.png"}
                                    alt={clienteSeleccionado?.nombre_completo}
                                    className="img-fluid rounded"
                                    style={{ height: "300px", objectFit: "cover" }} />
                            </div>
                            <div className="col-md-4">
                                <p><b><strong>Dueño:</strong></b> {clienteSeleccionado?.nombre_completo}</p>
                                <p><b><strong>Telefono:</strong></b> {clienteSeleccionado?.telefono}</p>
                                <p><b><strong>Email:</strong></b> {clienteSeleccionado?.correo_electronico}</p>
                                <p><b><strong>Direccion:</strong></b> {clienteSeleccionado?.direccion}</p>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setClienteSeleccionado(null)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
