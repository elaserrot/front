import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Footer from "../../components/Footer"
import axios from "axios"

export default function OlvidoContraseña() {
  const [email, setEmail] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const manejarEnvio = async (e) => {
    e.preventDefault()

    // Validación básica de email
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!emailValido) {
      setMensaje("Por favor, ingresa un correo electrónico válido.")
      return
    }

    setLoading(true)
    setMensaje("")

    try {
      const response = await axios.post("http://localhost:3001/api/auth/enviarCodigo", {
        email
      });

      const data = response.data;
      if (data.success) {
        setMensaje("Te hemos enviado un correo con el código de recuperación.");
        setTimeout(() => {
          navigate(`/VerificarCodigo?email=${encodeURIComponent(email)}`);
          0
        }, 2000);
      } else {
        setMensaje(data.message || "Hubo un problema al enviar el correo. Intenta nuevamente.");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Hubo un error. Por favor, intenta nuevamente.");
    }


    setLoading(false)
  }

  return (
    <div className="">
      <div
        className="vh-100 d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `url("https://hoylecohen.com/wp-content/uploads/login-page-bg.jpg")`,
        }}
      >
        <div className="w-50 p-5">
          <div className="card shadow p-5 rounded-5">
            <div className="card-body">
              <div className="text-center mb-4">
                <i className="display-1 fa fa-paw" aria-hidden="true"></i>
                <h2 className="card-title">Clinica Veterinaria Ciudad Canina</h2>
                <p className="text-muted">¿Olvidaste la contraseña?</p>
              </div>
              <form onSubmit={manejarEnvio}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="nombre@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {mensaje && (
                  <div className={`alert ${mensaje.includes("enviado") ? "alert-success" : "alert-danger"}`}>
                    {mensaje}
                  </div>
                )}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Enviando..." : "Enviar correo"}
                  </button>
                </div>
              </form>
              <div className="text-center mt-3">
                <Link to="/login" className="btn btn-link">
                  Volver al inicio de sesión
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}