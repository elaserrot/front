import React, { useState } from "react";
import Footer from '../../components/Footer'
import { Card } from "react-bootstrap";
import axios from 'axios';
import Swal from 'sweetalert2';

const BACKEND_URL = "http://localhost:3001";

function RegistrarMascota() {
    const token = localStorage.getItem("token");
    const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const id = decodedToken ? decodedToken.id : null;

    const [mascota, setMascota] = useState({
        Nombre_Mascota: "",
        Fecha_nacimiento: "",
        Raza_Mascota: "",
        Edad_Mascota: "",
        ID_Usuario: id,
    });

    const [preview, setPreview] = useState(null); // Previsualización de la imagen

    const handleChange = (e) => {
        setMascota({ ...mascota, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMascota({ ...mascota, imagen: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result); // Cargar previsualización
            };
            reader.readAsDataURL(file);
        }
    };

    const calcularEdad = (fechaNacimiento) => {
        if (!fechaNacimiento) return;
        
        const fechaNac = new Date(fechaNacimiento);
        const hoy = new Date();
        
        let edad = hoy.getFullYear() - fechaNac.getFullYear();
        const mes = hoy.getMonth() - fechaNac.getMonth();
        
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
            edad--;
        }
        
        setMascota(prevState => ({
            ...prevState,
            Edad_Mascota: edad
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BACKEND_URL}/api/mascota/agregarMascota`, mascota);
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Mascota agregada',
                    text: 'La mascota ha sido agregada con éxito.',
                }).then(() => {
                    window.location.href = '/PerfilUsuario';
                })
                setMascota({
                    Nombre_Mascota: "",
                    Fecha_nacimiento: "",
                    Raza_Mascota: "",
                    Edad_Mascota: "",
                    ID_Usuario: "",
                });
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                console.error('Error al agregar la mascota:', error);
            }
        }
    };

    return (
        <div>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <Card>
                            <Card.Header className="bg-primary text-white text-center">
                                <h4>Agregar Nueva Mascota</h4>
                            </Card.Header>
                            <Card.Body>
                                <form className="form" onSubmit={handleSubmit}>
                                    <div className="form-group my-3">
                                        <label>Nombre de la Mascota:</label>
                                        <input
                                            type="text"
                                            name="Nombre_Mascota"
                                            value={mascota.Nombre_Mascota}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group my-3">
                                        <label>Fecha de Nacimiento:</label>
                                        <input
                                            type="date"
                                            name="Fecha_nacimiento"
                                            value={mascota.Fecha_nacimiento}
                                            onChange={(e) => {
                                            handleChange(e); 
                                            calcularEdad(e.target.value); 
                                        }}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group my-3">
                                        <label>Raza de la Mascota:</label>
                                        <input
                                            type="text"
                                            name="Raza_Mascota"
                                            value={mascota.Raza_Mascota}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group my-3">
                                        <label>Edad de la Mascota:</label>
                                        <input
                                            type="number"
                                            name="Edad_Mascota"
                                            value={mascota.Edad_Mascota}
                                            onChange={handleChange}
                                            className="form-control"
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group my-3">
                                        <label>Observaciones de la Mascota:</label>
                                        <textarea
                                            name="Observaciones_Mascota"
                                            value={mascota.Observaciones_Mascota}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="align-self-center text-center btn btn-primary my-3">Agregar Mascota</button>
                                    </div>
                                </form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default RegistrarMascota;
