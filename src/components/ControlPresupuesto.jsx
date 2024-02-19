import { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

function ControlPresupuesto({
    setIsValidPresupuesto,
    gastos,
    setGastos,
    presupuesto,
    setPresupuesto,
}) {
    const [porcentaje, setPorcentaje] = useState(40);
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

    useEffect(() => {
        const totalGastado = gastos.reduce(
            (total, gasto) => gasto.cantidad + total,
            0
        );
        setGastado(totalGastado);
        const totalDisponible = presupuesto - totalGastado;

        const nuevoPorcentaje = (
            ((presupuesto - totalDisponible) / presupuesto) *
            100
        ).toFixed(2);

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje);
        }, 300);

        setDisponible(totalDisponible);
    }, [gastos]);

    function handleResetApp() {
        const respuesta = confirm('¿Deseas reiniciar la aplicación?');
        if (respuesta) {
            setGastos([]);
            setPresupuesto(0);
            setIsValidPresupuesto(false)
        }
    }

    function formatearCantidad(cantidad) {
        return cantidad.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    value={porcentaje}
                    styles={buildStyles({
                        pathColor: `${disponible > 0 ? "#3b82f6" : "#f03437"}`,
                        trailColor: "#f5f5f5",
                        textColor: `${disponible > 0 ? "#3b82f6" : "#f03437"}`,
                    })}
                    text={`${porcentaje}% Gastado`}
                />
            </div>
            <div className="contenido-presupuesto">
                <button className="reset-app" type="button" onClick={handleResetApp}>Resetear App</button>
                <p>
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? "negativo" : ""}`}>
                    <span>Disponible: </span> {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Utilizado: </span> {formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    );
}

export default ControlPresupuesto;
