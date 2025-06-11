import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import API from "../../api/api"

import Swal from "sweetalert2"

export default function VerificarCodigo() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const email = searchParams.get("email")

  const [data, setData] = useState({
    email: email,
    codigo: "",
    nuevaContrasena: "",
    confirmarNuevaContrasena: "",
  })
  const [mensaje, setMensaje] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()



  useEffect(() => {
    if (!email) {
      navigate("/OlvidoContrasena")
    }
  }, [email, navigate])

  const manejarVerificacion = async (e) => {
    e.preventDefault()

    if (!/^\d{6}$/.test(data.codigo)) {
      setMensaje("Por favor, ingresa un código de 6 dígitos válido.")
      return
    }

    setLoading(true)

    try {
      const response = await API.post("/api/auth/verificarCodigo", data);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Verificación exitosa',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          navigate('/login')
        });
      } else {
        setMensaje(response.data.message || "Hubo un problema al verificar el código. Intenta nuevamente.");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Hubo un error al verificar el código. Intenta nuevamente.");
    }


    setLoading(false)
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

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
                <p className="text-muted">Verificación de código</p>
              </div>
              <form onSubmit={manejarVerificacion}>
                <div className="mb-3">
                  <p>
                    Hemos enviado un código de verificación a <strong>{email}</strong>.
                  </p>
                  <label htmlFor="codigo" className="form-label">
                    Código de verificación
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="codigo"
                    name="codigo"
                    placeholder="Ingresa el código de 6 dígitos"
                    value={data.codigo}
                    onChange={handleChange}
                    maxLength={6}
                    required
                  />

                  <label htmlFor="nuevaContrasena" className="form-label">
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="nuevaContrasena"
                    name="nuevaContrasena"
                    placeholder="Ingresa la nueva contraseña"
                    value={data.nuevaContrasena}
                    onChange={handleChange}
                    required
                  />

                  <label htmlFor="confirmarNuevaContrasena" className="form-label">
                    Confirmar nueva contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmarNuevaContrasena"
                    id="confirmarNuevaContrasena"
                    placeholder="Confirma la nueva contraseña"
                    value={data.confirmarNuevaContrasena}
                    onChange={handleChange}
                    required
                  />
                </div>
                {mensaje && <div className="alert alert-info">{mensaje}</div>}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Cambiando contraseña..." : "Cambiar contraseña"}
                  </button>
                </div>
              </form>
              <div className="text-center mt-3">
                <button className="btn btn-link" onClick={() => navigate(`/OlvidoContrasena`)}>
                  Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
