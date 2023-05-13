import Link from "next/link";
import Avatar from "../avatar";
import Image from "next/legacy/image";
import { useState } from "react";
import { FazerComentario } from "./FazerComentario";
import FeedService from "../../services/FeedService";

// IMPORTACAO DAS IMAGENS  
import iconeCurti from '../../public/imagens/curtir.svg'
import iconeCurtido from '../../public/imagens/curtido.svg'
import iconeComentario from '../../public/imagens/comentario.svg'
import iconeComentarioMarcado from '../../public/imagens/comentarioMarcado.svg'

const tamanhoLimiteDescricao = 90;
const feedService = new FeedService();

export default function Postagem({
    id,
    usuario,
    fotoDoPost,
    descricao,
    comentarios,
    usuarioLogado,
    curtidas
}) {
    const [curtidasPostagem, setCurtidasPostagem] = useState(curtidas);
    const [comentariosPostagem, setComentariosPostagem] = useState(comentarios);
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

    const obterIconeComentario = () => {
        return deveExibirSecaoParaComentar
            ? iconeComentarioMarcado
            : iconeComentario;
    }

    const comentar = async (comentario) => {
        try {
            await feedService.adicionarComentario(id, comentario);
            setDeveExibirSecaoParaComentar(false);
            setComentariosPostagem([
                ...comentariosPostagem,
                {
                    nome: usuarioLogado.nome,
                    mensagem: comentario
                }
            ]);
            return true;
        } catch (e) {
            alert(`Erro ao fazer comentario! ` + (e?.response?.data?.erro || ''));
        }
    }
    
    const usuarioLogadoCurtiuPostagem = () => {
        return curtidasPostagem.includes(usuarioLogado.id);
    }

    const alterarCurtida = async () => {
        try {
            await feedService.alterarCurtida(id);
            if (usuarioLogadoCurtiuPostagem()) {
                // TIRA O USUARIO LOGADO DA LISTA DE CURTIDAS
                setCurtidasPostagem(
                    curtidasPostagem.filter(idUsuarioQueCurtiu => idUsuarioQueCurtiu !== usuarioLogado.id)
                );
            }else{
                // ADICIONA O USUARIO LOGADO NA LISTA DE CURTIDAS
                setCurtidasPostagem([
                    ...curtidasPostagem,
                    usuarioLogado.id
                ])
            }
        } catch (e) {
            alert (`Erro ao curti a publicaçao` + (e?.response?.data?.erro || ''));
        }
    }

    const obterIconeCurtir =() => {
        return usuarioLogadoCurtiuPostagem()
            ? iconeCurtido
            : iconeCurti
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
                        src={obterIconeCurtir()}
                        alt="icone curtir"
                        height={20}
                        width={20}
                        onClick={alterarCurtida}
                    />
                    <Image
                        src={obterIconeComentario()}
                        alt="icone comentario"
                        height={20}
                        width={20}
                        onClick={() => setDeveExibirSecaoParaComentar(!deveExibirSecaoParaComentar)}
                    />

                    <span className="quantidadeDeCurtidas">
                        Curtido por <strong>{curtidasPostagem.length} pessoas</strong>
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
                    {comentariosPostagem.map((comentario, i) => (
                        <div className="comentario" key={i}>
                            <strong className="nomeUsuario">{comentario.nome}</strong>
                            <p className="descricao">{comentario.mensagem}</p>
                        </div>
                    ))}
                </div>
            </div>

            {deveExibirSecaoParaComentar &&
                <FazerComentario
                    comentar={comentar}
                    usuarioLogado={usuarioLogado}
                />
            }

        </div>
    );
}