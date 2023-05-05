import Link from "next/link";
import Avatar from "../avatar";
import Image from "next/legacy/image";

// IMPORTACAO DAS IMAGENS  
import iconeCurti from '../../public/imagens/curtir.svg'
import iconeCurtido from '../../public/imagens/curtido.svg'
import iconeComentario from '../../public/imagens/comentario.svg'
import iconeComentarioMarcado from '../../public/imagens/comentarioMarcado.svg'
import { useState } from "react";
import { FazerComentario } from "./FazerComentario";


const tamanhoLimiteDescricao = 90;

export default function Postagem({
    usuario,
    fotoDoPost,
    descricao,
    comentarios,
    usuarioLogado
}) {

    const [deveExibirSecaoParaComentar, setDeveExibirSecaoParaComentar] = useState(false);
    const [tamanhoAtualDescricao, setTamanhoAtualDescricao] = useState(
        tamanhoLimiteDescricao
    );

    const exibirDescricaoCompleta = () => {
        setTamanhoAtualDescricao(Number.MAX_SAFE_INTEGER);
    }

    const descricaoMaior = () => {
        return descricao.length > tamanhoAtualDescricao;
    }


    const obterDescricao = () => {
        let mensagem = descricao.substring(0, tamanhoAtualDescricao);
        return mensagem;
    }


    return (
        <div className="postagem">
            <Link href={`/perfil/${usuario.id}`}>
                <section className="cabecalhoPostagem">
                    <Avatar src={usuario.avatar} />
                    <strong>{usuario.nome}</strong>
                </section>
            </Link>

            <div className="fotoPostagem">
                <img src={fotoDoPost} alt="Foto da Postagem"></img>
            </div>

            <div className="rodapeDaPostagem">
                <div className="acoesDaPostagem">
                    <Image
                        src={iconeCurti}
                        alt="icone curtir"
                        height={20}
                        width={20}
                        onClick={() => console.log('Curtido')}
                    />
                    <Image
                        src={iconeComentario}
                        alt="icone comentario"
                        height={20}
                        width={20}
                        onClick={() => setDeveExibirSecaoParaComentar(!deveExibirSecaoParaComentar)}
                    />

                    <span className="quantidadeDeCurtidas">
                        Curtido por <strong>32 pessoas</strong>
                    </span>
                </div>

                <div className="descricaoDaPostagem">
                    <strong className="nomeUsuario">{usuario.nome}</strong>
                    <p className="descricao">
                        {obterDescricao()}
                        {descricaoMaior() && (
                            <span
                                className="exibirDescricaoCompleta"
                                onClick={exibirDescricaoCompleta}
                            >
                                ...mais
                            </span>
                        )}
                    </p>
                </div>

                <div className="comentariosDaPostagem">
                    {comentarios.map((comentario, i) => (
                        <div className="comentario" key={i}>
                            <strong className="nomeUsuario">{comentario.nome}</strong>
                            <p className="descricao">{comentario.mensagem}</p>
                        </div>
                    ))}
                </div>
            </div>

            {deveExibirSecaoParaComentar &&
                <FazerComentario
                    usuarioLogado={usuarioLogado}
                />
            }

        </div>
    );
}