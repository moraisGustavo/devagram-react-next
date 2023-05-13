import { useEffect, useState } from "react"
import FeedService from "../../services/FeedService";
import Postagem from "./Postagem";

const feedService = new FeedService();

export default function Feed({ usuarioLogado }) {
    const [listaDePostagens, setListaDePostagens] = useState([]);
 
    useEffect(() => {
        async function carregarPostagens() {
            const { data } = await feedService.carregarPostagens();
            console.log(data);
            const postagensFormatadas = data.map((postagem) => ({
                id: postagem._id,
                usuario: {
                    id: postagem.userId,
                    nome: postagem.usuario.nome,
                    avatar: postagem.usuario.avatar,
                },
                fotoDoPost: postagem.foto,
                descricao: postagem.descricao,
                curtidas: postagem.likes,
                comentarios: postagem.comentarios.map((c) => ({
                    nome: c.nome,
                    mensagem: c.comentario,
                })),
            }));
            setListaDePostagens(postagensFormatadas);
        }
        carregarPostagens(); 
    }, [usuarioLogado]);

    return (
        <div className="feedContainer largura50pctDescktop">
            {listaDePostagens.map(dadosPostagem => (
                <Postagem
                    key={dadosPostagem.id}
                    {...dadosPostagem}
                    usuarioLogado={usuarioLogado}
                />
            ))}
        </div>
    )
}