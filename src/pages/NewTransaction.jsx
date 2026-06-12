// descripcion, monto, tipo, categoria_id, fecha, usuario_id
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import FormTransacion from "../components/Dashboard/FormTransaction";

function NewTransaction() {
    const { token, userId } = useContext(AuthContext);

    const [descripcion, setDescripcion] = useState('');
    const [monto, setMonto] = useState('');
    const [tipo, setTipo] = useState('ingreso');
    const [categoriaId, setCategoriaId] = useState('');
    const [fecha, setFecha] = useState('');
    const [categorias, setCategorias] = useState([]);

    const navigate = useNavigate();

    async function crearTransaccion(datos) {
        const resp = await fetch('http://localhost:3001/transacciones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                descripcion: datos.descripcion,
                monto: datos.monto,
                tipo: datos.tipo,
                categoria_id: datos.categoria_id,
                fecha: datos.fecha,
                usuario_id: datos.usuario_id
            })
        });

        if (!resp.ok) {
            console.error('Error al crear la transacción');
            return;
        }

        const data = await resp.json();
        console.log('Transacción creada:', data);
        navigate('/dashboard');

    }

    useEffect(() => {
        // Aquí podríamos cargar las categorías desde la API para mostrarlas en un select
        async function cargarCategorias() {
            const res = await fetch('http://localhost:3001/categorias', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            console.log('Categorías cargadas:', data);
            setCategorias(data);
        }

        cargarCategorias();
    }, []);

    return (
        <FormTransacion
            titulo="Crear nueva transacción"
            onsubmit={crearTransaccion}
            descripcion={descripcion}
            monto={monto}
            tipo={tipo}
            categoriaId={categoriaId}
            fecha={fecha}
            categorias={categorias}
        />
    );
}

export default NewTransaction;
