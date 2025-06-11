import React from "react";
import { Link } from "react-router-dom";
import API from '../../api/api';


const pedidos = [
    { date: new Date(2025, 2, 5), title: "Pedido #101" },
    { date: new Date(2025, 2, 12), title: "Pedido #102" },
    { date: new Date(2025, 2, 18), title: "Pedido #103" },
];

const Calendar = () => {
    const currentMonth = new Date();
    const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    const days = [];
    let day = new Date(startDate);

    while (day <= endDate) {
        days.push(new Date(day));
        day.setDate(day.getDate() + 1);
    }

    const dayLabels = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

    return (
        <div className="container mt-4">
            <h2 className="mb-3 text-center">
                {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
            </h2>
            <button
                onClick={() => window.location.href = "/crear-pedido"}
                className="btn btn-primary mb-3"
            >
                Crear Pedido
            </button>
            <div className="table-responsive">
                <table className="table table-bordered text-center">
                    <thead>
                        <tr>
                            {dayLabels.map((label, index) => (
                                <th key={index} className="bg-light">{label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: Math.ceil(days.length / 7) }).map((_, weekIndex) => (
                            <tr key={weekIndex}>
                                {dayLabels.map((_, dayIndex) => {
                                    const day = days[weekIndex * 7 + dayIndex];
                                    return day ? (
                                        <td key={dayIndex} className="p-3">
                                            {day.getDate()}
                                            {pedidos.some(pedido => pedido.date.toDateString() === day.toDateString()) && (
                                                <div className="text-primary fw-bold">Pedido</div>
                                            )}
                                        </td>
                                    ) : <td key={dayIndex}></td>;
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const AdminHeader = () => {
    return (
        <header className="bg-primary text-white py-3 px-4 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
                <Link to="/administrador">
                    <img src="/img/logovet.png" alt="Logo Veterinaria" className="rounded-circle me-3" style={{ width: '90px', height: '90px' }} />
                </Link>
                <h2 className="m-0 text-center flex-grow-1">Administración Ciudad Canina</h2>
            </div>
            <div>
                <button className="btn btn-outline-light me-2">Perfil</button>
                <button className="btn btn-danger">Cerrar Sesión</button>
            </div>
        </header>
    );
};

const AdminPage = () => {
    return (
        <div>
            <AdminHeader />
            <Calendar />
        </div>
    );
};

export default AdminPage;