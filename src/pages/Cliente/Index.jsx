import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../../api/API";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
console.log("API_URL:", API_URL);

export default function Index() {
    const [seccionActiva, setSeccionActiva] = useState("consulta");

    const [productos, setProductos] = useState([]);

    const [contacto, setContacto] = useState({
        nombre: "",
        email: "",
        mensaje: ""
    });

    const [isLoadingProductos, setIsLoadingProductos] = useState(false);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                setIsLoadingProductos(true);
                const response = await API.get(`/productos/listarLimitado`);
                setProductos(response.data);
            } catch (error) {
                console.error("Error al obtener los productos:", error);
            }
        };
        fetchProductos();
        setIsLoadingProductos(false);
    }, []);

    const inputChange = (e) => {
        setContacto({ ...contacto, [e.target.name]: e.target.value });
    };

    const [isLoadingContacto, setIsLoadingContacto] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoadingContacto(true);
            const response = await API.post(`/contacto/enviar`, contacto);
            setIsLoadingContacto(false);
            if (response.status === 200) {
                setContacto({
                    nombre: "",
                    email: "",
                    mensaje: ""
                });
                Swal.fire({
                    icon: "success",
                    title: "Mensaje enviado",
                    text: "Tu mensaje ha sido enviado correctamente, nos pondremos en contacto con usted lo mas pronto posible."
                })
            }
        } catch (error) {
            setIsLoadingContacto(false);
            console.error("Error al enviar el correo:", error);
            Swal.fire({
                icon: "error",
                title: "Error al enviar el correo",
                text: "Hubo un problema al enviar el correo. Por favor, intenta nuevamente."
            })
        }
    };

    const renderContenido = () => {
        switch (seccionActiva) {
            case "consulta":
                return (
                    <>
                        <h3 className="mb-6">Consultas médicas especializadas</h3>
                        <p>
                            En la veterinaria Ciudad Canina, tenemos servicio de consulta médica con un médico veterinario con más de
                            20 años de experiencia, incluyendo servicios de esterilización, vacunaciones, desparasitaciones y controles.
                        </p>
                    </>
                );
            case "urgencias":
                return (
                    <>
                        <h3 className="mb-6">Servicio de urgencias</h3>
                        <p>
                            Contamos con un servicio de urgencias disponible 24/7 para atender cualquier situación médica que pueda
                            afectar a tu mascota. Tu tranquilidad y la salud de tu compañero son nuestra prioridad.
                        </p>
                    </>
                );
            case "productos":
                return (
                    <>
                        <h3 className="mb-6">Productos y servicios adicionales</h3>
                        <p>
                            Ofrecemos una amplia variedad de productos y servicios, desde alimentos premium hasta accesorios y
                            tratamientos especializados para el bienestar de tu mascota.
                        </p>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            {/* carousel */}
            <div id="carouselExampleIndicators" className="carousel slide position-relative" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="/img/Banner2.png" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="/img/Banner1.png" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="/img/Banner3.png" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                <div className="position-absolute top-50 end-0 translate-middle  py-0 px-5">
                    <h2 className="fs-1">Bienvenido a Veterinaria</h2>
                    <h2>Ciudad Canina</h2>
                    <p>Descubre la mejor gama de cuidado y servicios para la mascota</p>
                    <a href="#productos"><button className="btn btn-outline-primary">Conocer más</button></a>
                </div>
            </div>
            {/* Sección de Productos Nuevos */}
            <section className="bg-light-blue py-5" id="productos">
                <div className="container">
                    <h2 className="text-dark text-center mb-4">Productos Nuevos</h2>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5">
                        {isLoadingProductos && <p>Cargando productos...</p>}
                        {productos.length <= 0 ?
                            <p className="text-center w-100">No hay productos disponibles</p>
                            :
                            productos.map((producto) => (
                                <div key={producto.id_producto} className="col mb-4">
                                    <div className="card">
                                        <img src={`${API_URL}/PRODUCTOS_FOTOS/${producto.imagen}`} className="card-img-top" style={{ height: "200px", width: "100%", objectFit: "cover" }} alt="Producto 1" />
                                        <div className="card-body text-center">
                                            <h6>{producto.nombre_producto}</h6>
                                            <Link to={`/producto/${producto.id_producto}`} className="btn btn-primary">Comprar ahora</Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="text-center mt-4">
                        <Link to={"/productos"}> <a href=""><button className="btn btn-light bg-primary text-white">mostrar más</button></a>
                        </Link>
                    </div>

                </div>
            </section>

            {/* Sección de Servicios */}
            <section className="py-5 bg-light" id="nosotros">
                <div className=" container text-center mb-5 w-100 shadow p-5 rounded-5">
                    <h3>NOSOTROS</h3>
                    <br />
                    <p className="lead bg-info-emphasis">
                        Nuestra clínica está conformada por profesionales altamente capacitados, con amplia experiencia en atención veterinaria y un profundo amor por los animales. Cada uno de nuestros servicios ha sido cuidadosamente diseñado para brindar atención médica de alta calidad, considerando las necesidades individuales de cada uno de nuestros pacientes.
                    </p>
                    <a href="../Nosotros"><button className="btn btn-outline-primary">Conocer más</button></a>

                </div>
                <div className="container shadow p-5 rounded-5" id="servicios">
                    <h3 className="text-center mb-5 text-dark">SERVICIOS DISPONIBLES</h3>
                    <div>
                        <div className="mt-4">
                            <button className="btn btn-primary me-2 mb-2" onClick={() => setSeccionActiva("consulta")}>Consulta médica</button>
                            <button className="btn btn-primary me-2 mb-2" onClick={() => setSeccionActiva("urgencias")}>Servicio de urgencias</button>
                            <button className="btn btn-primary mb-2" onClick={() => setSeccionActiva("productos")}>Productos y servicios adicionales</button>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-6">{renderContenido()}</div>
                        <div className="col-md-6 text-center">
                            <img src="https://www.shutterstock.com/image-photo/happy-male-vet-doctor-uniform-260nw-2485692303.jpg" alt="Veterinario" className="img-fluid rounded-5" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de Contacto */}
            <section className="py-5" id="contacto">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mb-4 mb-md-0">
                            <h3 className="mb-4">CONTACTO</h3>
                            <form onSubmit={handleSubmit}>
                                {isLoadingContacto ?
                                    <div className="text-center p-5">
                                        <p>Enviando...</p>
                                        <div className="spinner-border" role="status">
                                            <i className="fa fa-paw"></i>
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <div className="mb-3">
                                            <input type="text" name="nombre" onChange={inputChange} className="form-control" placeholder="Nombre" />
                                        </div>
                                        <div className="mb-3">
                                            <input type="email" name="email" onChange={inputChange} className="form-control" placeholder="Email" />
                                        </div>
                                        <div className="mb-3">
                                            <textarea name="mensaje" onChange={inputChange} className="form-control" rows="4" placeholder="Mensaje"></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Enviar</button>
                                    </div>
                                }

                            </form>
                        </div>
                        <div className="col-md-6">
                            <h3 className="mb-4">INFORMACIÓN DE LA EMPRESA</h3>
                            <p>+57 321 234567</p>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.113582607661!2d-74.06409622404315!3d4.75029769522493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f85a6923946cd%3A0xaa100ebe70e38f1c!2sCIUDAD%20CANINA%20VETERINARIA!5e0!3m2!1ses!2sco!4v1732890164662!5m2!1ses!2sco"
                                width="600"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                            <div>
                                <a href="#" className="text-decoration-none me-3"><i className="fab fa-facebook"></i></a>
                                <a href="#" className="text-decoration-none me-3"><i className="fab fa-whatsapp"></i></a>
                                <a href="#" className="text-decoration-none"><i className="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
