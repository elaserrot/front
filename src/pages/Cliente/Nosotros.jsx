
import React from "react";
import API from "../../api/api";
const Nosotros = () => {
    return (
        <section className="py-5 bg-light">
            {/* Hero Section */}
            <div className="   py-5 mb-5 ">
                <div className="container">
                    <div className="d-flex justify-content-center">
                    <div className="bg-primary text-white py-4 px-5 rounded-4 shadow text-center" style={{maxWidth: '800px'}}>
                        <h1 className="display-4 fw-bold">Veterinaria Ciudad Canina</h1>
                            <p className="lead mb-0">Cuidando a tus mascotas con amor y profesionalismo desde 2010</p>
                </div>
            </div>
        </div>
            </div>

            {/* Sobre Nosotros */}
            <div className="container mb-5">
                <div className="row g-5 align-items-center">
                    <div className="col-lg-6">
                        <img 
                            src="" 
                            alt="Equipo veterinario"    
                            className="img-fluid rounded-4 shadow-lg"
                        />
                    </div>
                    <div className="col-lg-6">
                        <h2 className="fw-bold mb-4 text-primary">Nuestra Historia</h2>
                        <p className="lead mb-4">
                            Fundada en 2010, Veterinaria Ciudad Canina nació del sueño de crear un espacio donde las mascotas recibieran atención médica de excelencia combinada con el cariño que se merecen.
                        </p>
                        <p>
                            Nuestra clínica está conformada por un equipo de profesionales altamente capacitados, con especializaciones en diversas áreas de la medicina veterinaria. Cada miembro de nuestro equipo comparte una pasión por el bienestar animal y se mantiene actualizado con las últimas técnicas y tratamientos.
                        </p>
                        <div className="mt-4">
                        </div>
                    </div>
                </div>
            </div>

            {/* Misión y Visión */}
            <div className="container mb-5">
                <div className="row g-4">
                    {/* Misión */}
                    <div className="col-md-6">
                        <div className="card h-100 border-0 shadow-sm rounded-4">
                            <div className="card-body p-4">
                                <div className="text-center mb-4">
                                    <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-bullseye text-primary" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10zm0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
                                            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
                                            <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-center mb-3 text-primary">Misión</h3>
                                <p className="text-center">
                                    Brindar atención veterinaria integral de alta calidad, combinando tecnología de punta con un trato cálido y personalizado. Nos comprometemos a ser aliados en la salud y bienestar de tus mascotas en cada etapa de su vida.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Visión */}
                    <div className="col-md-6">
                        <div className="card h-100 border-0 shadow-sm rounded-4">
                            <div className="card-body p-4">
                                <div className="text-center mb-4">
                                    <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-eye-fill text-primary" viewBox="0 0 16 16">
                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-center mb-3 text-primary">Visión</h3>
                                <p className="text-center">
                                    Ser reconocidos como el centro veterinario líder en nuestra región, destacando por nuestra excelencia médica, innovación constante y el vínculo de confianza que construimos con cada familia que confía en nosotros el cuidado de sus mascotas.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Valores */}
            <div className="container mb-5">
                <h2 className="text-center mb-5 fw-bold text-primary">Nuestros Valores</h2>
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-sm rounded-4">
                            <div className="card-body p-4 text-center">
                                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-heart-fill text-primary" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                    </svg>
                                </div>
                                <h4 className="mb-3">Compasión</h4>
                                <p>Tratamos a cada mascota como si fuera nuestra, con empatía y comprensión.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-sm rounded-4">
                            <div className="card-body p-4 text-center">
                                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-award-fill text-primary" viewBox="0 0 16 16">
                                        <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z"/>
                                        <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                                    </svg>
                                </div>
                                <h4 className="mb-3">Excelencia</h4>
                                <p>Buscamos la más alta calidad en todos nuestros servicios y atenciones.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-sm rounded-4">
                            <div className="card-body p-4 text-center">
                                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-shield-check text-primary" viewBox="0 0 16 16">
                                        <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                                        <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </div>
                                <h4 className="mb-3">Integridad</h4>
                                <p>Actuamos con honestidad y transparencia en cada diagnóstico y tratamiento.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recomendaciones */}
            <div className="container mb-5 bg-primary bg-opacity-10 rounded-4 p-5">
                <h2 className="text-center mb-4 fw-bold text-primary">Recomendaciones para Dueños</h2>
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="d-flex">
                            <div className="me-3 text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>
                            </div>
                            <div>
                                <h5>Chequeos regulares</h5>
                                <p className="mb-0">Programa visitas anuales para prevenir enfermedades y detectar problemas a tiempo.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex">
                            <div className="me-3 text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>
                            </div>
                            <div>
                                <h5>Vacunación al día</h5>
                                <p className="mb-0">Mantén el esquema de vacunación actualizado según las recomendaciones de nuestro equipo.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex">
                            <div className="me-3 text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>
                            </div>
                            <div>
                                <h5>Nutrición adecuada</h5>
                                <p className="mb-0">Consulta con nuestros especialistas para una dieta balanceada según la edad, raza y condición de tu mascota.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex">
                            <div className="me-3 text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>
                            </div>
                            <div>
                                <h5>Ejercicio diario</h5>
                                <p className="mb-0">Asegura actividad física regular adaptada a las necesidades de tu compañero peludo.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Nosotros;