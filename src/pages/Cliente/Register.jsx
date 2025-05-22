import React, { useState } from 'react';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function Register() {
  const [user, setUser] = useState({
    nombreCompleto: '',
    correoElectronico: '',
    usuario: '',
    contrasena: '',
    confirmarContrasena: ''
  });

  const handleChange = (e) => {
    setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Agregar validaciones previas si es necesario (por ejemplo, confirmar que las contraseñas coinciden)
    if (user.contrasena !== user.confirmarContrasena) {
      Swal.fire({
        icon: 'error',
        title: 'Las contraseñas no coinciden',
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/usuarios/agregar", user);
      console.log(response.data);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.href = '/login';
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: error.message
      });
    }
  };

  return (
    <div>
      <div className="vh-100 d-flex justify-content-center align-items-center" style={{
        backgroundImage: `url("https://hoylecohen.com/wp-content/uploads/login-page-bg.jpg")`
      }}>
        <div className="w-50 p-5">
          <div className="card shadow p-5 rounded-5">
            <div className=" text-dark text-center">
              <i className="display-2 fa fa-paw" aria-hidden="true"></i>
              <h2>Registro Clinica Veterinaria</h2>
              <h2>Ciudad Canina</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <h4 className="mb-3 text-center">Información del cliente</h4>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="nombrePropietario" className="form-label">Nombre Completo</label>
                    <input
                      type="text"
                      value={user.nombreCompleto}
                      onChange={handleChange}
                      id="nombrePropietario"
                      className="form-control"
                      placeholder="Nombre Completo"
                      name="nombreCompleto"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="usuario" className="form-label">Usuario</label>
                    <input
                      type="text"
                      value={user.usuario}
                      onChange={handleChange}
                      id="usuario"
                      className="form-control"
                      placeholder="Usuario"
                      name="usuario"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="emailPropietario" className="form-label">Correo Electrónico</label>
                    <input
                      type="email"
                      value={user.correoElectronico}
                      onChange={handleChange}
                      id="emailPropietario"
                      className="form-control"
                      placeholder="Correo electrónico"
                      name="correoElectronico"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="contrasena" className="form-label">Contraseña</label>
                    <input
                      type="password"
                      value={user.contrasena}
                      onChange={handleChange}
                      id="contrasena"
                      className="form-control"
                      placeholder="Contraseña"
                      name="contrasena"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="confirmarContrasena" className="form-label">Confirmar Contraseña</label>
                    <input
                      type="password"
                      value={user.confirmarContrasena}
                      onChange={handleChange}
                      id="confirmarContrasena"
                      className="form-control"
                      placeholder="Confirmar Contraseña"
                      name="confirmarContrasena"
                      required
                    />
                  </div>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-success w-100">Registrarse</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
