import "./Home.css"
import { Botao } from "../../components/botao/Botao"

export const Home = () => {
    return (
        <>
            <div className="tituloHome">
                <h2>Bem-vindo a</h2>
                <h1>Galeria Online</h1>
                <Link to="/" className="logo_header">
                    <Botao nomeBotao="Entrar" />
                </Link>
            </div>
        </>
    )
}