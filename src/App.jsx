import { useEffect, useState } from "react";
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import Filtros from "./components/Filtros";
import { generarId } from "./helpers/index";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Modal from "./components/Modal";

function App() {
    const [presupuesto, setPresupuesto] = useState( Number(localStorage.getItem("presupuesto")) ?? 0 );
    const [isValidPresupuesto, setIsValidPresupuesto] = useState( false );
    const [modal, setModal] = useState( false );
    const [animarModal, setAnimarModal] = useState( false );
    const [mostrarModal, setMostrarModal] = useState( false );
    const [gastos, setGastos] = useState( localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : [] );
    const [gastoEditar, setGastoEditar] = useState( {} );
    const [filtro, setFiltro] = useState( '' );
    const [gastosFiltrados, setGastosFiltrados] = useState( [] );

    useEffect(() => {
        localStorage.setItem("presupuesto", presupuesto ?? 0);
    }, [presupuesto]);

    useEffect(() => {
        localStorage.setItem("gastos", JSON.stringify(gastos));
    }, [gastos]);

    useEffect(() => {
        if (filtro) {
            const gastosFiltro = gastos.filter(gastoState => gastoState.categoria === filtro);
            setGastosFiltrados(gastosFiltro);
        }
    }, [filtro]);

    useEffect(() => {
        const presupuestoLS = Number(localStorage.getItem("presupuesto") ?? 0);
        if (presupuestoLS > 0) {
            setIsValidPresupuesto(true);
        }
    }, []);

    function handleNuevoGasto() {
        abrirModal();
        setGastoEditar({});
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

    function eliminarGasto(id) {
        const gastosActualizados = gastos.filter(
            (gastoState) => gastoState.id !== id
        );
        setGastos(gastosActualizados);
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
                setGastos={setGastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />
            {isValidPresupuesto && (
                <>
                    <main>
                        <Filtros filtro={filtro} setFiltro={setFiltro} />
                        <ListadoGastos
                            gastos={gastos}
                            setGastoEditar={setGastoEditar}
                            abrirModal={abrirModal}
                            cerrarModal={cerrarModal}
                            eliminarGasto={eliminarGasto}
                            filtro={filtro}
                            gastosFiltrados={gastosFiltrados}
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
