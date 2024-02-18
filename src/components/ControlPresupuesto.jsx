function ControlPresupuesto({ presupuesto }) {
    function formatearCantidad(cantidad) {
        return cantidad.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <p>Grafica aqui</p>
            </div>
            <div className="contenido-presupuesto">
                <p>
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                </p>
                <p>
                    <span>Disponible: </span> {0}
                </p>
                <p>
                    <span>Utilizado: </span> {0}
                </p>
            </div>
        </div>
    );
}

export default ControlPresupuesto;
