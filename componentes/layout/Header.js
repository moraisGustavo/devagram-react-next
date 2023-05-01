import Image from 'next/legacy/image';
import Navegacao from './Navegacao';
import { useState } from 'react';


//IMPORTAÇAO DAS IMAGENS
import logoHorizontal from '../../public/imagens/logoHorizontal.svg'
import iconeLupa from '../../public/imagens/search.svg'
import ResultadoPesquisa from './ResultadoPesquisa';


export default function Header() {
    const [resultadoPesquisa, setResultadoPesquisa] = useState([]);
    const [termoPesquisao, setTermoPesquisado] = useState([]);

    const aoPesquisar = (e) => {
        setTermoPesquisado(e.target.value);
        setResultadoPesquisa([]);
    }

    const aoClicarResultadoPesquisa = (id) => {
        console.log('aoClicarResultadoPesquisa', {id});
    }

    return (
        <header className='homeHeader'>
            <div className='conteudoHomeHeader'>
                {/* LOGO PRINCIPAL */}
                <div className='logoHomeHeader'>
                    <Image
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
                        value={termoPesquisao}
                        onChange={aoPesquisar}
                    />
                </div>

                <Navegacao className='desktop' />
            </div>

            { resultadoPesquisa.length > 0 && (
                <div className='resultadoPesquisaContainer'>
                    {resultadoPesquisa.map(r => (
                        <ResultadoPesquisa 
                            avatar={r.avatar}
                            name={r.nome}
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