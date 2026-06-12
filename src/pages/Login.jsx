import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FormularioAuth from "../components/auth/FormularioAuth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function corroborarDatos(datos) {
    const resp = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    if (!resp.ok) {
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: 'Email o contraseña incorrectos',
        confirmButtonColor: '#212529'
      });
      return;
    }

    const data = await resp.json();
    login(data.token, data.id);
    navigate('/dashboard');
  }

  return (
    <div>
      <FormularioAuth
        titulo="Iniciar sesión"
        textoBoton="Entrar"
        onSubmit={corroborarDatos}
        mostrarNombre={false}
      />
    </div>
  );
}

export default Login;