import './Galeria.css'
import icon from "../../assets/img/upload.svg"
import { Botao } from '../../components/botao/Botao'
import { Card } from '../../components/card/Card'
import imgNotFound from "../../assets/img/notFound.jpg"

//Importar o seu SweetAlert
import Swal from 'sweetalert2';
import api from "../../Services/services";
import { use, useEffect, useState } from 'react';

export const Galeria = (props) => {
    const [ListaImg, setListaImg] = useState([]);
    const [img, setImg] = useEffect("");

    function alertar(icone, mensagem) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: icone,
            title: mensagem
        });
    }

    async function listarImg() {
        try {
            const resposta = await api.get("imagens");

            setListaImg(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function cadastrarImg(e) {
        if (img.trim() !== "") {
            try {
                await api.post("imagens", { Nome: nome, Caminho: caminho });

                alertar("success", "Cadastro realizado com sucesso");
                setImg("");
            } catch (error) {
                alertar("error", "Erro! Entre em contato com o suporte!");
                console.log(error);
            }
        } else {
            alertar("warning", "Preencha o campo!");
        }
    }

    useEffect(() => {
        listarImg();
    }, [])

    return (
        <>
            <h1 className='tituloGaleria'>Galeria Online</h1>

            <form className="formulario" onSubmit={cadastrarImg}>
                <div className="campoNome">
                    <label>Nome</label>
                    <input type="text" className="inputNome" />
                </div>

                <div className="campoImagem">
                    <label className="arquivoLabel">
                        <i><img src={icon} alt="Icone de upload de imagem" /></i>
                        <input type="file" className="arquivoInput" />
                    </label>
                </div>
                <Botao nomeBotao="Cadastrar" />
            </form>

            <div className="campoCards">
                {ListaImg.length > 0 ? (
                    ListaImg.map((item) => (
                        <Card 
                        tituloCard={item.nome}  />
                    ))
                ) : 
                (
                    <Card tituloCard="Não à imagens):" imagem={imgNotFound} />
                )
            }
                <p>erro</p>
            </div>
        </>
    )
}