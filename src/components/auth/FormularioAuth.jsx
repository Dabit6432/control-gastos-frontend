import { useState } from "react";

function FormularioAuth({ titulo, textoBoton, onSubmit, mostrarNombre }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit() {
    const datos = { email, password };
    if (mostrarNombre) datos.nombre = nombre;
    onSubmit(datos);
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card border-0 shadow-sm p-4" style={{ width: "100%", maxWidth: "420px" }}>

        <div className="text-center mb-4">
          <span style={{ fontSize: "2.5rem" }}>💰</span>
          <h2 className="fw-bold mt-2 mb-0">{titulo}</h2>
          <p className="text-secondary mt-1" style={{ fontSize: "14px" }}>
            {mostrarNombre ? 'Crea tu cuenta gratis' : 'Bienvenido de vuelta'}
          </p>
        </div>

        <div className="d-flex flex-column gap-3">
          {mostrarNombre && (
            <div>
              <label className="form-label fw-medium text-dark" style={{ fontSize: "14px" }}>
                Nombre
              </label>
              <input
                type="text"
                className="form-control rounded-3"
                placeholder="Tu nombre"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="form-label fw-medium text-dark" style={{ fontSize: "14px" }}>
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control rounded-3"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label fw-medium text-dark" style={{ fontSize: "14px" }}>
              Contraseña
            </label>
            <input
              type="password"
              className="form-control rounded-3"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="btn btn-dark w-100 rounded-3 py-2 mt-2 fw-medium"
          >
            {textoBoton}
          </button>

          <p className="text-center text-secondary mb-0" style={{ fontSize: "14px" }}>
            {mostrarNombre ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
            
            <a  href={mostrarNombre ? '/login' : '/register'}
              className="text-dark fw-medium"
            >
              {mostrarNombre ? 'Inicia sesión' : 'Regístrate'}
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}

export default FormularioAuth;