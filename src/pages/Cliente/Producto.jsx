import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import API from "../../api/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
export default function ProductView() {

    const [producto, setProducto] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const id_producto = window.location.pathname.split("/")[2];

    const token = localStorage.getItem("token");
    const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
    const id_usuario = decodedToken ? decodedToken.id : null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await API.post(`/carrito/agregar/${id_usuario}`, {
                cantidad: 1,
                id_producto: id_producto
            });
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error("Error al agregar el producto al carrito:", error);
        }
    };

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await API.get(`/productos/listar/${id_producto}`);
                setProducto(response.data[0]);
            } catch (error) {
                console.error("Error al obtener los productos:", error);
            }
        };
        fetchProducto();
    }, [id_producto]);

    return (
        <div>
            <div className="container mb-5 py-5">
                <div className="row mb-5">
                    {/* Columna de imágen (izquierda) */}
                    <div className="col-md-8">
                        {/* Imágen*/}
                        <div className="d-flex">
                            <img
                                src={`${API_URL}/PRODUCTOS_FOTOS/${producto?.imagen}`}
                                className="img-fluid me-2 "
                                alt="Imagen pequeña 4"
                                data-bs-target="#carouselExample"
                                data-bs-slide-to="3"
                            />
                        </div>
                    </div>
                    {/* Columna de descripción (derecha) */}
                    <div className="col-md-4">
                        <div className="mt-4">
                            <h2 className="fw-bold display-3">{producto?.nombre_producto}</h2>
                            <p>{producto?.nombre_Categoria}</p>
                            <p>{producto?.descripcion}</p>
                            <p className="display-6">${producto?.precio}</p>
                            <form onSubmit={handleSubmit}>
                                <button type="submit" className="btn btn-success"> <i className="bi bi-cart-plus me-2"></i>Agregar al carrito</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};