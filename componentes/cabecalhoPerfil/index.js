import CabecalhoComAcoes from "../cabecalhoComAcoes";
import iconeSetaEsquerda from "../../public/imagens/setaEsquerda.svg"
import Avatar from "../avatar";
import Botao from "../botao";

export default function CabecalhoPerfil({
    usuario
}) {
    return (
        <div className="cabecalhoPerfil larguraDesktop ">
            <CabecalhoComAcoes
                iconeSetaEsquerda={iconeSetaEsquerda}
                titulo={usuario.nome}
            />

            <hr  className="bordaCabecalhoPerfil"/>

            <div className="statusPerfil">
                <Avatar src={usuario.avatar} />
                <div className="informacoesPerfil">
                    <div className="statusContainer">
                        <div className="status">
                            <strong>{usuario.publicacoes}</strong>
                            <span>Publicações</span>
                        </div>

                        <div className="status">
                            <strong>{usuario.seguidores} </strong>
                            <span>Seguidores</span>
                        </div>

                        <div className="status">
                            <strong>{usuario.seguindo} </strong>
                            <span>Seguindo</span>
                        </div>
                    </div>

                    <Botao  
                        texto={'Seguir'}
                        cor='primaria'
                    />
                </div>
            </div>
        </div>
    )
}