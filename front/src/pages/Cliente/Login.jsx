import React, { useState } from "react"
import { Link } from "react-router-dom"
import Footer from '../../components/Footer'
import axios from 'axios'
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        correo: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/usuarios/login', {
                correo: user.correo,
                password: user.password
            });

            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                localStorage.setItem('usuario', JSON.stringify(response.data.usuario));

                Swal.fire({
                    icon: 'success',
                    title: 'Inicio de sesión exitoso',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    navigate('/ClienteHome');
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error al iniciar sesión',
                text: 'Por favor, verifica tus credenciales.',
            });
        }
    };

    return (
        <div className="">
            <div className="vh-100 d-flex justify-content-center align-items-center " style={{
                backgroundImage: `url("https://hoylecohen.com/wp-content/uploads/login-page-bg.jpg")`
            }}>
                <div className="w-50 p-5">
                    <div className="card shadow p-5 rounded-5">
                        <div className="card-body ">
                            <div className="text-center mb-4">
                                <i className="display-1 fa fa-paw" aria-hidden="true"></i>
                                <h2 className="card-title">Clinica Veterinaria Ciudad Canina</h2>
                                <p className="text-muted">Iniciar Sesión</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                                    <input onChange={handleChange} type="email" className="form-control" name="correo" id="correo" placeholder="nombre@ejemplo.com" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <input onChange={handleChange} type="password" className="form-control" name="password" id="password" placeholder="Contraseña" required />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-success">Iniciar Sesión</button>
                                </div>
                            </form>
                            <div className="text-center mt-3">
                                <Link to="/recuperar" className="text-decoration-none">¿Olvidaste tu contrasena?</Link>
                                <br />
                                <Link to="/register" className="text-decoration-none">¿No tienes cuenta? Registrate</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

