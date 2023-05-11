import { useEffect, useState } from "react"
import FeedService from "../../services/FeedService";
import Postagem from "./Postagem";

const feedService = new FeedService();

export function Feed({ usuarioLogado }) {
    const [listaDePostagens, setListaDePostagens] = useState([]);

    // useEffect(() => {
    //     async function carregarPostagens() {
    //         const { data } = await feedService.carregarPostagens();
    //         console.log(data);
    //     }

    //     const postagensFormatadas = data.map((postagem) => (
    //         {
    //             id: postagem._id,
    //             usuario: {
    //                 id: postagem.userId,
    //                 nome: postagem.usuario.nome,
    //                 avatar: postagem.usuario.avatar
    //             },
    //             fotoDoPost: postagem.foto,
    //             descriçao: postagem.descricao,
    //             curtidas: postagem.likes,
    //             comentarios: postagem.comentarrios.map(c => ({
    //                 nome: c.nome,
    //                 mensagem: c.comentario
    //             }))
    //         }
    //     ));

    //     setListaDePostagens(postagensFormatadas);


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
                descriçao: postagem.descricao,
                curtidas: postagem.likes,
                comentarios: postagem.comentarios.map((c) => ({
                    nome: c.nome,
                    mensagem: c.comentarios,
                })),
            }));
            setListaDePostagens(postagensFormatadas);
        }

        carregarPostagens();
    }, [usuarioLogado]);


    //     setListaDePostagens([
    //         {
    //             id: '1',
    //             usuario: {
    //                 id: '1',
    //                 nome: 'Sauron',
    //                 avatar: null,
    //             },
    //             fotoDoPost: 'https://i.pinimg.com/564x/b5/60/cb/b560cbee05d252544e66c11a9129be08.jpg',
    //             descricao: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere iste id, labore repellat dolores explicabo libero cumque nemo sit in enim accusantium ullam corporis autem illo at, ad amet fugiat.',
    //             likes: [],
    //             comentarios: [
    //                 {
    //                     nome: 'Orc',
    //                     mensagem: 'HOEKSMCO'
    //                 },
    //                 {
    //                     nome: 'Orc2',
    //                     mensagem: 'OXIAHJPXI'
    //                 }
    //             ]
    //         },
    //         {
    //             id: '2',
    //             usuario: {
    //                 id: '2',
    //                 nome: 'Gandalf',
    //                 avatar: null,
    //             },
    //             fotoDoPost: 'https://i.pinimg.com/564x/d5/b8/af/d5b8af8ac9e47f7094fa09127f56fd87.jpg',
    //             descricao: 'Nice!',
    //             likes: [],
    //             comentarios: [{
    //                 nome: 'Ciclano',
    //                 mensagem: 'Gandalf The lord of the Rings'
    //             }]
    //         },
    //     ]);
    // }, [usuarioLogado]);

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