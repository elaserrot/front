import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import API from '../../api/api';
const AgregarCliente = () => {
  const [cliente, setCliente] = useState({
    nombre: "",
    documento: "",
    telefono: "",
    direccion: "",
    correo: ""


  });
  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cliente  agregado:", cliente);
    setCliente({ nombre: "", documento: "", telefono: "", direccion: "", correo: "" });

  };


  const handleAgregar = () => {
    alert("Usuario Agregado");

  };



  return (
    <div className="vh-100 d-flex flex-column">
      <header className="bg-primary text-white py-3 px-4 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <Link to="/administrador">
            <img src="/src/img/logovet.png" alt="Logo Veterinaria" className="rounded-circle me-3" style={{ width: '90px', height: '90px' }} />
          </Link>
          <h2 className="m-0 text-center flex-grow-1">Administración Ciudad Canina</h2>
        </div>
        <div>
          <button className="btn btn-outline-light me-2">Perfil</button>
          <button className="btn btn-danger">Cerrar Sesión</button>
        </div>
      </header>

      <div className="d-flex flex-grow-1">
        <div className="bg-dark text-white p-0 d-flex flex-column" style={{ width: '200px' }}>
          <div className="list-group list-group-flush">
            <a href="/administrador" className="list-group-item list-group-item-action bg-dark text-white py-3">
              <i className="bi bi-house me-2"></i> Inicio
            </a>
            <a href="/ventas" className="list-group-item list-group-item-action bg-dark text-white py-3">
              <i className="bi bi-cart me-2"></i> Ventas
            </a>
            <a href="/agendamientos" className="list-group-item list-group-item-action bg-dark text-white py-3">
              <i className="bi bi-calendar2 me-2"></i> Agendamientos
            </a>
            <a href="/pedidos" className="list-group-item list-group-item-action bg-dark text-white py-3">
              <i className="bi bi-box me-2"></i> Pedidos
            </a>
            <a href="/reportes" className="list-group-item list-group-item-action bg-dark text-white py-3">
              <i className="bi bi-bar-chart-line"></i> Reportes
            </a>
            <a href="/configuracion" className="list-group-item list-group-item-action bg-dark text-white py-3 mt-auto">
              <i className="bi bi-gear me-2"></i> Configuración
            </a>
          </div>
        </div>


        <Container className="mt-4 flex-grow-1">
          <Card>
            <Card.Header className="bg-primary text-white text-center">
              <h4>Agregar Nuevo Cliente</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={cliente.nombre}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>


                <Form.Group className="mb-3">
                  <Form.Label>Documento</Form.Label>
                  <Form.Control
                    type="number"
                    name="documento"
                    value={cliente.documento}
                    onChange={handleChange}
                    min="0"
                    onKeyDown={(e) => e.key === '-' && e.preventDefault()}

                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control
                    type="number"
                    name="telefono"
                    value={cliente.telefono}
                    onChange={handleChange}
                    min="0"
                    onKeyDown={(e) => e.key === '-' && e.preventDefault()}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Correo Electronico</Form.Label>
                  <Form.Control
                    type="email"
                    name="correo"
                    value={cliente.correo}
                    onChange={handleChange}
                    min="0"
                    onKeyDown={(e) => e.key === '-' && e.preventDefault()}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Direccion</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    value={cliente.direccion}
                    onChange={handleChange}
                    min="0"
                    onKeyDown={(e) => e.key === '-' && e.preventDefault()}
                  />
                </Form.Group>
                <Button variant="success" type="submit"
                  size="sm"
                  className="my-2 p-1 fs-6"
                  style={{ width: "150px" }}
                  onClick={handleAgregar}>
                  Agregar Cliente
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
        <div className="d-flex gap-2 mt-2">
          <Link to='/clientes'><button className="btn btn-primary mb-4">Volver</button></Link>
        </div>


      </div>

    </div>
  );
};
export default AgregarCliente;
