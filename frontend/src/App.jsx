import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [pedidos, setPedidos] = useState([]);
  const [form, setForm] = useState({
    cliente: "",
    producto: "",
    cantidad: ""
  });

  const API_URL = "/api/pedidos";

  const cargarPedidos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPedidos(data);
    } catch (error) {
      console.error("Error cargando pedidos:", error);
    }
  };

  useEffect(() => {
    cargarPedidos();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          cantidad: parseInt(form.cantidad)
        })
      });

      setForm({ cliente: "", producto: "", cantidad: "" });
      cargarPedidos();
    } catch (error) {
      console.error("Error creando pedido:", error);
    }
  };

  const eliminarPedido = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });
      cargarPedidos();
    } catch (error) {
      console.error("Error eliminando pedido:", error);
    }
  };

  return (
    <div className="container">
      <h1>Sistema de Gestión de Pedidos</h1>

      <form onSubmit={handleSubmit} className="formulario">
        <input
          name="cliente"
          placeholder="Cliente"
          value={form.cliente}
          onChange={handleChange}
          required
        />

        <input
          name="producto"
          placeholder="Producto"
          value={form.producto}
          onChange={handleChange}
          required
        />

        <input
          name="cantidad"
          type="number"
          placeholder="Cantidad"
          value={form.cantidad}
          onChange={handleChange}
          required
        />

        <button type="submit">Crear Pedido</button>
      </form>

      <h2>Pedidos Registrados</h2>

      {pedidos.length === 0 ? (
        <p className="vacio">No hay pedidos aún.</p>
      ) : (
        <div className="lista">
          {pedidos.map((p) => (
            <div className="pedido" key={p.id}>
              <span>
                <strong>{p.cliente}</strong> pidió <strong>{p.producto}</strong> ({p.cantidad})
              </span>

              <button
                className="eliminar"
                onClick={() => eliminarPedido(p.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;