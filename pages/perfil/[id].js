import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Feed from "../../componentes/feed";
import comAutorizacao from "../../hoc/comAutorizacao";
import CabecalhoPerfil from "../../componentes/cabecalhoPerfil";
import UsuarioService from "../../services/UsuarioService";

const usuarioService = new UsuarioService();

export function Perfil({ usuarioLogado }) {
  const [usuario, setUsuario] = useState({});
  const router = useRouter();


  const obterPerfil = async (idUsuario) => {
    try {
      const { data } = await usuarioService.obterPerfil(
        estaNoPerfilPessoal()
          ? usuarioLogado.id
          : idUsuario
      );
      return data;
    } catch (error) {
      alert(`Erro ao obter perfil do usuario.`);
    }
  }

  const estaNoPerfilPessoal = () => {
    return router.query.id === 'eu';
  }

  // useEffect(async () => {
  //     if(!router.query.id){
  //         return;
  //     }

  //     const dadosPerfil = await obterPerfil(router.query.idUsuario);
  //     setUsuario({
  //         nome: 'Gustavo Morais'
  //     });
  // },[router.query.id]);

  useEffect(() => {
    const carregarPerfil = async () => {
      if (!router.query.id) {
        return;
      }

      const dadosPerfil = await obterPerfil(router.query.id);
      setUsuario(dadosPerfil);
    };

    carregarPerfil();
  }, [router.query.id]);




  return (
    <div className="paginaPerfil">
      <CabecalhoPerfil
        usuarioLogado={usuarioLogado}
        usuario={usuario}
        estaNoPerfilPessoal={estaNoPerfilPessoal()}
      />
      
      <Feed
        usuarioLogado={usuarioLogado}
        usuarioPerfil={usuario}
      />
    </div>
  );
}

export default comAutorizacao(Perfil);