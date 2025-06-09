import React, { useState, useEffect } from 'react';
;
import Swal from 'sweetalert2';

const BACKEND_URL = 'http://localhost:3001';

export default function Checkout() {
    const [isDataUpdated, setIsDataUpdated] = useState(false);

    const token = localStorage.getItem('token');
    const decoded_token = JSON.parse(atob(token.split('.')[1]));
    const id = decoded_token.id;

    const [formData, setFormData] = useState({
        correo: '',
        nombre: '',
        apellidos: '',
        telefono: '',
    });

    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        const fetchCarrito = async () => {
            try {
                const response = await API.get(`/carrito/listar/${id}`);
                setCarrito(response.data);
            } catch (error) {
                console.error("Error al obtener el carrito:", error);
            }
        };
        fetchCarrito();
        setIsDataUpdated(false);
    }, [isDataUpdated, id]);

    const total = carrito.reduce((acumulador, item) => acumulador + item.precio * item.cantidad, 0);

    const [codigo, setCodigo] = useState(null);
    const [preferenceId, setPreferenceId] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const iniciarPago = async (e) => {
        if (!formData.nombre || !formData.correo || !formData.apellidos || !formData.telefono) {
            return Swal.fire('Error', 'Todos los campos personales son obligatorios.', 'error');
        }
        if (carrito.length === 0) {
            return Swal.fire('Carrito vacío', 'Agrega al menos un producto al carrito para continuar.', 'warning');
        }

        e.preventDefault();
        const totalFinal = total;
        try {
            const body = {
                title: `Orden - ${carrito.map((producto) => `${producto.cantidad} ${producto.nombre_producto}`).join(', ')}`,
                unit_price: totalFinal,
            }
            console.log(body);
            const response = await fetch('http://localhost:3001/api/compras/crear-pago', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });


            const data = await response.json();
            console.log('Preferencia de pago creada:', data);
            setPreferenceId(data.id);
        } catch (error) {
            console.error('Error al crear preferencia de pago:', error);
            alert('Hubo un problema al iniciar el pago.');
        }
    };

    useEffect(() => {
        if (preferenceId) {
            const script = document.createElement('script');
            script.src = "https://www.mercadopago.com.co/integrations/v1/web-payment-checkout.js";
            script.setAttribute("data-preference-id", preferenceId);
            script.setAttribute("data-button-label", "Pagar ahora");
            script.setAttribute("data-header-color", "#007aff");

            const container = document.getElementById("wallet_container");
            if (container) {
                container.innerHTML = "";
                container.appendChild(script);
            }
        }
    }, [preferenceId]);

    const formatNumber = (value) => {
        const formattedValue = value.toString().replace(/\D/g, '');
        return formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    return (
        <div className="container my-5 shadow p-5 rounded-5">
            <div className="row">
                <div className="col-md-8">
                    <h3>1. Datos personales</h3>
                    <form onSubmit={iniciarPago} className='my-3'>
                        {/* Datos personales */}
                        <div className="row mb-3">
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Correo *</label>
                            <input type="email" className="form-control" name="correo" value={formData.correo} onChange={handleInputChange} required />
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Nombre *</label>
                                <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Apellidos *</label>
                                <input type="text" className="form-control" name="apellidos" value={formData.apellidos} onChange={handleInputChange} required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Teléfono *</label>
                            <input type="text" className="form-control" name="telefono" value={formData.telefono} onChange={handleInputChange} required />
                        </div>
                        <h3 className="mt-5">2. Método de entrega</h3>
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5>Punto de recogida (unico metodo de entrega)</h5>
                                <p><strong>Bogotá: Parque Colina</strong><br />Cra. 58d #146-51, Bogotá D.C.</p>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">
                            Ir al método de pago
                        </button>

                        <div id="wallet_container" className="my-4"></div>
                    </form>
                </div>

                <div className="col-md-4">
                    <h3>Resumen de tu orden</h3>
                    {
                        carrito.map((producto, index) => (
                            <div key={index} className="card mb-3">
                                <div className="card-body d-flex justify-content-between align-items-center">
                                    <img className='w-25 rounded' src={`${BACKEND_URL}/PRODUCTOS_FOTOS/${producto.imagen}`} alt="" />
                                    <span className=''>{producto.nombre_producto.substring(0, 25) + (producto.nombre_producto.length > 25 ? "..." : "")}</span>
                                    <span>${formatNumber(producto.precio)}</span>
                                </div>
                            </div>
                        ))
                    }
                    <div className="">
                        <div className="">
                            <h5>Resumen de la compra</h5>
                            <div className="d-flex justify-content-between"><span className='fw-bold'>Total</span><span>${formatNumber(total)}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
