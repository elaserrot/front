import React, { useEffect, useState } from 'react'

import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import moment from 'moment'
import API from '../../api/api'



export default function MisCompras() {

    const [compras, setCompras] = useState([])
    const [isDataUpdated, setIsDataUpdated] = useState(false)

    const token = localStorage.getItem('token')
    const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null
    const id = decodedToken ? decodedToken.id : null

    useEffect(() => {
        const obtenerCompras = async () => {
            try {
                const response = await API.get(`/compras/listar/cliente/${id}`)
                setCompras(response.data)
            } catch (error) {
                console.error('Error al obtener las compras:', error)
            }
        }
        obtenerCompras()
        setIsDataUpdated(true)
    }, [isDataUpdated, id])
    return (
        <div className='container h-75'>
            <div className="row row-cols-1 my-5">
                <h1 className=''>Mis Compras</h1>
                {compras.length <= 0 ?
                    <div className="p-5 m-5 text-center justify-content-center align-items-center">
                        <h2 className="m-5">No tienes compras aún</h2>
                        <Link className="btn btn-primary m-5" to={'/productos'}>Comprar ahora</Link>
                    </div>
                    :
                    compras.map((compra) => (
                        <div key={compra.payment_id} className="col my-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{compra.descripcion}</h5>
                                    <p className="card-text">Total: ${compra.monto}</p>
                                    <p className='card-text'>Fecha: {moment(compra.created_at).format('DD/MM/YYYY')}</p>
                                    <p className='card-text'>Estado: {compra.status}</p>
                                    <p className='card-text'>Codigo de verificacion: {compra.codigo_verificacion}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}
