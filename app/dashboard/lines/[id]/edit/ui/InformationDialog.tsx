export default function InformationDialog({
    onClose
}: {
    onClose: () => void
}) {
    
    return (
        <dialog open style={{ position: "absolute", zIndex: 9999, backgroundColor: "white", padding: "20px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"}}>
            <div>
              <div >
                <h3>Controles del Mapa</h3>
                <div>
                  <p>1. Manten click en el mapa y desliza para moverte.</p>
                  <p>2. Haz click derecho en el mapa para agregar un punto a la linea.</p>
                  <p>3. Presiona Shift+D para eliminar el ultimo punto agregado.</p>
                  <p>4. Arrastra y suelta los puntos para modificar la linea.</p>
                  <p>5. Suelta un punto encima de una linea para señalizar que es una parada</p>
                </div>
                <button onClick={onClose}>X</button>
              </div>
            </div>
        </dialog>
    );
}