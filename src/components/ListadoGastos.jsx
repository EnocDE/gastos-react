import Gasto from "./Gasto";

function ListadoGastos({
    gastos,
    setGastoEditar,
    abrirModal,
    cerrarModal,
    eliminarGasto
}) {
    return (
        <div className="listado-gastos contenedor">
            <h2>{gastos.length ? "Gastos" : "No hay gastos aún"}</h2>

            {gastos.map((gasto) => (
                <Gasto
                    key={gasto.id}
                    gasto={gasto}
                    setGastoEditar={setGastoEditar}
                    abrirModal={abrirModal}
                    cerrarModal={cerrarModal}
                    eliminarGasto={eliminarGasto}
                />
            ))}
        </div>
    );
}

export default ListadoGastos;
