import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import NabvarC from '../../components/NavbarC'
import { Link } from 'react-router-dom'
import API from '../../api/api'

const API_URL = process.env.API_URL || "http://localhost:3001";

export default function Productos() {
  const [isLoading, setIsLoading] = useState(true);
  const [allProductos, setAllProductos] = useState([]);
  const [displayedProductos, setDisplayedProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setIsLoading(true);
        const response = await API.get(`/productos/listar`);
        setAllProductos(response.data);
        setDisplayedProductos(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await API.get(`/categorias/listar`);
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al obtener las categorias:", error);
      }
    };

    fetchCategorias();
    fetchProductos();
  }, []);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setDisplayedProductos(allProductos);
    } else {
      const filtered = allProductos.filter(producto =>
        producto.id_cate && selectedCategories.includes(String(producto.id_cate))
      );
      setDisplayedProductos(filtered);
    }
  }, [selectedCategories, allProductos]);

  function handleCheckboxChange(event) {
    const categoriaId = event.target.value;
    const isChecked = event.target.checked;

    setSelectedCategories(prev => {
      if (isChecked) {
        return [...prev, categoriaId];
      } else {
        return prev.filter(id => id !== categoriaId);
      }
    });
  }

  return (
    <div>
      <main className="py-4">
        <div className="container">
          <div className="row">
            {/* Filtros */}
            <aside className="col-md-3">
              <h5 className="mb-3">Categorias</h5>
              {categorias.map((categoria) => (
                <div key={categoria.id_cate} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={categoria.id_cate}
                    id={`categoria-${categoria.id_cate}`}
                    onChange={handleCheckboxChange}
                    checked={selectedCategories.includes(String(categoria.id_cate))}
                  />
                  <label className="form-check-label" htmlFor={`categoria-${categoria.id_cate}`}>
                    {categoria.nombre_Categoria}
                  </label>
                </div>
              ))}
            </aside>

            {/* Productos */}
            <section className="col-md-9">
              <div className="row g-4">
                {isLoading && <p>Cargando productos...</p>}
                {displayedProductos.length === 0 && !isLoading && <p>No hay productos disponibles en las categorías seleccionadas.</p>}
                {displayedProductos.length > 0 && <p className='text-end text-muted'>{displayedProductos.length} productos disponibles.</p>}
                {displayedProductos.map((producto) => (
                  <div key={producto.id_producto} className="col-md-4">
                    <div className="card">
                      <img src={`${API_URL}/PRODUCTOS_FOTOS/${producto.imagen}`} style={{ width: "100%", height: "200px", objectFit: "cover" }} className="card-img-top" alt={producto.nombre_producto} />
                      <div className="card-body">
                        <h6 className="card-title">{producto.nombre_producto}</h6>
                        <p className="card-text text-muted">
                          {producto.descripcion.substring(0, 25) + (producto.descripcion.length > 25 ? "..." : "")}
                        </p>
                        <p className="card-text">Precio: ${producto.precio?.toLocaleString()}</p>
                        <Link className="btn btn-primary" to={`/producto/${producto.id_producto}`}>
                          Ver más
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}