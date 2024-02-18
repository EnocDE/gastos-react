import { useEffect, useState } from "react";
import Header from "./components/Header";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Modal from "./components/Modal";

function App() {
    const [presupuesto, setPresupuesto] = useState('');
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [gastos, setGastos] = useState([])

    
    function toggleModal() {
        setMostrarModal(!mostrarModal);
    }

    function guardarGasto(gasto) {
        setGastos([...gastos, gasto])
        setAnimarModal(false);
        setTimeout(() => {
            setMostrarModal(false);
        }, 300);
    } 

    function handleNuevoGasto() {
        setModal(true);

        setTimeout(() => {
            toggleModal();
            setAnimarModal(true);
        }, 100);
    }

    return (
        <div>
            <Header
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />
            {isValidPresupuesto && (
                <div className="nuevo-gasto">
                    <img
                        src={IconoNuevoGasto}
                        alt="Imagen nuevo gasto"
                        onClick={handleNuevoGasto}
                    />
                </div>
            )}

            {modal && (
                <Modal
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    mostrarModal={mostrarModal}
                    toggleModal={toggleModal}
                    guardarGasto={guardarGasto}
                />
            )}
        </div>
    );
}

export default App;
