import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function FormTransacion({ titulo, onsubmit, descripcion: desc = '', monto: mont = '', tipo: tip = 'ingreso', categoriaId: catId = '', fecha: fech = '', categorias: cats = [] }) {
    const { userId } = useContext(AuthContext);

    const [descripcion, setDescripcion] = useState(desc);
    const [monto, setMonto] = useState(mont);
    const [tipo, setTipo] = useState(tip);
    const [categoriaId, setCategoriaId] = useState(catId);
    const [fecha, setFecha] = useState(fech);
    const [categorias, setCategorias] = useState(cats);

    useEffect(() => {
        setDescripcion(desc);
        setMonto(mont);
        setTipo(tip);
        setCategoriaId(catId);
        setFecha(fech);
        setCategorias(cats);
    }, [desc, mont, tip, catId, fech, cats]);

    function crearTransaccion() {
        const datos = { descripcion, monto, tipo, categoria_id: categoriaId, fecha, usuario_id: userId };
        onsubmit(datos);
    }

    return (
        <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
            <div className="card border-0 shadow-sm rounded-4 p-4" style={{ width: "100%", maxWidth: "520px" }}>

                {/* Header */}
                <div className="mb-4">
                    <h4 className="fw-bold mb-1">{titulo}</h4>
                    <p className="text-secondary mb-0" style={{ fontSize: "14px" }}>
                        Completa los campos para continuar
                    </p>
                </div>

                <div className="d-flex flex-column gap-3">

                    {/* Descripcion */}
                    <div>
                        <label className="form-label fw-medium text-dark" style={{ fontSize: "14px" }}>
                            Descripción
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-3"
                            placeholder="Ej: Salario enero, Renta, Supermercado..."
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>

                    {/* Monto */}
                    <div>
                        <label className="form-label fw-medium text-dark" style={{ fontSize: "14px" }}>
                            Monto
                        </label>
                        <div className="input-group">
                            <span className="input-group-text bg-white border-end-0 text-secondary">$</span>
                            <input
                                type="number"
                                className="form-control rounded-end-3 border-start-0"
                                placeholder="0.00"
                                value={monto}
                                onChange={(e) => setMonto(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Tipo */}
                    <div>
                        <label className="form-label fw-medium text-dark" style={{ fontSize: "14px" }}>
                            Tipo
                        </label>
                        <div className="d-flex gap-2">
                            <button
                                type="button"
                                onClick={() => setTipo('ingreso')}
                                className={`btn w-50 rounded-3 fw-medium ${tipo === 'ingreso' ? 'btn-success' : 'btn-outline-secondary'}`}
                                style={{ fontSize: "14px" }}
                            >
                                ↑ Ingreso
                            </button>
                            <button
                                type="button"
                                onClick={() => setTipo('gasto')}
                                className={`btn w-50 rounded-3 fw-medium ${tipo === 'gasto' ? 'btn-danger' : 'btn-outline-secondary'}`}
                                style={{ fontSize: "14px" }}
                            >
                                ↓ Gasto
                            </button>
                        </div>
                    </div>

                    {/* Categoria */}
                    <div>
                        <label className="form-label fw-medium text-dark" style={{ fontSize: "14px" }}>
                            Categoría
                        </label>
                        <select
                            className="form-select rounded-3"
                            value={categoriaId}
                            onChange={(e) => setCategoriaId(e.target.value)}
                        >
                            <option value="">Selecciona una categoría</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Fecha */}
                    <div>
                        <label className="form-label fw-medium text-dark" style={{ fontSize: "14px" }}>
                            Fecha
                        </label>
                        <input
                            type="date"
                            className="form-control rounded-3"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                        />
                    </div>

                    {/* Boton */}
                    <button
                        onClick={crearTransaccion}
                        className="btn btn-dark w-100 rounded-3 py-2 fw-medium mt-2"
                    >
                        {titulo}
                    </button>

                </div>
            </div>
        </div>
    );
}

export default FormTransacion;