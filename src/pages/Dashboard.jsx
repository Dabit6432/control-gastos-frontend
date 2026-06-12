import DashboardSection from "../components/Dashboard/DashboardSection";
import TransactionsSection from "../components/Dashboard/TransactionsSection";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [ver, setVer] = useState('recientes');
  const [idSeleccionada, setIdSeleccionada] = useState(null);
  const navigate = useNavigate();

  const transaccionesAMostrar = () => {
    if (ver === 'todas')    return transactions;
    if (ver === 'ingresos') return transactions.filter(t => t.tipo === 'ingreso');
    if (ver === 'gastos')   return transactions.filter(t => t.tipo === 'gasto');
    return transactions.slice(0, 5);
  };

  useEffect(() => {
    async function cargarResumen() {
      const res = await fetch(`${API_URL}/transacciones/resumen`, {
        headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      setBalance(data.balance);
      setTotalIncome(data.ingresos);
      setTotalExpenses(data.gastos);
    }
    cargarResumen();
  }, [idSeleccionada]);

  useEffect(() => {
    async function cargarTransacciones() {
      const res = await fetch(`${API_URL}/transacciones`, {
        headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      setTransactions(data);
    }
    cargarTransacciones();
  }, [idSeleccionada]);

  async function eliminarTransaccion(id) {
    const res = await fetch(`${API_URL}/transacciones/${id}`, {
      method: 'DELETE',
      headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    if (res.ok) setIdSeleccionada(id);
  }

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-4">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fw-bold mb-0">Dashboard</h1>
            <p className="text-secondary mb-0" style={{ fontSize: "14px" }}>
              Resumen de tus finanzas
            </p>
          </div>
          <button
            onClick={() => navigate('/new-transaction')}
            className="btn btn-dark rounded-3 px-4"
          >
            + Nueva transacción
          </button>
        </div>

        {/* Tarjetas de resumen */}
        <DashboardSection
          balance={balance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
        />

        {/* Transacciones */}
        <div className="card border-0 shadow-sm rounded-4 p-4">

          {/* Filtros */}
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <h5 className="fw-bold mb-0">Transacciones</h5>
            <div className="d-flex gap-2">
              {['recientes', 'todas', 'ingresos', 'gastos'].map(filtro => (
                <button
                  key={filtro}
                  onClick={() => setVer(filtro)}
                  className={`btn btn-sm rounded-pill px-3 ${ver === filtro ? 'btn-dark' : 'btn-outline-secondary'}`}
                  style={{ fontSize: "13px" }}
                >
                  {filtro.charAt(0).toUpperCase() + filtro.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Lista */}
          {transaccionesAMostrar().length === 0 ? (
            <p className="text-secondary text-center py-4">No hay transacciones</p>
          ) : (
            transaccionesAMostrar().map((transaction, index) => (
              <TransactionsSection
                key={index}
                description={transaction.descripcion}
                amount={transaction.monto}
                type={transaction.tipo}
                date={transaction.fecha}
                onEliminar={() => eliminarTransaccion(transaction.id)}
                onEditar={() => navigate(`/edit-transaction/${transaction.id}`)}
              />

            ))
          )}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;