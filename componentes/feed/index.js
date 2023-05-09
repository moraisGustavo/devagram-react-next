import { useEffect, useState } from "react"
import FeedServices from "../../services/FeedServices";
import Postagem from "./Postagem";

const feedService = new FeedServices();

export function Feed({ usuarioLogado }) {
    const [listaDePostagens, setListaDePostagens] = useState([]);

    // useEffect(async () => {
    //     const { data } = await feedService.carregarPostagens();
    //     console.log(data);

    useEffect(() => {
        async function carregarPostagens() {
          const { data } = await feedService.carregarPostagens();
          console.log(data);
        }
        carregarPostagens();

        setListaDePostagens([
            {
                id: '1',
                usuario: {
                    id: '1',
                    nome: 'Gustavo',
                    avatar: 'https://i.pinimg.com/564x/5e/08/dc/5e08dcac4f908e58814bdabf12ac8b0d.jpg',
                },
                fotoDoPost: 'https://img.freepik.com/vetores-premium/guerreiro-anao-de-rpg-colorido-em-vetor_875525-1.jpg',
                descricao: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere iste id, labore repellat dolores explicabo libero cumque nemo sit in enim accusantium ullam corporis autem illo at, ad amet fugiat.',
                likes: [],
                comentarios: [
                    {
                        nome: 'Fulano',
                        mensagem: 'Muito massa.'
                    },
                    {
                        nome: 'Ciclano',
                        mensagem: 'Shooooow'
                    }
                ]
            },
            {
                id: '2',
                usuario: {
                    id: '2',
                    nome: 'Fulano',
                    avatar: null,
                },
                fotoDoPost: 'https://i.pinimg.com/236x/f6/53/c5/f653c5711498653860b28542d0631f4b.jpg',
                descricao: 'Nice!',
                likes: [],
                comentarios: [{
                    nome: 'Ciclano',
                    mensagem: 'Booooa'
                }]
            },
        ]);
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