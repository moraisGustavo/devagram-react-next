import { useState } from "react";
import { UploadImagem } from "../../componentes/uploadImagem";
import { useRouter } from "next/router";
import CabecalhoComAcoes from "../../componentes/cabecalhoComAcoes"
import comAutorizacao from "../../hoc/comAutorizacao"
import Botao from "../../componentes/botao";
import FeedService from "../../services/FeedService";

// IMPORTACAO IMAGENS
import iconeNovaPublicacao from '../../public/imagens/novaPublicacao.svg'
import iconeSetaEsquerda from '../../public/imagens/setaEsquerda.svg'


const limiteDaDescricao = 255;
const descricaoMinima = 2;
const feedService = new FeedService();

function Publicacao() {
    const [imagem, setImagem] = useState();
    const [descricao, setDescricao] = useState('');
    const [inputImagem, setInputImagem] = useState();
    const [etapaAtual, setEtapaAtual] = useState(1);
    const router = useRouter();

    const estaNaEtapaUm = () => etapaAtual === 1;

    const obterTextoEsquerdaCabecalho = () => {
        if (estaNaEtapaUm() && imagem) {
            return ' Cancelar';
        }
        return '';
    }

    const obterTextoDireitaCabecalho = () => {
        if (!imagem) {
            return '';
        }
        if (estaNaEtapaUm() && imagem) {
            return ' Avançar';
        }
        return 'Compartilhar';
    }

    const aoClicarAcaoEsquerdaCabecalho = () => {
        if (estaNaEtapaUm()) {
            inputImagem.value = null;
            setImagem(null);
            return;
        }
        setEtapaAtual(1);
    }

    const aoClicarAcaoDireitaCabecalho = () => {
        if (estaNaEtapaUm()) {
            setEtapaAtual(2);
            return;
        }
        publicar();
    }

    const escreverDescricao = (e) => {
        const valorAtual = e.target.value;
        if (valorAtual.length >= limiteDaDescricao) {
            return;
        }
        setDescricao(valorAtual);
    }

    const obterClassNameCabecalho = () => {
        if (estaNaEtapaUm()) {
            return 'primeiraEtapa';
        }
        return 'segundaEtapa';
    }


    const publicar = async () => {
        try {
            if (!validarFormulario()) {
                alert('A descrição precisa de pelo menos 3 caracteres e a imagem precisa estar selecionada.');
                return;
            }

            const corpoPublicacao = new FormData();
            corpoPublicacao.append('descricao', descricao);
            corpoPublicacao.append('file', imagem.arquivo);

            await feedService.fazerPublicacao(corpoPublicacao);
            router.push('/');
        } catch (error) {
            alert('Erro ao salvar publicação!');
        }
    }

    const validarFormulario = () => {
        return (
            descricao.length >= descricaoMinima
            && imagem?.arquivo
        );
    }

    return (
        <div className="paginaPublicacao larguraDesktop">

            <CabecalhoComAcoes
                className={obterClassNameCabecalho()}
                iconeSetaEsquerda={estaNaEtapaUm() ? null : iconeSetaEsquerda}
                textoEsquerda={obterTextoEsquerdaCabecalho()}
                aoClicarAcaoEsquerda={aoClicarAcaoEsquerdaCabecalho}
                elementoDireita={obterTextoDireitaCabecalho()}
                aoClicarElementoDireita={aoClicarAcaoDireitaCabecalho}
                titulo='Nova Publicação'
            />

            <hr className="divisoria" />

            <div className="conteudoPaginaPublicacao">
                {estaNaEtapaUm()
                    ? (
                        // PUBLICACAO ETAPA 1
                        <div className="primeiraEtapaPublicacao">
                            <UploadImagem
                                setImagem={setImagem}
                                aoSetarAreferencia={setInputImagem}
                                imagemPreviewClassName={!imagem ? 'previewImagemPublicacao' : 'previewImagemSelecionada'}
                                imagemPreview={imagem?.preview || iconeNovaPublicacao.src}
                            />

                            <span className="desktop textoDragAndDrop">Arraste sua foto aqui!</span>

                            <Botao
                                texto='Selecionar uma imagem'
                                manipularClick={() => inputImagem?.click()}
                            />
                        </div>
                    ) : (
                        // PUBLICACAO ETAPA 2
                        <>
                            <div className="segundaEtapaPublicacao">
                                <UploadImagem
                                    setImagem={setImagem}
                                    imagemPreview={imagem?.preview}
                                />

                                <textarea
                                    rows={3}
                                    value={descricao}
                                    placeholder="Escreve uma legenda..."
                                    onChange={escreverDescricao}
                                />


                            </div>
                            <hr className="divisoria" />
                        </>
                    )
                }
            </div>
        </div>
    );
}


export default comAutorizacao(Publicacao);