import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [pedidos, setPedidos] = useState([]);
  const [form, setForm] = useState({
    cliente: "",
    producto: "",
    cantidad: ""
  });

  const [editandoId, setEditandoId] = useState(null);

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

    const intervalo = setInterval(() => {
      cargarPedidos();
    }, 3000);

    return () => clearInterval(intervalo);
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

      const metodo = editandoId ? "PUT" : "POST";
      const url = editandoId ? `${API_URL}/${editandoId}` : API_URL;

      await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          cantidad: parseInt(form.cantidad)
        })
      });

      setForm({
        cliente: "",
        producto: "",
        cantidad: ""
      });

      setEditandoId(null);

      cargarPedidos();

    } catch (error) {
      console.error("Error guardando pedido:", error);
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

  const editarPedido = (pedido) => {

    setForm({
      cliente: pedido.cliente,
      producto: pedido.producto,
      cantidad: pedido.cantidad
    });

    setEditandoId(pedido.id);
  };

  const cancelarEdicion = () => {
    setEditandoId(null);

    setForm({
      cliente: "",
      producto: "",
      cantidad: ""
    });
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
          min="1"
          onChange={handleChange}
          required
        />
      <div className="botones_formulario">
          <button type="submit">
            {editandoId ? "Actualizar Pedido" : "Crear Pedido"}
          </button>

          {editandoId && (
            <button className="cancelar"
              type="button"
              onClick={cancelarEdicion}
            >
              Cancelar
            </button>
          )}
        </div>

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

              <div className="botones">

                <button
                  className="editar"
                  onClick={() => editarPedido(p)}
                >
                  Editar
                </button>

                <button
                  className="eliminar"
                  onClick={() => eliminarPedido(p.id)}
                >
                  Eliminar
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default App;