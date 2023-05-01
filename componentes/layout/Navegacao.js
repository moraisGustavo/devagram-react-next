import Image from "next/image";


// IMPORTAÇAO DAS IMAGENS
import imgHome from '../../public/imagens/home.svg'
import imgHomeAtivo from '../../public/imagens/homeAtivo.svg'
import imgPublicacao from '../../public/imagens/publicacao.svg'
import imgPublicacaoAtiva from '../../public/imagens/PublicacaoAtiva.svg'
import imgUser from '../../public/imagens/user.svg'
import imgUserAtivo from '../../public/imagens/userAtivo.svg'



export default function Navegacao({ className }) {
    return (
        <nav className={`barraNavegacao ${className}`}>
            <ul>
                {/* ICONE HOME */}
                <li>    
                    <Image
                        src={imgHomeAtivo}
                        alt="Icone Home"
                        width={20}
                        height={20}
                    />
                </li>

                {/* ICONE PUBLICACAO */}
                <li>
                    <Image
                        src={imgPublicacao}
                        alt="Icone Publicacao"
                        width={20}
                        height={20}
                    />
                </li>

                {/* ICONE USER */}
                <li>
                    <Image
                        src={imgUser}
                        alt="Icone Usuario"
                        width={20}
                        height={20}
                    />
                </li>

            </ul>
        </nav>
    );
}