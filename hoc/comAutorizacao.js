import { Router, useRouter } from "next/router"
import UsuarioService from "../services/UsuarioService"
import Header from "../componentes/layout/Header";
import Footer from "../componentes/layout/Footer";

const usuarioService = new UsuarioService

export default function comAutorizacao(Componente) {
    return (props) => {
        const router = useRouter(); // Objeto de Manipulçao da rota

        if (typeof window !== 'undefined') { // Verifica se ja esta no browser
            if (!usuarioService.estaAtuenticado()) { // Verifica se ja autenticado
                router.replace('/');    // Caso nao esteja autenticado , retorna para a raiz
                return null;
            }

            const usuarioLogado = usuarioService.obterInformaçoesDoUsuarioLogado();

            return (
                <>
                    <Header usuarioLogado = {usuarioLogado} />
                    <Componente usuarioLogado = {usuarioLogado} {...props} />
                    <Footer usuarioLogado = {usuarioLogado} />
                </>
            );
        }
        return null;
    }
}