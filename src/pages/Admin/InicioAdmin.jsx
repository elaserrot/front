import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
;
const BACKEND_URL = 'http://localhost:3001';
import moment from 'moment';
import API from '../../api/api';

export default function InicioAdmin() {

    const [agendados, setAgendados] = useState([]);
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const fetchAgendados = async () => {
            try {
                const response = await API.get(`/citas/listarCitas`);
                setAgendados(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        const fetchPedidos = async () => {
            try {
                const response = await API.get(`/pedidos/listarPedidos`);
                setPedidos(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchAgendados();
        fetchPedidos();
    }, []);

    return (
        <div>
            <div className="container text-center my-5">
                <h1>Bienvenido administrador</h1>
                <p>Esperamos que tengas un buen dia</p>
                {/* <div className="row">
                    <div className="col"></div>
                </div> */}
            </div>
            <div className="row mb-5">
                {/* Appointments Box */}
                <div className="col-12">
                    <div className="card">
                        <div className="card-header bg-primary text-white">Agendados</div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                {agendados.map((cita) => (
                                    <li className="list-group-item" key={cita._id}>
                                        {cita.Nombre_Mascota} - {cita.nombre_completo} - {moment(cita.Fecha_Cita).format('HH:mm')}
                                    </li>
                                ))}
                            </ul>
                            <a href="#" className="btn btn-link">Ver más...</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Icons */}
            <div className="row justify-content-center text-center align-items-center">
                <div className="col-2">
                    <Link to='/configuracion'>
                        <button className="btn btn-light border p-4">
                            <i className="bi bi-gear fs-3"></i>
                            <div className="mt-2">Configuración</div>
                        </button>
                    </Link>
                </div>
                <div className="col-2">
                    <Link to='/mascotas'>
                        <button className="btn btn-light border p-4">
                            <i className="fa fa-paw fs-3"></i>
                            <div className="mt-2">Mascotas</div>
                        </button>
                    </Link>
                </div>
                <div className="col-2">
                    <button className="btn btn-light border p-4">
                        <i className="bi bi-file-text fs-3"></i>
                        <div className="mt-2">Reportes</div>
                    </button>
                </div>
            </div>
        </div>
    );
}