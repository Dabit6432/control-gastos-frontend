import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FormularioAuth from "../components/auth/FormularioAuth";
import Swal from "sweetalert2";
import { API_URL } from "../config";

function Register() {
  const navigate = useNavigate();

  async function crearCuenta(datos) {
    const resp = await fetch(`${API_URL}/auth/registro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    if (!resp.ok) {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrarse',
        text: 'El email ya está registrado',
        confirmButtonColor: '#212529'
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: '¡Cuenta creada!',
      text: 'Ya puedes iniciar sesión',
      confirmButtonColor: '#212529'
    }).then(() => navigate('/login'));
  }

  return (
    <div>
      <FormularioAuth
        titulo="Crear cuenta"
        textoBoton="Registrarse"
        onSubmit={crearCuenta}
        mostrarNombre={true}
      />
     
    </div>
  );
}

export default Register;