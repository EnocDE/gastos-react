import { useState } from "react";
import Mensaje from "./Mensaje";
import cerrarModal from "../img/cerrar.svg";

function Modal({
    setModal,
    animarModal,
    setAnimarModal,
    mostrarModal,
    toggleModal,
    guardarGasto,
}) {
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [categoria, setCategoria] = useState("");
    const [mensaje, setMensaje] = useState("");

    function ocultarModal() {
        setAnimarModal(false);

        setTimeout(() => {
            toggleModal();
        }, 300);

        setTimeout(() => {
            setModal(false);
        }, 400);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if ([nombre, cantidad, categoria].includes("")) {
            setMensaje("Debes llenar todos los campos");
            return;
        } else if (Number(cantidad) <= 0) {
            setMensaje("La cantidad no puede ser 0");
            return;
        }
        setMensaje("");
        guardarGasto({ nombre, cantidad, categoria });
    }

    return (
        <div className={`modal ${mostrarModal ? "abrir" : "cerrar"}`}>
            <div className="cerrar-modal">
                <img
                    src={cerrarModal}
                    alt="imagen cerrar"
                    onClick={ocultarModal}
                />
            </div>

            <form
                className={`formulario ${animarModal ? "animar" : "cerrar"}`}
                onSubmit={handleSubmit}>
                <legend>Nuevo gasto</legend>
                {mensaje && <Mensaje tipo={"error"}>{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Añade el nombre del gasto"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        type="number"
                        id="cantidad"
                        placeholder="Añade la cantidad del gasto ej: 300"
                        min={1}
                        value={cantidad}
                        onChange={(e) => setCantidad(Number(e.target.value))}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Categoria</label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}>
                        <option value="" disabled>
                            -- Seleccione --
                        </option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input type="submit" value={"Añadir gasto"} />
            </form>
        </div>
    );
}

export default Modal;
