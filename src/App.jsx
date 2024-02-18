import { useState } from "react";
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import { generarId } from "./helpers/index";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
    const [presupuesto, setPresupuesto] = useState("");
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [gastos, setGastos] = useState([]);
    const [gastoEditar, setGastoEditar] = useState({});

    function toggleModal() {
        setMostrarModal(!mostrarModal);
    }

    function cerrarModal() {
        setAnimarModal(false);

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

    function guardarGasto(gasto) {
        gasto.id = generarId();
        gasto.fecha = Date.now();

        setGastos([...gastos, gasto]);

        cerrarModal();
    }

    function handleNuevoGasto() {
        abrirModal();
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
                    mostrarModal={mostrarModal}
                    guardarGasto={guardarGasto}
                    setGastoEditar={setGastoEditar}
                    cerrarModal={cerrarModal}
                />
            )}
        </div>
    );
}

export default App;
