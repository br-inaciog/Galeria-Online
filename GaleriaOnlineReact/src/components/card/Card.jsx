import "./Card.css"
import imgPen from "../../assets/img/pen.svg"
import imgTrash from "../../assets/img/trash.svg"

export const Card = ({ tituloCard, imagem }) => {
    return (
        <>
            <div className="cardDaImagem">
                <p>{tituloCard}</p>

                <img className="imgDoCard" src={imagem} alt="Imagem relacionada ao card." />

                <div className="icons">
                    <img src={imgPen} alt="icone de caneta para realizar uma alteração." />
                    <img src={imgTrash} alt="icone de lixo para realizar a exclusão." />
                </div>
            </div>
        </>
    )
}