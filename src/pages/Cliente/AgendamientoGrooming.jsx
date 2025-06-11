import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
;
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment';
import API from '../../api/api';

const BACKEND_URL = 'http://localhost:3001';

const AgendamientoGrooming = () => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DDTHH:mm'));
  const [servicio, setServicio] = useState('');
  const [mascota, setMascota] = useState('');
  const [mascotas, setMascotas] = useState([]);
  const [citas, setCitas] = useState([]);
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  const token = localStorage.getItem('token');
  const decoded_token = JSON.parse(atob(token.split('.')[1]));
  const id = decoded_token.id;

  const handleAgendar = async () => {
    try {
      const nuevaCita = {
        Usuario: id,
        Fecha: selectedDate,
        Motivo: servicio,
        Estado: 'pendiente',
        Mascota: mascota
      };

      console.log(nuevaCita);

      const response = await API.post('/api/citas/agregarCita', nuevaCita);
      Swal.fire({
        icon: 'success',
        title: 'Cita agendada con éxito',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Error al agendar la cita:', error);
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error al agendar la cita',
        showConfirmButton: false,
        timer: 1500
      });
    } finally {
      setIsDataUpdated(true);
    }
  };


  useEffect(() => {
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

    const fetchCitas = async () => {
      try {
        const response = await API.get(`/citas/listarCitas/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCitas(response.data);
      } catch (error) {
        console.error("Error al obtener citas:", error);
        Swal.fire({
          icon: "error",
          title: "Hubo un error al obtener las citas.",
          showConfirmButton: false,
          timer: 1500
        });
      }
    };

    fetchMascotas();
    fetchCitas();
    setIsDataUpdated(false);
  }, [token, id, isDataUpdated]);

  return (
    <div style={{ minHeight: '100vh' }}>
      <div className="container rounded border shadow my-5">
        <div className="row row-cols-1 row-cols-md-2 p-5 mt-5 align-items-center ">
          <div className="col justify-content-center p-5 rounded">
            <h2 className="text-center mb-4">Agendamiento de grooming</h2>
            <label>Servicio:</label>
            <select
              value={servicio}
              className="form-select mb-3"
              onChange={(e) => setServicio(e.target.value)}
              required
            >
              <option disabled value="">Seleccione el servicio</option>
              <option value="Corte">Corte</option>
              <option value="Baño">Baño</option>
              <option value="Corte y Baño">Corte y Baño</option>
              <option value="Baño y Uñas">Baño y Uñas</option>
            </select>

            <label>Mascota:</label>
            <select
              value={mascota}
              className="form-select mb-3"
              onChange={(e) => setMascota(e.target.value)}
              required
            >
              <option disabled value="">Seleccione la mascota</option>
              {mascotas.map((mascota) => (
                <option key={mascota.ID_Mascota} value={mascota.ID_Mascota}>
                  {mascota.Nombre_Mascota}
                </option>
              ))}
            </select>

            <label>Fecha:</label>
            <input
              className="form-control mb-3 bg-light"
              type="datetime-local"
              min={moment().format('YYYY-MM-DDTHH:mm')}
              onChange={(e) => setSelectedDate(moment(e.target.value).format('YYYY-MM-DDTHH:mm'))}
              value={selectedDate}
              required
            />
            <button className="btn btn-success mt-3" onClick={handleAgendar}>
              AGENDAR
            </button>
          </div>
          <div className="container my-5 border-start rounded p-5">
            <h2 className="text-center mb-4">Citas</h2>
            <div className="d-flex justify-content-center">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Servicio</th>
                    <th scope="col">Mascota</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {citas.map((cita) => (
                    <tr key={cita.ID_Cita}>
                      <td>{cita.Motivo_Cita}</td>
                      <td>{cita.Nombre_Mascota}</td>
                      <td>{moment(cita.Fecha_Cita).format('DD/MM/YYYY')}</td>
                      <td>{moment(cita.Fecha_Cita).format('hh:mm A')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendamientoGrooming;