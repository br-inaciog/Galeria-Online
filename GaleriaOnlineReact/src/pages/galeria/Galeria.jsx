import './Galeria.css'
import icon from "../../assets/img/upload.svg"
import { Botao } from '../../components/botao/Botao'
import { Card } from '../../components/card/Card'
import imgNotFound from "../../assets/img/notFound.jpg"

//Importar o seu SweetAlert
import Swal from 'sweetalert2';

import api from "../../Services/services";
import { useEffect, useState } from 'react';

export const Galeria = (props) => {
    const [cards, setCards] = useState([]);
    const [imagem, setImagem] = useState(null);
    const [nomeImagem, setNomeImagem] = useState("");

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

    async function listarCards() {
        try {
            const resposta = await api.get("Imagem");
            // console.log(resposta.data);

            setCards(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function cadastrarCard(e) {
        e.preventDefault();
        if (imagem && nomeImagem) {
            try {
                //FormData é uma interface JS que permite construir um conjunto de pares cahve/valor representando os dados de um formulário HTML.
                const formData = new FormData();
                //append: anexar/acresentar/adicionar
                formData.append("Nome", nomeImagem);
                formData.append("Arquivo", imagem);

                await api.post("Imagem/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                alertar("success", "Obaa, cadastrou!!")
            } catch (error) {
                alertar("error", "Erro! Entre em contato com o suporte!");
                console.log(error);
            }
        } else {
            alertar("warning", "Preencha o campo!");
        }
    }

    function editarCard(id, nomeAntigo) {
        const novoNome = prompt("Digite o novo nome da imagem:", nomeAntigo);

        const inputArquivo = document.createElement("input");
        inputArquivo.type = "file";
        //Aceita imagens independente das extensões
        inputArquivo.accept = "image/*";
        inputArquivo.style = "display: none";
        // <input type="file" accept="image/*"></input>

        // Define o que acontece quando o usuário selecionar um arquivo
        inputArquivo.onchange = async (e) => {
            const novoArquivo = e.target.files[0];

            const formData = new FormData();
            //adicionar o novo nome no formData:
            formData.append("Nome", novoNome);
            formData.append("Arquivo", novoArquivo);

            if (formData) {
                try {
                    await api.put(`Imagem/${id}`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                    alertar("success", "Card eidtado com sucesso!")
                    listarCards();
                } catch (error) {
                    alertar("error", "Erro ao editar card.")
                    console.error(error);
                }
            }
        };
        inputArquivo.click();
    }

    async function excluirCard(id) {
        try {
            await api.delete(`Imagem/${id}`);
            alertar("success", "Imagem apagada!")
        } catch (error) {
            alertar("error", "Erro, consulte o suporte.");
            console.log(error);
        }
    }

    useEffect(() => {
        listarCards();
    });

    return (
        <>
            <h1 className='tituloGaleria'>Galeria Online </h1>

            <form className='formulario' onSubmit={cadastrarCard}>
                <div className='campoNome'>
                    <label>Nome</label>
                    <input
                        type="text"
                        className='inputNome'
                        onChange={(e) => setNomeImagem(e.target.value)}
                        value={nomeImagem}
                        placeholder='Nome da Imagem...'
                    />
                </div>

                <div className='campoImagem'>
                    <label className='arquivoLabel'>
                        <i><img src={icon} alt="Ícone de upload" /></i>
                        <input
                            type="file"
                            className='arquivoInput'
                            onChange={(e) => setImagem(e.target.files[0])}
                        />
                    </label>
                </div>
                <Botao nomeBotao="Cadastrar" />
            </form>

            <div className='campoCards'>
                {cards.length > 0 ? (
                    cards.map((e) => (
                        <Card
                            key={e.id}
                            tituloCard={e.nome}
                            imgCard={`https://localhost:7031/${e.caminho.replace("wwwroot/", "")}`}
                            funcaoEditar={() => editarCard(e.id, e.nome)}
                            funcaoExcluir={() => excluirCard(e.id)}
                        />
                    ))
                ) :
                    (
                        <Card tituloCard="Não à imagens ):" imgCard={imgNotFound} />
                    )
                }
            </div>
        </>
    )
}