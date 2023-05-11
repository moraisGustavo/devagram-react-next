import { useEffect, useState } from "react"
import FeedService from "../../services/FeedService";
import Postagem from "./Postagem";

const feedService = new FeedService();

export function Feed({ usuarioLogado }) {
    const [listaDePostagens, setListaDePostagens] = useState([]);


    // TESTE 1 
    // useEffect(() => {
    //     async function carregarPostagens() {
    //         const { data } = await feedService.carregarPostagens();
    //         console.log(data);
    //     }
    //     setListaDePostagens([
    //         {
    //             id: '1',
    //             usuario: {
    //                 id: '1',
    //                 nome: 'Gustavo',
    //                 avatar: null,
    //             },
    //             fotoDoPost: 'https://i.pinimg.com/564x/b5/60/cb/b560cbee05d252544e66c11a9129be08.jpg',
    //             descricao: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere iste id, labore repellat dolores explicabo libero cumque nemo sit in enim accusantium ullam corporis autem illo at, ad amet fugiat.',
    //             likes: [],
    //             comentarios: [
    //                 {
    //                     nome: 'Fulano',
    //                     mensagem: 'Comentario 1'
    //                 },
    //                 {
    //                     nome: 'Ciclano',
    //                     mensagem: 'Comentario 2'
    //                 }
    //             ]
    //         },
    //         {
    //             id: '2',
    //             usuario: {
    //                 id: '2',
    //                 nome: 'Beltrano',
    //                 avatar: null,
    //             },
    //             fotoDoPost: 'https://i.pinimg.com/564x/d5/b8/af/d5b8af8ac9e47f7094fa09127f56fd87.jpg',
    //             descricao: 'Nice!',
    //             likes: [],
    //             comentarios: [{
    //                 nome: 'Ciclano',
    //                 mensagem: 'Comentario 3'
    //             }]
    //         },
    //     ]);
    // }, [usuarioLogado]);



    // TESTE 2

    useEffect(() => {
        async function carregarPostagens() {
            const { data } = await feedService.carregarPostagens();
            console.log(data);
            const postagensFormatadas = data.map((postagem) => ({
                id: postagem._id,
                usuario: {
                    id: postagem.idUsuario,
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