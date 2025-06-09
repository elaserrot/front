import React, { useState } from 'react';
import { Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
;
import Swal from 'sweetalert2';
import API from '../../api/api';
const BACKEND_URL = 'http://localhost:3001';

const AdminAgregarVenta = () => {
    const [venta, setVenta] = useState({
        payment_id: null,
        status: null,
        fecha_aprobacion: null,
        metodo_pago: "",
        monto: "",
        descripcion: "",
    });

    const handleChange = (e) => {
        setVenta({ ...venta, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post(`/compras/agregar`, venta);
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Venta creada',
                    text: 'La venta ha sido finalizada con exito.',
                }).then(() => {
                    window.location.href = "/ventas ";
                })
                setVenta({
                    payment_id: "",
                    status: "",
                    fecha_aprobacion: "",
                    metodo_pago: "",
                    monto: "",
                    descripcion: "",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al realizar la venta',
                text: error.response.data.message,
            })
        }
    };

    return (
        <div>
            <Card>
                <Card.Header className="bg-primary text-white text-center">
                    <h4>Agregar Venta</h4>
                </Card.Header>
                <Card.Body>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group my-3">
                            <label>Metodo de pago:</label>
                            <input
                                type="text"
                                name="metodo_pago"
                                value={venta.metodo_pago}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group my-3">
                            <label>Total:</label>
                            <input
                                type="text"
                                name="monto"
                                value={venta.monto}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group my-3">
                            <label>Descripción de la venta:</label>
                            <input
                                type="text"
                                name="descripcion"
                                value={venta.descripcion}
                                onChange={handleChange}
                                className="form-control"

                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="align-self-center text-center btn btn-primary my-3">Agregar Venta</button>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </div >
    );
};

export default AdminAgregarVenta;
