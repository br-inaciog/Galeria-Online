import "./Card.css"
import imgPen from "../../assets/img/pen.svg"
import imgTrash from "../../assets/img/trash.svg"

//Importar o seu SweetAlert
import Swal from 'sweetalert2';
import api from "../../Services/services";
import { use, useEffect, useState } from 'react';

export const Card = ({ tituloCard, imgCard, funcaoEditar, funcaoExcluir }) => {
    return (
        <>
            <div className="cardDaImagem">
                <p>{tituloCard}</p>
                <img className="imgDoCard" src={imgCard} alt="Imagem relacionada ao card." />
                <div className="icons">
                    <img className="iconeEditar" src={imgPen} alt="icone de caneta para realizar uma alteração." onClick={funcaoEditar}/>
                    <img className="iconeExcluir" src={imgTrash} alt="icone de lixo para realizar a exclusão." onClick={funcaoExcluir}/>
                </div>
            </div>
        </>
    )
}