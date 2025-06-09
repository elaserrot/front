import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import moment from 'moment';

const API_URL = process.env.API_URL || "http://localhost:3001";
export default function AdminAgendamiento() {

    const [citas, setCitas] = useState([]);

    const [isDataUpdated, setIsDataUpdated] = useState(false);

    const [cita, setCita] = useState({
        Usuario: '',
        Fecha: '',
        Motivo: '',
        Estado: '',
        Mascota: ''
    });

    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const response = await API.get(`/citas/listarCitas`);
                setCitas(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCitas();
        setIsDataUpdated(true);
    }, [isDataUpdated]);

    const [filtro, setFiltro] = useState('pendiente');
    const citasFiltradas = citas.filter((cita) => cita.Estado_Cita === filtro);

    const cambiarEstadoCita = async (id, nuevoEstado) => {
        try {
            const confirm = await Swal.fire({
                title: '¿Estás seguro de cambiar el estado de la cita?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, cambiar',
                cancelButtonText: 'Cancelar'
            })
            if (!confirm.isConfirmed) {
                return;
            }
            const response = await API.put(`/citas/cambiarEstado/${id}`, { Estado_Cita: nuevoEstado });

            if (response.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Estado de la cita cambiado con éxito',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsDataUpdated(false);
        }
    }
    return (
        <div className="container">
            {/* Tabla de citas agendadas */}
            <div className="card mt-5">
                <div className="card-header d-flex justify-content-between bg-primary text-white">
                    <h5 className="card-title">Citas agendadas</h5>
                    <select className='btn bg-white text-dark' name="filtro" id="filtro" value={filtro} onChange={(e) => setFiltro(e.target.value) || setIsDataUpdated(true)}>
                        <option value="pendiente">Pendientes</option>
                        <option value="confirmada">Confirmadas</option>
                        <option value="rechazada">Rechazadas</option>
                    </select>
                </div>
                <div className="card-body">
                    <table className="w-100 border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="border p-2">Cliente</th>
                                <th className="border p-2">Mascota</th>
                                <th className="border p-2">Fecha</th>
                                <th className="border p-2">Hora</th>
                                <th className="border p-2">Motivo</th>
                                <th className="border p-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {citasFiltradas.length === 0 && <tr><td colSpan="6" className="border p-2 text-center">No hay citas</td></tr>}
                            {citasFiltradas.map((cita) => (
                                <tr key={cita.ID_Citas} className="text-center">
                                    <td className="border p-2">{cita.nombre_completo}</td>
                                    <td className="border p-2">{cita.Nombre_Mascota}</td>
                                    <td className="border p-2">{moment(cita.Fecha_Cita).format('YYYY-MM-DD')}</td>
                                    <td className="border p-2">{moment(cita.Fecha_Cita).format('HH:mm')}</td>
                                    <td className="border p-2">{cita.Motivo_Cita}</td>
                                    <td className="border p-2">
                                        {cita.Estado_Cita === 'pendiente' && (
                                            <div>
                                                <button onClick={() => cambiarEstadoCita(cita.ID_Citas, 'confirmada')} className="btn btn-success rounded me-2">Confirmar</button>
                                                <button onClick={() => cambiarEstadoCita(cita.ID_Citas, 'rechazada')} className="btn btn-danger rounded">Rechazar</button>
                                            </div>
                                        )}
                                        {cita.Estado_Cita === 'confirmada' && (
                                            <div>
                                                <button onClick={() => cambiarEstadoCita(cita.ID_Citas, 'pendiente')} className="btn btn-warning rounded me-2">Colocar pendiente</button>
                                                <button onClick={() => cambiarEstadoCita(cita.ID_Citas, 'rechazada')} className="btn btn-danger rounded">Rechazar</button>
                                            </div>
                                        )}
                                        {cita.Estado_Cita === 'rechazada' && (
                                            <div>
                                                <button onClick={() => cambiarEstadoCita(cita.ID_Citas, 'confirmada')} className="btn btn-success rounded me-2">Confirmar</button>
                                                <button onClick={() => cambiarEstadoCita(cita.ID_Citas, 'pendiente')} className="btn btn-warning rounded me-2">Colocar pendiente</button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}   