import { useEffect, useState } from "react"
import Postagem from "./Postagem";

export function Feed({ usuarioLogado }) {

    const [listaDePostagens, setListaDePostagens] = useState([]);


    useEffect(() => {
        console.log('carregar o feed');
        setListaDePostagens([
            {
                id: '1',
                usuario: {
                    id: '1',
                    nome: 'Gustavo',
                    avatar: null,
                },
                fotoDoPost: 'https://img.freepik.com/vetores-premium/guerreiro-anao-de-rpg-colorido-em-vetor_875525-1.jpg',
                descricao: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere iste id, labore repellat dolores explicabo libero cumque nemo sit in enim accusantium ullam corporis autem illo at, ad amet fugiat.',
                likes: [],
                comentarios:[
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
                    nome: 'Pamella',
                    avatar: null,
                },
                fotoDoPost: 'https://i.pinimg.com/236x/f6/53/c5/f653c5711498653860b28542d0631f4b.jpg',
                descricao: '',
                likes: [],
                comentarios: [{
                    nome: 'Ciclano',
                    mensagem: 'Muito Obg Gpt'
                }]
            },
        ]);
    },[usuarioLogado]);

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