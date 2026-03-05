import { useEffect, useState } from "react";

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
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Sistema de Gestión de Pedidos</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
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
        <p>No hay pedidos aún.</p>
      ) : (
        <ul>
          {pedidos.map((p) => (
            <li key={p.id}>
              {p.cliente} - {p.producto} ({p.cantidad})
              <button
                onClick={() => eliminarPedido(p.id)}
                style={{ marginLeft: "10px" }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;