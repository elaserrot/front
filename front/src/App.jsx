import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Cliente/Index";
import InicioAdmin from "./pages/Admin/InicioAdmin";
import Login from "./pages/Cliente/Login";
import Register from "./pages/Cliente/Register";
import Example from "./pages/Cliente/Example"
import PerfilUsuario from "./pages/Cliente/PerfilUsuario";
import Productos from "./pages/Cliente/Productos";
import Producto from "./pages/Cliente/Producto"
import CarritoCompras from "./pages/Cliente/CarritoCompras";
import PasarelaPago from "./pages/Cliente/PasarelaPago"
import OlvidoContraseña from "./pages/Cliente/OlvidoContraseña";
import Mascota from "./pages/Cliente/Mascota";
import ServiciosMedicina from "./pages/Cliente/ServiciosMedicina";
import AgendamientoGrooming from "./pages/Cliente/AgendamientoGrooming";
import ClienteHome from "./pages/Cliente/ClienteHome";
import VerificarCodigo from "./pages/Cliente/VerificarCodigo";
import AgendamientoMedicina from "./pages/Cliente/AgendamientoMedicina";
import Nosotros from "./pages/Cliente/Nosotros";
{/* ----------------------paginas de administrador-------------------- */ }
import AdminPedidos from "./pages/Admin/AdminPedidos";
import CalendarioPedidos from "./pages/Admin/CalendarioPedidos";
import AdminMascotas from "./pages/Admin/AdminMascotas";
import AdminAgregarMascota from "./pages/Admin/AdminAgregarMascota";
import AdminVentas from "./pages/Admin/AdminVentas";
import AdminClientes from "./pages/Admin/AdminClientes";
import AdminVerMascota from "./pages/Admin/AdminVerMascota";
import AdminAgregarClientes from "./pages/Admin/AdminAgregarClientes";
import AdminAgendamiento from "./pages/Admin/AdminAgendamiento";
import AdminReportes from "./pages/Admin/AdminReportes";
import AdminConfiguracion from "./pages/Admin/AdminConfiguracion";

import RutaPublica from "./components/RutaPublica";
import RutaPrivada from "./components/RutaPrivada";
import AdminLayout from "./layouts/AdminLayout";
import ClienteLayout from "./layouts/ClienteLayout";
import UsersLayout from "./layouts/UsersLayout";
import Success from "./components/Success";
import Failure from "./components/Failure";
import AdminProductos from "./pages/Admin/AdminProductos";
import AdminAgregarProducto from "./pages/Admin/AdminAgregarProducto";
import MisCompras from "./pages/Cliente/MisCompras";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RutaPublica />}>
          <Route element={<UsersLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/register/" element={<Register />} />
            <Route path="/example" element={<Example />} />
            <Route path="/recuperar" element={<OlvidoContraseña />} />
            <Route path="/verificarcodigo" element={<VerificarCodigo />} />
            <Route path="/nosotros" element={<Nosotros />} />
          </Route>
        </Route>

        {/* ----------------------paginas de cliente-------------------- */}
        <Route element={<RutaPrivada requiredRole={2} />}>
          <Route element={<ClienteLayout />}>

            <Route path="/success" element={<Success />} />
            <Route path="/failure" element={<Failure />} />
            <Route path="/perfilUsuario" element={<PerfilUsuario />} />
            <Route path="/perfilUsuario" element={<PerfilUsuario />} />
            <Route path="/carrito" element={<CarritoCompras />} />
            <Route path="/pago" element={<PasarelaPago />} />
            <Route path="/mascota" element={<Mascota />} />
            <Route path="/miscompras" element={<MisCompras />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/producto/:id" element={<Producto />} />
            <Route path="/medicina" element={<ServiciosMedicina />} />
            <Route path="/grooming" element={<AgendamientoGrooming />} />
            <Route path="/clientehome" element={<ClienteHome />} />
            <Route path="/agendamientomedicina/:tipo" element={<AgendamientoMedicina />} />
          </Route>
        </Route>

        {/* ----------------------paginas de administrador-------------------- */}
        <Route element={<RutaPrivada requiredRole={1} />}>
          <Route element={<AdminLayout />}>
            <Route path="/administrador/" element={<InicioAdmin />} />
            <Route path="/pedidos" element={<AdminPedidos />} />
            <Route path="/calendario" element={<CalendarioPedidos />} />
            <Route path="/productosadmin" element={<AdminProductos />} />
            <Route path="/agregarProducto" element={<AdminAgregarProducto />} />
            <Route path="/mascotas" element={<AdminMascotas />} />
            <Route path="/agregarmascota" element={<AdminAgregarMascota />} />
            <Route path="/ventas" element={<AdminVentas />} />
            <Route path="/clientes" element={<AdminClientes />} />
            <Route path="/vermascota" element={<AdminVerMascota />} />
            <Route path="/agregarcliente" element={<AdminAgregarClientes />} />
            <Route path="/agendamiento" element={<AdminAgendamiento />} />
            <Route path="/reportes" element={<AdminReportes />} />
            <Route path="/configuracion" element={<AdminConfiguracion />} />
          </Route>
        </Route>
        <Route path="*" element={<div className="text-center mt-5">404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
