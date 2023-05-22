import { useRouter } from "next/router";
import CabecalhoComAcoes from "../../componentes/cabecalhoComAcoes";
import comAutorizacao from "../../hoc/comAutorizacao"
import { UploadImagem } from "../../componentes/uploadImagem";
import { useEffect, useState } from "react";

import imgAvatarPadrao from '../../public/imagens/avatar.svg';
import iconeLimpar from '../../public/imagens/limpar.svg';
import Image from "next/legacy/image";
import UsuarioService from "../../services/UsuarioService";
import { validarNome } from "../../utils/validadores";

const usuarioService = new UsuarioService();

function EditarPerfil({ usuarioLogado}) {
    const [avatar, setAvatar] = useState();
    const [inputAvatar, setInputAvatar] = useState('');
    const [nome, setNome] = useState('');
    const router = useRouter();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{
        if(!usuarioLogado){
            return;
        }
        setNome(usuarioLogado.nome);
        setAvatar({
            preview: usuarioLogado.avatar
        });
    },[]);

    const atualizarPerfil = async () => {
        try {
            if(!validarNome(nome)){
                alert('Nome precisa de pelo menos 2 caracteres');
                return;
            }

            const corpoRequisicao = new FormData();
            corpoRequisicao.append('nome', nome);

            if(avatar.arquivo){
                corpoRequisicao.append('file', avatar.arquivo);
            }

            await usuarioService.atualizarPerfil(corpoRequisicao); 
            localStorage.setItem('nome',nome);
            if(avatar.arquivo){
                localStorage.setItem('avatar', avatar.preview);
            }
            
            router.push('/perfil/eu');
        } catch (error) {
            alert ('Erro ao atualizar perfil.')
        }
    }

    const aoCancelarEdicao = () => {
        router.push('/perfil/eu');
    }

    const abrirSeletorArquivos = () => {
        inputAvatar?.click();
    }


    return (
        <div className="paginaEditarPerfil larguraDesktop">
            <div className="conteudoPaginaEditarPerfil">
                <CabecalhoComAcoes
                    titulo={'Editar Perfi'}
                    textoEsquerda='Cancelar'
                    aoClicarAcaoEsquerda={aoCancelarEdicao}
                    elementoDireita={'Concluir'}
                    aoClicarElementoDireita={atualizarPerfil}
                />

                <hr className="divisoria" />

                <div className="edicaoAvatar">
                    <UploadImagem
                        setImagem={setAvatar}
                        imagemPreview={avatar?.preview || imgAvatarPadrao.src}
                        imagemPreviewClassName="avatar"
                        aoSetarAreferencia={setInputAvatar}
                    />

                    <span onClick={abrirSeletorArquivos}>Alterar Foto do Perfil</span>

                </div>

                    <hr className="divisoria" />

                <div className="edicaoNome">
                    <label>Nome</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />

                    <Image
                        src={iconeLimpar}
                        alt="Icone Limpar"
                        width={16}
                        height={16}
                        onClick={() => setNome('')}
                    />
                </div>

                <hr className="divisoria" />

            </div>
        </div>
    );
}

export default comAutorizacao(EditarPerfil);