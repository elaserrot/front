import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function Servicios() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(null); // Inicializa como null para saber si ya se verificó el login

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirige a login si no hay token
        } else {
            setIsLoggedIn(true); // Si hay token, el usuario está logueado
        }
    }, [navigate]);

    // Si isLoggedIn es null, significa que aún estamos verificando el login, así que mostramos un mensaje de carga.
    if (isLoggedIn === null) {
        return <div className="text-center mt-5">Verificando sesión...</div>;
    }

    return (
        <div>


            {/* <!-- Services Section --> */}
            <section className="bg-custom-blue py-5">
                <div className="container">
                    <h2 className="text-center mb-2 fw-bold">Servicios</h2>
                    <p className="text-center mb-5">Ofrecemos todo tipo de atención en Ciudad Canina.</p>

                    <div className="row g-4">
                        {/* <!-- Medicina General --> */}
                        <div className="col-md-6 col-lg">
                            <div className="card h-100 text-center bg-white">
                                <div className="card-body">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 1500 502  ">
                                        <path d="M192 48c0-26.5 21.5-48 48-48L400 0c26.5 0 48 21.5 48 48l0 464-80 0 0-80c0-26.5-21.5-48-48-48s-48 21.5-48 48l0 80-80 0 0-464zM48 96l112 0 0 416L48 512c-26.5 0-48-21.5-48-48L0 320l80 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L0 288l0-64 80 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L0 192l0-48c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48l0 48-80 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l80 0 0 64-80 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l80 0 0 144c0 26.5-21.5 48-48 48l-112 0 0-416 112 0zM312 64c-8.8 0-16 7.2-16 16l0 24-24 0c-8.8 0-16 7.2-16 16l0 16c0 8.8 7.2 16 16 16l24 0 0 24c0 8.8 7.2 16 16 16l16 0c8.8 0 16-7.2 16-16l0-24 24 0c8.8 0 16-7.2 16-16l0-16c0-8.8-7.2-16-16-16l-24 0 0-24c0-8.8-7.2-16-16-16l-16 0z" /></svg>
                                    <p className="card-text mb-4"></p>
                                    <h5 className="card-title mb-3">Medicina General</h5>
                                    <p className="card-text mb-5">Consulta de medicina veterinaria general para caninos y felinos menores de 7 años.</p>
                                    <Link to="/AgendamientoMedicina/MedicinaGeneral" className="btn btn-outline-primary">Agendar cita</Link>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Consulta Nutricional --> */}
                        <div className="col-md-6 col-lg">
                            <div className="card h-100 text-center bg-white">
                                <div className="card-body">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 1500 505">
                                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1l0 50.8c27.6 7.1 48 32.2 48 62l0 40c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l0-24c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 24c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-40c0-29.8 20.4-54.9 48-62l0-57.1c-6-.6-12.1-.9-18.3-.9l-91.4 0c-6.2 0-12.3 .3-18.3 .9l0 65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7l0-59.1zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" /></svg>
                                    <p className="card-text mb-3"></p>
                                    <h5 className="card-title mb-3">Consulta Nutricional</h5>
                                    <p className="card-text mb-4">Recomendaciones sobre comidas balanceadas respecto a sus nutrientes ajusta para los perros y gatos.</p>
                                    <Link to="/AgendamientoMedicina/ConsultaNutricional" className="btn btn-outline-primary">Agendar cita</Link>

                                </div>
                            </div>
                        </div>

                        {/* <!-- Vacunación --> */}
                        <div className="col-md-6 col-lg">
                            <div className="card h-100 text-center bg-white">
                                <div className="card-body">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 1500 505">
                                        <path d="M441 7l32 32 32 32c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-15-15L417.9 128l55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-72-72L295 73c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l55 55L422.1 56 407 41c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0zM210.3 155.7l61.1-61.1c.3 .3 .6 .7 1 1l16 16 56 56 56 56 16 16c.3 .3 .6 .6 1 1l-191 191c-10.5 10.5-24.7 16.4-39.6 16.4l-88.8 0L41 505c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l57-57 0-88.8c0-14.9 5.9-29.1 16.4-39.6l43.3-43.3 57 57c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-57-57 41.4-41.4 57 57c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-57-57z" /></svg>
                                    <p className="card-text mb-3"></p>
                                    <h5 className="card-title mb-4">Vacunación</h5>
                                    <p className="card-text mb-5">Guías para la vacunación de perros (caninos) y gatos (felinos).</p>
                                    <Link to="/AgendamientoMedicina/Vacunacion" className="btn btn-outline-primary">Agendar cita</Link>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Cardiología --> */}
                        <div className="col-md-6 col-lg">
                            <div className="card h-100 text-center bg-white">
                                <div className="card-body">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 1500 505">
                                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9l2.6-2.4C267.2 438.6 256 404.6 256 368c0-97.2 78.8-176 176-176c28.3 0 55 6.7 78.7 18.5c.9-6.5 1.3-13 1.3-19.6l0-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1l0 5.8c0 41.5 17.2 81.2 47.6 109.5zM432 512a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm47.9-225c4.3 3.7 5.4 9.9 2.6 14.9L452.4 356l35.6 0c5.2 0 9.8 3.3 11.4 8.2s-.1 10.3-4.2 13.4l-96 72c-4.5 3.4-10.8 3.2-15.1-.6s-5.4-9.9-2.6-14.9L411.6 380 376 380c-5.2 0-9.8-3.3-11.4-8.2s.1-10.3 4.2-13.4l96-72c4.5-3.4 10.8-3.2 15.1 .6z" /></svg>
                                    <p className="card-text mb-3"></p>
                                    <h5 className="card-title mb-3">Cardiología</h5>
                                    <p className="card-text mb-4">Consulta especializada de cardiología veterinaria para seguimiento y control del paciente.</p>
                                    <Link to="/AgendamientoMedicina/Cardiologia" className="btn btn-outline-primary">Agendar cita</Link>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Esterilización --> */}
                        <div className="col-md-6 col-lg">
                            <div className="card h-100 text-center bg-white">
                                <div className="card-body">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 1500 505">
                                        <path d="M269.4 2.9C265.2 1 260.7 0 256 0s-9.2 1-13.4 2.9L54.3 82.8c-22 9.3-38.4 31-38.3 57.2c.5 99.2 41.3 280.7 213.6 363.2c16.7 8 36.1 8 52.8 0C454.7 420.7 495.5 239.2 496 140c.1-26.2-16.3-47.9-38.3-57.2L269.4 2.9zM160.9 286.2c4.8 1.2 9.9 1.8 15.1 1.8c35.3 0 64-28.7 64-64l0-64 44.2 0c12.1 0 23.2 6.8 28.6 17.7L320 192l64 0c8.8 0 16 7.2 16 16l0 32c0 44.2-35.8 80-80 80l-48 0 0 50.7c0 7.3-5.9 13.3-13.3 13.3c-1.8 0-3.6-.4-5.2-1.1l-98.7-42.3c-6.6-2.8-10.8-9.3-10.8-16.4c0-2.8 .6-5.5 1.9-8l15-30zM160 160l40 0 8 0 0 32 0 32c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-48c0-8.8 7.2-16 16-16zm128 48a16 16 0 1 0 -32 0 16 16 0 1 0 32 0z" /></svg>
                                    <p className="card-text mb-4"></p>
                                    <h5 className="card-title mb-5">Esterilización</h5>
                                    <p className="card-text mb-4">Ofrecemos servicios de esterilización y castración para perros y gatos.</p>
                                    <Link to="/AgendamientoMedicina/Esterilizacion" className="btn btn-outline-primary">Agendar cita</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 
            <!-- WhatsApp Section --> */}
                    <div className="text-center mt-5">
                        <div className="d-inline-flex align-items-center bg-white rounded-pill px-4 py-2 shadow-sm">
                            <svg width="24" height="24" fill="#25D366" viewBox="0 0 24 24">
                                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13C14.09 12.94 13.84 13.1 13.59 13.35C13.34 13.6 12.97 14.23 12.72 14.48C12.47 14.74 12.21 14.77 11.97 14.63C11.72 14.5 10.91 14.24 9.95 13.37C9.2 12.71 8.69 11.89 8.43 11.63C8.18 11.38 8.42 11.13 8.63 10.91C9.07 10.43 9.5 9.93 9.58 9.67C9.66 9.42 9.62 9.21 9.56 9.02C9.5 8.83 8.97 7.59 8.76 7.09C8.55 6.6 8.33 6.67 8.08 6.66C7.84 6.65 7.69 6.65 7.53 6.65C7.37 6.65 7.1 6.71 6.87 6.96C6.65 7.21 6 7.82 6 9.03C6 10.25 6.89 11.42 7 11.59C7.14 11.76 8.76 14.26 11.25 15.32C12.84 16.02 13.3 16.07 13.66 16.18C14.25 16.37 14.79 16.34 15.22 16.28C15.7 16.21 16.68 15.68 16.89 15.1C17.1 14.52 17.1 14.03 17.04 13.92C16.97 13.82 16.81 13.76 16.56 13.65Z" />
                            </svg>
                            <span className="ms-2">Para más información contáctenos por medio de WhatsApp</span>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}