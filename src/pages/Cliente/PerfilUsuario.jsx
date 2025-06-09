import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import moment from "moment";
const BACKEND_URL = "http://localhost:3001";

export default function PerfilUsuario() {

    const [isDataUpdated, setIsDataUpdated] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(null);
    const [newImage, setNewImage] = useState(null);
    const [mascotas, setMascotas] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const id = decodedToken ? decodedToken.id : null;

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await API.get(`/usuarios/perfil/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(response.data.usuario);
            } catch (error) {
                console.error("Error al obtener perfil:", error);
                Swal.fire({
                    icon: "error",
                    title: "Hubo un error al obtener el perfil.",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        };
        const fetchMascotas = async () => {
            try {
                const response = await API.get(`/mascota/cliente/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMascotas(response.data);
            } catch (error) {
                console.error("Error al obtener mascotas:", error);
                Swal.fire({
                    icon: "error",
                    title: "Hubo un error al obtener las mascotas.",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        };

        fetchMascotas();
        fetchProfile();
        setIsDataUpdated(false);
    }, [token, id, isDataUpdated]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
            setProfile((prev) => ({
                ...prev,
                imagen: URL.createObjectURL(file),
            }));
        }
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append('nombre_completo', profile.nombre_completo);
            formData.append('usuario', profile.usuario);
            formData.append('telefono', profile.telefono);
            formData.append('direccion', profile.direccion);

            if (newImage) {
                formData.append('imagen', newImage);
            }

            await API.put(`/usuarios/${profile.id_usuario}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setIsEditing(false);
            alert("Datos actualizados correctamente");
        } catch (error) {
            console.error("Error al actualizar:", error);
            alert("Hubo un error al actualizar los datos.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const eliminarMascota = async (id) => {
        const confirm = await Swal.fire({
            icon: 'question',
            title: 'Eliminar Mascota',
            text: '¿Estás seguro de eliminar esta mascota?',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar',
        });
        if (!confirm.isConfirmed) {
            return;
        }
        const response = await API.delete(`/mascota/eliminarMascota/${id}`)
        if (response.status === 200) {
            await Swal.fire({
                icon: 'success',
                title: 'Mascota eliminada',
                text: 'La mascota ha sido eliminada con éxito.',
            })
            setIsDataUpdated(true);
        }
    };

    const [mascotaEditar, setMascotaEditar] = useState({
        id_mascota: '',
        nombre: '',
        edad: '',
        fecha: '',
        raza: '',
        dueño: '',
    });

    const openModalEditar = async (mascota) => {
        setMascotaEditar({
            id_mascota: mascota.ID_Mascota,
            nombre: mascota.Nombre_Mascota,
            edad: mascota.Edad_Mascota,
            raza: mascota.Raza_Mascota,
            dueño: mascota.ID_Usuario,
            fecha: mascota.Fecha_nacimiento
        });
        setIsDataUpdated(true);
    };

    const handleModalInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'fecha') {
            const edad = calcularEdadDesdeFecha(value);
            setMascotaEditar(prev => ({
                ...prev,
                [name]: value,
                edad: edad
            }));
        } else {
            setMascotaEditar(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const calcularEdadDesdeFecha = (fechaString) => {
        if (!fechaString) return 0;

        const fechaNacimiento = new Date(fechaString);
        const hoy = new Date();

        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }

        return edad;
    };

    const handleModalSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.put(`/mascota/actualizarMascota/${mascotaEditar.id_mascota}`, mascotaEditar);
            if (response.status === 200) {
                const cerrarBoton = document.getElementById('cerrar');
                cerrarBoton.click();
                await Swal.fire({
                    icon: 'success',
                    title: 'Mascota actualizada',
                    text: 'La mascota ha sido actualizada con éxito.',
                })
            }
        } catch (error) {
            console.error("Error al actualizar la mascota:", error);
            Swal.fire({
                icon: "error",
                title: "Hubo un error al actualizar la mascota.",
                showConfirmButton: false,
                timer: 1500
            })
        } finally {
            setIsDataUpdated(true);
        }
    }

    if (!profile) return <div className="text-center mt-5">Cargando perfil...</div>;

    return (
        <div className="d-flex flex-column min-vh-100">


            <header className="bg-white py-3 border-bottom">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-4 d-flex align-items-center">
                            <img
                                src="/src/img/logovet.png"
                                alt="Logo Veterinaria"
                                className="w-25 rounded-circle me-5"
                            />
                        </div>
                        <div className="col-md-4 text-center">
                            <h1>Veterinaria Ciudad Canina</h1>
                        </div>
                        <div className="col-md-4 text-end">
                            <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesión</button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-grow-1">
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-md-8 mb-4">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Detalles del Perfil</h5>
                                    <button
                                        className="btn btn-primary btn-sm float-end"
                                        onClick={() => setIsEditing(!isEditing)}
                                    >
                                        {isEditing ? "Cancelar" : "Editar"}
                                    </button>
                                </div>
                                <div className="card-body">
                                    <div className="text-center mb-4">
                                        <img
                                            src={`http://localhost:3001/USUARIOS_FOTOS/${profile.imagen}`}
                                            className="rounded-circle mb-3"
                                            alt="Foto de perfil"
                                            width="150"
                                            height="150"
                                        />
                                        {isEditing && (
                                            <div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <hr />
                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Nombre</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="nombre_completo"
                                                    value={profile.nombre_completo}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                profile.nombre_completo
                                            )}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Usuario</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="usuario"
                                                    value={profile.usuario}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                profile.usuario
                                            )}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Correo</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {profile.correo_electronico}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Teléfono</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="telefono"
                                                    value={profile.telefono || ''}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                profile.telefono || 'No registrado'
                                            )}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Dirección</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="direccion"
                                                    value={profile.direccion || ''}
                                                    onChange={handleInputChange}
                                                />
                                            ) : (
                                                profile.direccion || 'No registrada'
                                            )}
                                        </div>
                                    </div>
                                    {isEditing && (
                                        <button className="btn btn-success mt-3" onClick={handleSave}>
                                            Guardar Cambios
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Mis Mascotas</h5>
                                </div>
                                <div className="card-body">
                                    {mascotas.length === 0 && <p>No tienes mascotas registradas.</p>}
                                    <Link to="/mascota" className="btn btn-primary mb-3">Agregar Mascota</Link>
                                    {
                                        mascotas.map((mascota) => (
                                            <div key={mascota.ID_Mascota} className="card mb-3">
                                                <div className="card-body">
                                                    <h5 className="card-title">{mascota.Nombre_Mascota}</h5>
                                                    <p className="card-text">Edad: {mascota.Edad_Mascota} {mascota.Edad_Mascota === 1 ? 'año' : 'años'}</p>
                                                    {mascota.Observaciones_Mascota ?
                                                        <p className="card-text text-primary">Observaciones: {mascota.Observaciones_Mascota}</p>
                                                        :
                                                        <p className="card-text text-muted">No hay observaciones</p>
                                                    }
                                                    <div className="d-flex">
                                                        <button className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#modalEditar" onClick={() => openModalEditar(mascota)}><i className="bi bi-pencil"></i></button>
                                                        <button className="btn btn-danger" onClick={() => eliminarMascota(mascota.ID_Mascota)}><i className="bi bi-trash"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="modal fade" id="modalEditar" tabIndex="-1" aria-labelledby="modalEditarLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <form onSubmit={handleModalSubmit}>
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="modalEditarLabel">{mascotaEditar?.nombre}</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="form-group">
                                                <label htmlFor="nombre">Nombre:</label>
                                                <input type="text" className="form-control" name="nombre" value={mascotaEditar?.nombre || ''} onChange={handleModalInputChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="edad">Edad:</label>
                                                <input type="text" min={0} max={50} className="form-control" name="edad" value={mascotaEditar?.edad ? `${mascotaEditar.edad}` : ''} onChange={handleModalInputChange} readOnly />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="edad">Fecha de Nacimiento:</label>
                                                <input
                                                    type="datetime-local"
                                                    className="form-control"
                                                    name="fecha"
                                                    value={moment(mascotaEditar?.fecha).format('YYYY-MM-DDTHH:mm') || ''}
                                                    onChange={handleModalInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button id="cerrar" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                            <button type="submit" className="btn btn-primary">Guardar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
};
