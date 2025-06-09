import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
;
import moment from 'moment';
import API from '../../api/api';

const BACKEND_URL = 'http://localhost:3001';


export default function AdminVentas() {

    const [productos, setProductos] = useState([]);
    const [ventas, setVentas] = useState([]);
    const [isDataUpdated, setIsDataUpdated] = useState(false);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const response = await API.get(`/productos/listarLimitado`);
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        const obtenerVentas = async () => {
            try {
                const response = await API.get(`/compras/listar`);
                setVentas(response.data);
            } catch (error) {
                console.error('Error al obtener ventas:', error);
            }
        }
        obtenerProductos();
        obtenerVentas();
        setIsDataUpdated(false);
    }, [isDataUpdated]);

    return (
        <div>
            <h3 className="mb-4">Gestión de Ventas</h3>
            <Link to="/agregarventa" className="btn btn-primary mb-3">Generar ventas</Link>
            <div className="row">
                <div className="col-8">
                    <div className="card">
                        <div className="card-header bg-primary text-white">Productos Disponibles</div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                {productos.map(producto => (
                                    <li key={producto.id} className="list-group-item">{producto.nombre_producto} - ${producto.precio}</li>
                                ))}
                            </ul>
                            <Link to='/productosadmin' className="btn btn-link">Ver más productos...</Link>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-header bg-primary text-white">Últimas Ventas</div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                {ventas.length === 0 && <li className="list-group-item">No hay ventas registradas.</li>}
                                {ventas.slice(0, 5).map(venta => (
                                    <li key={venta.id} className="list-group-item">
                                        {venta.descripcion} - ${venta.monto}
                                    </li>
                                ))}
                            </ul>
                            <a href="#historial" className="btn btn-link">Ver historial completo...</a>
                        </div>
                    </div>
                </div>
                <div id="historial" className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className="fw-bold">Fecha</th>
                                <th>Descripción</th>
                                <th>Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventas.map(venta => (
                                <tr key={venta.id}>
                                    <td>
                                        <span className="fw-bold">
                                            {moment(venta.created_at).format('DD/MM/YYYY')}
                                        </span>
                                    </td>
                                    <td>{venta.descripcion}</td>
                                    <td>${venta.monto}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

