//Footer de la pagina

export default function Footer(){
    const fecha = new Date().getFullYear()
    return(
        <footer className="stats">
            <em>
                 😊 ESTA ES LA MEJOR TIENDA DE ARGENTINA... 
                 {fecha}
            </em>
        </footer>
    )
}