import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import API from '../../api/api';

export default function InicioAdmin() {
    return (
        <div>
            <h3>Pedidos Pendientes</h3>
            <div className="card p-4">
                <div className="d-flex justify-content-between mb-3">
                    <button className="btn btn-outline-dark"><i className="bi bi-eye"></i></button>
                    <button className="btn btn-outline-dark"><i className="bi bi-funnel"></i></button>
                    <button className="btn btn-outline-dark"><i className="bi bi-file-earmark-spreadsheet"></i></button>
                    <button className="btn btn-outline-dark"><i className="bi bi-printer"></i></button>
                    <button className="btn btn-outline-dark"><i className="bi bi-search"></i></button>
                </div>
                <ul className="list-group">
                    {[...Array(4)].map((_, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            Luz Ariela - Mancha - Pedido de una purina MAX para cachorro raza Grande - 22/03/2024 - 3:00pm
                            <div>
                                <button className="btn btn-outline-success btn-sm me-2"><i className="bi bi-check"></i></button>
                                <button className="btn btn-outline-danger btn-sm"><i className="bi bi-trash"></i></button>
                            </div>
                        </li>
                    ))}
                </ul>
                <button className="btn btn-success mt-3" style={{ width: '250px' }}>Ver calendario</button>
            </div>
        </div>
    );
}