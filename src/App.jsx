import { useState } from "react";
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import { generarId } from "./helpers/index";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Modal from "./components/Modal";

function App() {
    const [presupuesto, setPresupuesto] = useState("");
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [gastos, setGastos] = useState([]);
    const [gastoEditar, setGastoEditar] = useState({});

    function eliminarGasto(id) {
        const gastosActualizados = gastos.filter(
            (gastoState) => gastoState.id !== id
        );
        setGastos(gastosActualizados);

    }

    function guardarGasto(gasto) {
        if (gasto.id) {
            const gastosActualizados = gastos.map((gastoState) =>
                gastoState.id === gasto.id ? gasto : gastoState
            );

            setGastos(gastosActualizados);
            setGastoEditar({});
        } else {
            gasto.id = generarId();
            gasto.fecha = Date.now();

            setGastos([...gastos, gasto]);
        }
        cerrarModal();
    }

    function handleNuevoGasto() {
        abrirModal();
        setGastoEditar({});
    }

    function toggleModal() {
        setMostrarModal(!mostrarModal);
    }

    function cerrarModal() {
        setAnimarModal(false);
        setGastoEditar({});

        setTimeout(() => {
            toggleModal();
        }, 300);

        setTimeout(() => {
            setModal(false);
        }, 400);
    }

    function abrirModal() {
        setModal(true);

        setTimeout(() => {
            setAnimarModal(true);
            toggleModal();
        }, 100);
    }

    return (
        <div className={modal ? "fijar" : ""}>
            <Header
                gastos={gastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />
            {isValidPresupuesto && (
                <>
                    <main>
                        <ListadoGastos
                            gastos={gastos}
                            setGastoEditar={setGastoEditar}
                            abrirModal={abrirModal}
                            cerrarModal={cerrarModal}
                            eliminarGasto={eliminarGasto}
                        />
                    </main>
                    <div className="nuevo-gasto">
                        <img
                            src={IconoNuevoGasto}
                            alt="Imagen nuevo gasto"
                            onClick={handleNuevoGasto}
                        />
                    </div>
                </>
            )}

            {modal && (
                <Modal
                    animarModal={animarModal}
                    guardarGasto={guardarGasto}
                    mostrarModal={mostrarModal}
                    cerrarModal={cerrarModal}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                />
            )}
        </div>
    );
}

export default App;
