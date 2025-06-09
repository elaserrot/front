import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
;

const API = process.env.API_URL || "http://localhost:3001";
export default function CarritoCompras() {

    const token = localStorage.getItem('token');
    const decoded_token = JSON.parse(atob(token.split('.')[1]));
    const id = decoded_token.id;

    const [isDataUpdated, setIsDataUpdated] = useState(false);

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

    // Función para manejar el cambio de cantidad
    const manejarCantidad = (id_producto, operacion) => {
        try {
            if (operacion == "incrementar") {
                API.put(`/carrito/sumarCantidad/${id}`, { id_producto });
                setIsDataUpdated(true);
            } else if (operacion === "decrementar") {
                API.put(`/carrito/restarCantidad/${id}`, { id_producto });
                setIsDataUpdated(true);
            }
        }
        catch (error) {
            console.error("Error al actualizar la cantidad:", error);
        }
    };

    const eliminarProducto = async (id_producto) => {
        try {
            await API.delete(`/carrito/eliminarProducto/${id}`, { data: { id_producto } });
            setIsDataUpdated(true);
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    };

    const formatNumber = (value) => {
        const formattedValue = value.toString().replace(/\D/g, '');
        return formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    return (
        <div>
            <div>
                {/* header */}
                <div className="container my-5">
                    <h1 className="mb-4">Tu Carrito de Compras</h1>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">Productos en tu carrito</h5>
                                    <hr />
                                    {carrito.length === 0 && <p className="text-muted">Tu carrito esta vacio</p>}
                                    {carrito.map((producto) => (
                                        <div className="row mb-3" key={producto.id_producto}>
                                            <div className="col-md-3">
                                                <img
                                                    src={`${API_URL}/PRODUCTOS_FOTOS/${producto.imagen}`}
                                                    alt={producto.nombre_producto}
                                                    className="img-fluid rounded"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <h6>{producto.nombre_producto}</h6>
                                                <p className="text-muted">{producto.descripcion}</p>
                                                <div
                                                    className="input-group input-group-sm"
                                                    style={{ width: "120px" }}
                                                >
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        onClick={() => manejarCantidad(producto.id_producto, "decrementar")}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="text"
                                                        className="form-control text-center"
                                                        value={producto.cantidad}
                                                        readOnly
                                                    />
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        onClick={() => manejarCantidad(producto.id_producto, "incrementar")}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-md-3 text-end">
                                                <p className="fw-bold">
                                                    ${formatNumber(producto.precio * producto.cantidad)}
                                                </p>
                                                <button onClick={() => eliminarProducto(producto.id_producto)} className="btn btn-sm btn-outline-danger">
                                                    <i className="fas fa-trash"></i> Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Resumen del Pedido</h5>
                                    <hr />
                                    {carrito.length === 0 ?
                                        <p className="text-muted">Tu carrito esta vacio</p>
                                        :
                                        <div className="d-flex justify-content-between mb-4">
                                            <span className="fw-bold">Total</span>
                                            <span className="fw-bold">
                                                $
                                                {(
                                                    formatNumber(carrito.reduce(
                                                        (total, producto) =>
                                                            total + producto.precio * producto.cantidad,
                                                        0
                                                    )
                                                    ))}
                                            </span>
                                        </div>
                                    }
                                    {carrito.length === 0 ?
                                        <div>
                                            <Link to="/productos" className="btn btn-primary w-100">Añadir Productos</Link>
                                        </div>
                                        :
                                        <Link to="/pago" className="btn btn-primary w-100">Proceder al Pago</Link>
                                    }
                                </div>
                            </div>
                            <div className="mt-3">
                                <Link to={"/productos"} className="text-decoration-none">
                                    <i className="fas fa-arrow-left me-2"></i>Continuar Comprando
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
