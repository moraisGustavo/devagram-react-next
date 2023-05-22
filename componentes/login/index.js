import { useState } from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import InputPublico from "../inputPublico";
import Botao from "../botao";
import { validarEmail, validarSenha } from '../../utils/validadores'
import UsuarioService from "../../services/UsuarioService";

//Imagens Importadas
import iconeEnvelope from "../../public/imagens/envelope.svg";
import iconeKey from "../../public/imagens/key.svg";
import imagemLogo from "../../public/imagens/logo-principal.svg";


const usuarioService = new UsuarioService();

export default function Login( {aposAutenticacao}) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [estaSubmetendo, setEstaSubmetendo]= useState(false);


    const validarFormulario = () => {
        return (
            validarEmail(email)
            && validarSenha(senha)
        );
    }


    
    const aoSubmeter = async (e) => {
        e.preventDefault();
        if (!validarFormulario()){
            return;
        }
        setEstaSubmetendo(true);
        try {
            await usuarioService.login({
                login:email,
                senha
            });
            
            if (aposAutenticacao) {
                aposAutenticacao();
            }

        } catch (error) {
            alert(
                "Erro ao realizar login. " + error?.response?.data?.erro
            );
        }
        setEstaSubmetendo(false);
    }

 
    return (
        <section className={`paginaLogin paginaPublica`}>
            <div className="logoContainer">
                <Image
                    src={imagemLogo}
                    alt="Logotipo"
                    layout="fill"
                    className="logo"
                />
            </div>

            <div className="conteudoPaginaPublica">
                <form onSubmit={aoSubmeter}>
                    <InputPublico
                        imagem={iconeEnvelope}
                        placeholder="E-mail"
                        tipo="email"
                        aoAlterarValor={e => setEmail(e.target.value)}
                        valor={email}
                        mensagemValidacao="O endereço informado é invalido"
                        exibirMensagemValidacao={email && !validarEmail(email)}
                    />

                    <InputPublico
                        imagem={iconeKey}
                        placeholder="Senha"
                        tipo="password"
                        aoAlterarValor={(e => setSenha(e.target.value))}
                        valor={senha}
                        mensagemValidacao="Precisa ter pelo menos 3 caracteres"
                        exibirMensagemValidacao={senha && !validarSenha(senha)}
                    />

                    <Botao
                        texto="Login"
                        tipo="submit"
                        desabilitado={!validarFormulario() || estaSubmetendo}
                    />
                </form>
                

                <div className="rodapePaginaPublica">
                    <p>Não Possui uma conta?</p>
                    <Link href="/cadastro">Faça seu cadastro agora!</Link>
                </div>

            </div>
        </section>
    );
}