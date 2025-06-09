import React, { useState, useEffect } from 'react';
import { Card } from "react-bootstrap";
;
import Swal from 'sweetalert2';
const BACKEND_URL = 'http://localhost:3001';

export default function AgregarProducto() {

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await API.get(`/categorias/listar`);
                setCategorias(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategorias();
    }, []);

    const [producto, setProducto] = useState({
        nombre_producto: "",
        descripcion: "",
        precio: "",
        stock: "",
        imagen: null,
        categoria: ""
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
            formData.append('categoria', producto.categoria);
            console.log(formData);
            const response = await API.post(`/productos/agregar`, formData);
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Producto agregado',
                    text: 'El producto ha sido agregado con éxito.',
                }).then(() => {
                    window.location.href = "/productosadmin";
                    setProducto({
                        nombre_producto: "",
                        descripcion: "",
                        precio: "",
                        stock: "",
                        imagen: null,
                    });
                })

            }
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
            <Card>
                <Card.Header className="bg-primary text-white text-center">
                    <h4>Agregar Nueva Mascota</h4>
                </Card.Header>
                <Card.Body>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group my-3 d-flex flex-column justify-content-center text-center align-items-center">
                            <label>Imagen:</label>
                            {imagePreview ? <img className="img-fluid w-25" src={imagePreview} alt="Preview" /> : <img className="img-fluid w-25" src="https://placehold.co/600x400" alt="Preview" />}
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
                            <input
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
                                <option disabled value={''}>Seleccione una categoria</option>
                                {categorias.map((categoria) => (
                                    <option key={categoria.id_cate} value={categoria.id_cate}>{categoria.nombre_Categoria}</option>
                                ))}
                            </select>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="align-self-center text-center btn btn-primary my-3">Agregar producto</button>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </div >
    );
};
