import React, { useState, useEffect } from 'react';
;
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";
import moment from 'moment';
import Swal from 'sweetalert2';
import API from '../../api/api';

const BACKEND_URL = 'http://localhost:3001';

export default function AdminReportes() {

    const [citas, setCitas] = useState([]);
    const [ventas, setVentas] = useState([]);
    const [isDataUpdated, setIsDataUpdated] = useState(false);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const response = await API.get(`/citas/listarCitas`);
                setCitas(response.data);
            } catch (error) {
                console.error('Error al obtener citas:', error);
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

    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const ventasPorMes = meses.map((mes, index) => {
        const total = ventas
            .filter(venta => moment(venta.created_at).month() === index)
            .reduce((suma, venta) => suma + venta.monto, 0);
        const citasMes = citas.filter(cita => moment(cita.created_at).month() === index).length;
        return { mes, total, citas: citasMes };
    });

    const citasPorMes = meses.map((mes, index) => {
        const citasMes = citas.filter(cita => moment(cita.Fecha_Cita).month() === index).length;
        return { mes, citas: citasMes };
    });

    return (
        <div>
            <h3 className="mb-4 text-gray-800 font-bold text-xl">Reportes</h3>

            {/* Gráfico de Ventas */}
            <div className="card mt-4">
                <div className="card-header bg-primary text-white">Ventas de la Semana</div>
                <div className="card-body">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={ventasPorMes}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="mes" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="total" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <br />
            {/* Gráfico de Citas */}
            <div className="card mt-4">
                <div className="card-header bg-primary text-white">Citas mensuales</div>
                <div className="card-body">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={citasPorMes}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="mes" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="citas" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Reporte General en Tabla */}
            <div className="card mt-4">
                <div className="card-header bg-primary text-white">Reporte General</div>
                <div className="card-body">
                    <table className="w-100 border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="border p-2">Mes</th>
                                <th className="border p-2">Ventas Totales</th>
                                <th className="border p-2">Citas Agendadas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventasPorMes.map((venta, index) => (
                                <tr key={index} className="text-center">
                                    <td className="border p-2">{venta.mes}</td>
                                    <td className="border p-2">${venta.total}</td>
                                    <td className="border p-2">{venta.citas}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
