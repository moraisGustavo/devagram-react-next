import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


// IMPORTAÇAO DAS IMAGENS
import imgHome from '../../public/imagens/home.svg'
import imgHomeAtivo from '../../public/imagens/homeAtivo.svg'
import imgPublicacao from '../../public/imagens/publicacao.svg'
import imgPublicacaoAtiva from '../../public/imagens/publicacaoAtiva.svg'
import imgUser from '../../public/imagens/user.svg'
import imgUserAtivo from '../../public/imagens/userAtivo.svg'


const mapaDeRotas = {
    home: {
        imagemAtivo: imgHomeAtivo,
        rotasAtivacao: ['/'],
        imgPadrao: imgHome
    },
    publicacao: {
        imagemAtivo: imgPublicacaoAtiva,
        rotasAtivacao: ['/publicacao'],
        imgPadrao: imgPublicacao
    },
    perfil: {
        imagemAtivo: imgUserAtivo,
        rotasAtivacao: ['/perfil/eu', '/perfil/editar'],
        imgPadrao: imgUser
    }
}

export default function Navegacao({ className }) {
    const [rotaAtiva, setRotaAtiva] = useState('home');
    const router = useRouter();

    useEffect(() => {
        definirRotaAtiva();
    },[router.asPath]);

    //  VERIFICA EM QUAL ROTA ESTA ATUALMENTE
    const definirRotaAtiva = () => {
        const chavesDoMapaDeRotas = Object.keys(mapaDeRotas); // busca as chaves do objeto
        const  indiceAtivo = chavesDoMapaDeRotas.findIndex(chave =>{ //busca o indice dentro do array
            return mapaDeRotas[chave].rotasAtivacao.includes(   // verifica se dentro do arry existe o valor passado no parametro
                window.location.pathname // retorna a informaçao que esta dps da porta 
            );
        });
        //se ele nao encontrar o indice , é retornado -1
        if(indiceAtivo === -1){
            setRotaAtiva('home');
        }else{
            setRotaAtiva(chavesDoMapaDeRotas[indiceAtivo]);
        }
    }

    
    const obterImagem = (nomeRota) => {
        const rotaAtivada = mapaDeRotas[nomeRota];

        if(rotaAtiva === nomeRota) {
            return rotaAtivada.imagemAtivo;
        }
        return rotaAtivada.imgPadrao;
    }
    

    const aoClicarNoIcone = (nomeRota) => {
        setRotaAtiva(nomeRota);
        router.push(mapaDeRotas[nomeRota].rotasAtivacao[0]);
    }

    return (
        <nav className={`barraNavegacao ${className}`}>
            <ul>
                {/* ICONE HOME */}
                <li onClick={() => aoClicarNoIcone('home')}>    
                    <Image
                        src={obterImagem('home')}
                        alt="Icone Home"
                        width={20}
                        height={20}
                    />
                </li>

                {/* ICONE PUBLICACAO */}
                <li onClick={() => aoClicarNoIcone('publicacao')}>
                    <Image
                        src={obterImagem('publicacao')}
                        alt="Icone Publicacao"
                        width={20}
                        height={20}
                    />
                </li>

                {/* ICONE USER */}
                <li onClick={() => aoClicarNoIcone('perfil')}>
                    <Image
                        src={obterImagem('perfil')}
                        alt="Icone Usuario"
                        width={20}
                        height={20}
                    />
                </li>

            </ul>
        </nav>
    );
}