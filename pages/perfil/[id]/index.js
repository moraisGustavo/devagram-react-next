import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import  Feed  from "../../../componentes/feed";
import comAutorizacao from "../../../hoc/comAutorizacao";
import CabecalhoPerfil from "../../../componentes/cabecalhoPerfil";

//IMPORTAÇAO IMAGENS

function Perfil({ usuarioLogado }) {
    const [usuario, setUsuario] = useState({});
    const router = useRouter();

    useEffect(() => {
        const async = setUsuario({
            nome:'Gustavo Morais'
        })
    }, [router.query.id]);
    
    return (
        <div className="paginaPerfil">
            <CabecalhoPerfil 
                usuarioLogado={usuarioLogado}
                usuario={usuario}
            />
            <Feed usuarioLogado={usuarioLogado}/>
        </div>
    );
}

export default comAutorizacao(Perfil);