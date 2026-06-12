import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import FormTransacion from "../components/Dashboard/FormTransaction";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTransaction() {
    const { token, userId } = useContext(AuthContext);
    const [categorias, setCategorias] = useState([]);
    const [descripcion, setDescripcion] = useState('');
    const [monto, setMonto] = useState('');
    const [tipo, setTipo] = useState('ingreso');
    const [categoriaId, setCategoriaId] = useState('');
    const [fecha, setFecha] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

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
        cargarTransaccion();
    }, [id]);

    async function cargarTransaccion() {
        const res = await fetch(`http://localhost:3001/transacciones/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        });
        const data = await res.json();
        console.log('Transacción cargada:', data);
        setDescripcion(data.descripcion);
        setMonto(data.monto);
        setTipo(data.tipo);
        setCategoriaId(data.categoria_id);
        setFecha(data.fecha);
    }

    async function editarTransaccion(datos) {
        const resp = await fetch(`http://localhost:3001/transacciones/${id}`, {
            method: 'PUT',
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
                usuario_id: userId
            })
        });

        if (!resp.ok) {
            console.error('Error al editar la transacción');
            return;
        }

        const data = await resp.json();
        console.log('Transacción editada:', data);
        navigate('/dashboard');
    }

    return (
        <FormTransacion
            titulo="Editar transacción"
            onsubmit={editarTransaccion}
            descripcion={descripcion}
            monto={monto}
            tipo={tipo}
            categoriaId={categoriaId}
            fecha={fecha}
            categorias={categorias}
        />
    );


}