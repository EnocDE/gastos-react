import Gasto from "./Gasto";

function ListadoGastos({
    gastos,
    setGastoEditar,
    abrirModal,
    cerrarModal,
    eliminarGasto,
    filtro,
    gastosFiltrados,
}) {
    return (
        <div className="listado-gastos contenedor">
            {filtro ? (
                <>
                    <h2>{gastosFiltrados.length ? "Gastos" : "No hay gastos en esta categoria"}</h2>
                    {gastosFiltrados.map((gasto) => (
                        <Gasto
                            key={gasto.id}
                            gasto={gasto}
                            setGastoEditar={setGastoEditar}
                            abrirModal={abrirModal}
                            cerrarModal={cerrarModal}
                            eliminarGasto={eliminarGasto}
                        />
                    ))}
                </>
            ) : (
                <>
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
                </>
            )}
        </div>
    );
}

export default ListadoGastos;
