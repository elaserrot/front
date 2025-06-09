import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
;
import moment from 'moment';
import Swal from 'sweetalert2';
import API from '../../api/api';
const API = process.env.API_URL || "http://localhost:3001";

export default function AdminProductos() {

    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [isDataUpdated, setIsDataUpdated] = useState(false);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const response = await API.get(`/productos/listar`);
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };
        const fetchCategorias = async () => {
            try {
                const response = await API.get(`/categorias/listar`);
                setCategorias(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        obtenerProductos();
        fetchCategorias();
        setIsDataUpdated(false);
    }, [isDataUpdated]);

    const eliminarProducto = async (id) => {
        const confirm = await Swal.fire({
            icon: 'question',
            title: 'Eliminar producto',
            text: '¿Estás seguro de eliminar esta producto?',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar',
        });
        if (!confirm.isConfirmed) {
            return;
        }
        const response = await API.delete(`/productos/eliminar/${id}`)
        if (response.status === 200) {
            await Swal.fire({
                icon: 'success',
                title: 'Producto eliminado',
                text: 'El producto ha sido eliminada con éxito.',
            })
            setIsDataUpdated(true);
        }
    };

    const productosFiltrados = productos
        .filter(producto => {
            const term = busqueda.toLowerCase();
            const producto_nombre = producto.nombre_producto.toLowerCase();
            return (
                producto_nombre.toLowerCase().includes(term)
            );
        });

    const formatNumber = (value) => {
        const formattedValue = value.toString().replace(/\D/g, '');
        return formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const [producto, setProducto] = useState({
        id_producto: "",
        nombre_producto: "",
        descripcion: "",
        precio: "",
        stock: "",
        imagen: null,
        id_cate: 0
    });

    const handleChange = (e) => {
        setProducto({ ...producto, [e.target.name]: e.target.value });
    };

    const [imagePreview, setImagePreview] = useState(null);

    const handleFileChange = (e) => {
        setProducto({ ...producto, imagen: e.target.files[0] })
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('imagen', producto.imagen);
            formData.append('nombre_producto', producto.nombre_producto);
            formData.append('descripcion', producto.descripcion);
            formData.append('precio', producto.precio);
            formData.append('stock', producto.stock);
            formData.append('id_cate', producto.id_cate);
            console.log(producto);
            const response = await API.put(`/productos/actualizar/${producto.id_producto}`, formData);
            if (response.status === 200) {
                setIsDataUpdated(true);
                Swal.fire({
                    icon: 'success',
                    title: 'Producto editado',
                    text: 'El producto ha sido editado con éxito.',
                })
            }

            const botonCerrar = document.getElementById('botonCerrar');
            botonCerrar.click();

        } catch (error) {
            if (error.response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al agregar el producto',
                    text: error.response.data.message,
                })
            } else {
                console.error('Error al agregar el producto:', error);
            }
        }
    };

    return (
        <div>
            <h2 className="mb-4"> Productos</h2>
            <div className="d-flex gap-2 mt-2">

                <Link to='/agregarProducto'><button className="btn btn-primary mb-4">Agregar Nuevo Producto</button></Link>
                <Link to='/administrador'><button className="btn btn-primary mb-4">Volver a Inicio</button></Link>

            </div>
            {/* Buscador de productos */}
            <div className="mb-3 d-flex gap-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar producto"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>
            {/* Lista de productos */}
            <div className="row">
                {productosFiltrados.length > 0 ? (
                    productosFiltrados.map(producto => (
                        <div id={producto.id_producto} key={producto.id_producto} className="col-md-12">
                            <div className="card mb-4">
                                <div className="card-body d-flex justify-content-between align-items-center">
                                    <img
                                        src={`${API_URL}/PRODUCTOS_FOTOS/${producto?.imagen}`}
                                        alt={producto?.nombre_producto}
                                        className="rounded"
                                        style={{ height: "100px", width: "100px", objectFit: "cover" }} />
                                    <h4 className="card-title">{producto.nombre_producto}</h4>
                                    <div className="d-flex gap-2 mt-2">
                                        <button className="btn btn-primary" onClick={() => setProductoSeleccionado(producto)}>Ver producto</button>
                                        <button onClick={() => { setProducto(producto) }} type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editarModal">
                                            Editar
                                        </button>
                                        <button className="btn btn-danger" onClick={() => eliminarProducto(producto.id_producto)}>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p>No hay productos registrados</p>
                    </div>
                )}
            </div>
            <div class="modal fade" id="editarModal" tabindex="-1" aria-labelledby="editarModalLabel" aria-hidden="true">
                <form className="form" onSubmit={handleSubmit}>

                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="editarModalLabel">Editar producto</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div className="form-group my-3 d-flex flex-column justify-content-center text-center align-items-center">
                                    <label>Imagen:</label>
                                    {imagePreview ? <img src={imagePreview} alt="Preview" className="rounded" style={{ height: "100px", width: "100px", objectFit: "cover" }} />
                                        :
                                        <img src={`${API_URL}/PRODUCTOS_FOTOS/${producto?.imagen}`} alt={producto?.nombre_producto} className="rounded" style={{ height: "100px", width: "100px", objectFit: "cover" }} />
                                    }
                                    <input
                                        className='form-control w-50 my-3'
                                        type="file"
                                        name="imagen"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <div className="form-group my-3">
                                    <label>Nombre:</label>
                                    <input
                                        type="text"
                                        name="nombre_producto"
                                        value={producto.nombre_producto}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group my-3">
                                    <label>Descripción:</label>
                                    <textarea
                                        type="text"
                                        name="descripcion"
                                        value={producto.descripcion}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group my-3">
                                    <label>Precio:</label>
                                    <input
                                        type="number"
                                        step={50}
                                        min={0}
                                        name="precio"
                                        value={producto.precio}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group my-3">
                                    <label>Stock:</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={producto.stock}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group my-3">
                                    <label>Categoria:</label>
                                    <select className='form-control' name="categoria" value={producto.categoria} onChange={handleChange} id="">
                                        {categorias.map((categoria) => (
                                            <option key={categoria.id_cate} value={categoria.id_cate}>{categoria.nombre_Categoria}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button id='botonCerrar' type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-warning">Editar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {/* Modal para mostrar información del producto */}
            <Modal show={productoSeleccionado !== null} onHide={() => setProductoSeleccionado(null)} size="xl">
                <Modal.Header closeButton className="bg-primary text-white">
                    <Modal.Title><h1>{productoSeleccionado?.nombre_producto}</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row d-flex align-items-start">
                            <div className="col-md-4">
                                <img
                                    src={`${API_URL}/PRODUCTOS_FOTOS/${productoSeleccionado?.imagen}`}
                                    alt={productoSeleccionado?.nombre_producto}
                                    className="img-fluid rounded"
                                    style={{ height: "300px", objectFit: "cover" }} />
                            </div>
                            <div className="col-md-8">
                                <p><b><strong>Titulo: </strong></b>{productoSeleccionado?.nombre_producto}</p>
                                <p><b><strong>Precio: </strong></b>${formatNumber(productoSeleccionado?.precio || 0)}</p>
                                <p><b><strong>Stock: </strong></b> {productoSeleccionado?.stock} {productoSeleccionado?.stock > 1 ? "unidades" : "unidad"}</p>
                                <p><b><strong>Descripción: </strong></b>{productoSeleccionado?.descripcion || "No hay observaciones registradas."}</p>
                                <p><b><strong>Categoria: </strong></b>{productoSeleccionado?.nombre_Categoria}</p>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setProductoSeleccionado(null)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>


        </div >
    );
}
