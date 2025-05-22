import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const BACKEND_URL = "http://localhost:3001";

export default function Success() {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const confirmPayment = async () => {
            try {
                const queryParams = new URLSearchParams(window.location.search);
                const paymentId = queryParams.get('payment_id');
                const status = queryParams.get('status');

                if (!paymentId || !status) {
                    await Swal.fire('Error', 'No se recibió información de pago', 'error');
                    return navigate('/');
                }

                const token = localStorage.getItem('token');
                if (!token) {
                    await Swal.fire('Error', 'No se encontró el token de autenticación', 'error');
                    return navigate('/');
                }

                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const userId = decodedToken.id;

                // Confirmar el pago con el backend
                const { status: confirmStatus } = await axios.post(`${BACKEND_URL}/api/compras/confirmar-pago/${userId}`, {
                    paymentId,
                    status,
                });

                if (confirmStatus === 200) {
                    // Vaciar el carrito
                    await axios.delete(`${BACKEND_URL}/api/carrito/eliminarCarrito/${userId}`);

                    await Swal.fire({
                        title: 'Pago confirmado',
                        text: 'Tu pago ha sido confirmado con éxito.',
                        icon: 'success'
                    });
                    navigate('/miscompras');
                } else {
                    throw new Error('La confirmación del pago falló');
                }
            } catch (error) {
                console.error("Error en confirmación de pago:", error);
                await Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema confirmando tu pago. Por favor contacta a soporte.',
                    icon: 'error'
                });
                navigate('/');
            } finally {
                setIsLoading(false);
            }
        };

        confirmPayment();
    }, [navigate]);

    return (
        <div className="container my-5 text-center">
            {isLoading ? (
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            ) : (
                <div>
                    <h1 className="fw-bold">¡Gracias por tu compra!</h1>
                    <p>Tu pago ha sido confirmado con éxito.</p>
                </div>
            )}
        </div>
    );
}
