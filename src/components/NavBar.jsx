import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, logout } = useContext(AuthContext);

  useEffect(() => {
    // No need to setToken here since we're using context
  }, [location]);

  function LogOut() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm px-4">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand fw-bold text-dark fs-4" to="/dashboard">
          💰 FinanceApp
        </Link>

        {/* Links */}
        <div className="d-flex align-items-center gap-3">
          {token && (
            <Link
              to="/dashboard"
              className="text-secondary text-decoration-none fw-medium"
            >
              Dashboard
            </Link>
          )}
          {token && (
            <Link
              to="/new-transaction"
              className="btn btn-dark btn-sm rounded-pill px-3"
            >
              + Nueva transacción
            </Link>
          )}
          {!token && (
            <Link to="/login" className="btn btn-outline-dark btn-sm rounded-pill px-3">
              Iniciar sesión
            </Link>
          )}
          {token && (
            <button
              onClick={LogOut}
              className="btn btn-outline-secondary btn-sm rounded-pill px-3"
            >
              Cerrar sesión
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}

export default NavBar;