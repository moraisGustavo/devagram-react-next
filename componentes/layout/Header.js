import Image from 'next/legacy/image';
import { useState } from 'react';
import Navegacao from './Navegacao';
import ResultadoPesquisa from './ResultadoPesquisa';
import UsuarioService from '../../services/UsuarioService';


//IMPORTAÇAO DAS IMAGENS
import iconeLupa from '../../public/imagens/search.svg'
import logoHorizontal from '../../public/imagens/logoHorizontal.svg'
import { useRouter } from 'next/router';
import IdUsuario from '../../pages/perfil/[id]';


const usuarioService = new UsuarioService();

export default function Header() {
    const [resultadoPesquisa, setResultadoPesquisa] = useState([]);
    const [termoPesquisado, setTermoPesquisado] = useState('');
    const router = useRouter();

    let cabecalhoClassName = '';
    if (window && window.location.pathname !== '/'){
        cabecalhoClassName = 'desktop';
    }

    const aoPesquisar = async (e) => {
        setTermoPesquisado(e.target.value);
        setResultadoPesquisa([]);

        if (termoPesquisado.length < 3) {
            return;
        }
        try {
            const { data } = await usuarioService.pesquisar(termoPesquisado);
            setResultadoPesquisa(data);
        } catch (error) {
            alert('Erro ao pesquisar usuario. ' + error?.response?.data?.erro);
        }
    }

    const aoClicarResultadoPesquisa = (id) => {
        setResultadoPesquisa([]);
        setTermoPesquisado('');
        router.push(`/perfil/${id}`);
    }

    const redirecionarHome = () => {
        router.push('/');
    }

    return (
        <header className={`homeHeader ${cabecalhoClassName}`}>
            <div className='conteudoHomeHeader'>
                {/* LOGO PRINCIPAL */}
                <div className='logoHomeHeader'>
                    <Image
                        onClick={redirecionarHome}
                        src={logoHorizontal}
                        alt='Logo Devagram'
                        layout='fill'
                    />
                </div>

                {/* BARRA DE PESQUISA */}
                <div className='barraPesquisa'>
                    <div className='containerImagemLupa'>
                        <Image
                            src={iconeLupa}
                            alt='Icone Lupa'
                            layout='fill'
                        />
                    </div>
                    <input
                        type='text'
                        placeholder='Pesquisar'
                        value={termoPesquisado}
                        onChange={aoPesquisar}
                    />
                </div>

                <Navegacao className='desktop' />
            </div>

            {resultadoPesquisa.length > 0 && (
                <div className='resultadoPesquisaContainer'>
                    {resultadoPesquisa.map(r => (
                        <ResultadoPesquisa
                            avatar={r.avatar}
                            nome={r.nome}
                            email={r.email}
                            key={r._id}
                            id={r._id}
                            onClick={aoClicarResultadoPesquisa}
                        />
                    ))}
                </div>
            )}
        </header>
    );
}