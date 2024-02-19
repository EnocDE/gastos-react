import { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

function ControlPresupuesto({ gastos, presupuesto }) {
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
        }, 700);

        setDisponible(totalDisponible);
    }, [gastos]);

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
                        pathColor: "#3b82f6",
                        trailColor: "#f5f5f5",
                        textColor: "#3b82f6",
                    })}
                    text={`${porcentaje}% Gastado`}
                />
            </div>
            <div className="contenido-presupuesto">
                <p>
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                </p>
                <p>
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
