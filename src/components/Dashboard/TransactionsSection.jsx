function TransactionsSection({ description, amount, type, date, onEliminar , onEditar }) {
  return (
    <div className="d-flex align-items-center justify-content-between py-3 border-bottom">

      <div className="d-flex align-items-center gap-3">
        <div
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: "40px",
            height: "40px",
            background: type === 'ingreso' ? '#d1e7dd' : '#f8d7da',
            fontSize: "18px"
          }}
        >
          {type === 'ingreso' ? '↑' : '↓'}
        </div>
        <div>
          <p className="mb-0 fw-medium" style={{ fontSize: "15px" }}>{description}</p>
          <p className="mb-0 text-secondary" style={{ fontSize: "12px" }}>{date}</p>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        <span
          className="fw-bold"
          style={{
            fontSize: "15px",
            color: type === 'ingreso' ? '#198754' : '#dc3545'
          }}
        >
          {type === 'ingreso' ? '+' : '-'}${amount.toLocaleString()}
        </span>
        <button
          onClick={onEliminar}
          className="btn btn-sm btn-outline-danger rounded-3"
          style={{ fontSize: "12px" }}
        >
          Eliminar
        </button>
        <button
          onClick={onEditar}
          className="btn btn-sm btn-outline-primary rounded-3"
          style={{ fontSize: "12px" }}
        >
          Editar
        </button>
      </div>

    </div>
  );
}

export default TransactionsSection;