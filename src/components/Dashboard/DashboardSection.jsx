function DashboardSection({ balance, totalIncome, totalExpenses }) {
  return (
    <div className="row g-3 mb-4">

      <div className="col-12 col-md-4">
        <div className="card border-0 shadow-sm p-4 rounded-4">
          <p className="text-secondary mb-1" style={{ fontSize: "13px" }}>Balance actual</p>
          <h3 className="fw-bold mb-0" style={{ color: balance >= 0 ? '#198754' : '#dc3545' }}>
            ${balance.toLocaleString()}
          </h3>
        </div>
      </div>

      <div className="col-12 col-md-4">
        <div className="card border-0 shadow-sm p-4 rounded-4">
          <p className="text-secondary mb-1" style={{ fontSize: "13px" }}>Total ingresos</p>
          <h3 className="fw-bold mb-0 text-success">
            +${totalIncome.toLocaleString()}
          </h3>
        </div>
      </div>

      <div className="col-12 col-md-4">
        <div className="card border-0 shadow-sm p-4 rounded-4">
          <p className="text-secondary mb-1" style={{ fontSize: "13px" }}>Total gastos</p>
          <h3 className="fw-bold mb-0 text-danger">
            -${totalExpenses.toLocaleString()}
          </h3>
        </div>
      </div>

    </div>
  );
}

export default DashboardSection;