import Image from "next/legacy/image";
import Link from "next/link";
import InputPublico from "../../componentes/inputPublico/index";
import Botao from "../../componentes/botao";
import { useState } from "react";
import { useRouter } from "next/router";
import { validarNome, validarSenha, validarConfirmarSenha, validarEmail} from '../../utils/validadores'
import UsuarioService from '../../services/UsuarioService'

//Imagens Importadas
import imagemLogo from "../../public/imagens/logo.svg";
import iconeUserAtivo from "../../public/imagens/userAtivo.svg";
import iconeEnvelope from "../../public/imagens/envelope.svg";
import iconeKey from "../../public/imagens/key.svg";
import imagemAvatar from "../../public/imagens/avatar.svg";
import { UploadImagem } from "../../componentes/uploadImagem";


const usuarioService = new UsuarioService();

export default function Cadastro(){
    const [avatar, setAvatar] = useState(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setconfirmarSenha] = useState("");
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);
    const router =useRouter();

    const validarFormulario = () => {
        return (
            validarNome(nome)
            && validarEmail(email)
            && validarSenha(senha)
            && validarConfirmarSenha(senha, confirmarSenha)
        );
    }

    const aoSubmeter = async (e) => {
        e.preventDefault(); // Previne a atualizacao da pagina do Submit (padaro do html)
        if(!validarFormulario()){
            return;
        } // Validacao do formulario

        setEstaSubmetendo(true); // Seta o botao para evitar do usuario dar vario clics

        try {
            const corpoRequisicaocadastro = new FormData(); // Com o FormData tem possibilidade enviar arquivo na requisicao
            corpoRequisicaocadastro.append("nome", nome);
            corpoRequisicaocadastro.append("email", email);
            corpoRequisicaocadastro.append("senha", senha);

            if (avatar?.arquivo) {
            corpoRequisicaocadastro.append("file", avatar.arquivo);
            }
            await usuarioService.cadastro(corpoRequisicaocadastro);
            await usuarioService.login({
                login: email,
                senha
            });

            router.push('/');
        } catch (error) {
            alert(
                "Erro ao cadastrar usuario. " + error?.response?.data?.erro
            );
        }
        setEstaSubmetendo(false);
    }


    return (
        <section className={`paginaCadastro paginaPublica`}>
            <div className="logoContainer desktop">
                <Image
                    src={imagemLogo}
                    alt="Logotipo"
                    layout="fill"
                    className="logo"
                />
            </div>

            <div className="conteudoPaginaPublica">
                <form onSubmit={aoSubmeter}>
                    <UploadImagem // Avatar
                        imagemPreviewClassName="avatar avatarPreview"
                        imagemPreview={avatar?.preview || imagemAvatar.src}
                        setImagem={setAvatar}
                    />

                    <InputPublico // Nome Completo
                        imagem={iconeUserAtivo}
                        placeholder="Nome Completo"
                        tipo="text"
                        aoAlterarValor={e => setNome(e.target.value)}
                        valor={nome}
                        mensagemValidacao="O nome precisa de pelo menos 2 caracteres"
                        exibirMensagemValidacao={ nome && !validarNome(nome)}
                    />
                    
                    <InputPublico // Email
                        imagem={iconeEnvelope}
                        placeholder="E-mail"
                        tipo="email"
                        aoAlterarValor={e => setEmail(e.target.value)}
                        valor={email}
                        mensagemValidacao="O endereço informa é invalido"
                        exibirMensagemValidacao={email && !validarEmail(email)}
                    />

                    <InputPublico // Senha
                        imagem={iconeKey}
                        placeholder="Senha"
                        tipo="password"
                        aoAlterarValor={(e => setSenha(e.target.value))}
                        valor={senha}
                        mensagemValidacao="Precisa ter pelo menos 3 caracteres"
                        exibirMensagemValidacao={senha && !validarSenha(senha)}
                    />

                    <InputPublico // Confirmar Senha
                        imagem={iconeKey}
                        placeholder="Confirmar Senha"
                        tipo="password"
                        aoAlterarValor={(e => setconfirmarSenha(e.target.value))}
                        valor={confirmarSenha}
                        mensagemValidacao="As senhas precisam ser iguais"
                        exibirMensagemValidacao={confirmarSenha && !validarConfirmarSenha(senha, confirmarSenha)}
                    />

                    <Botao
                        texto="Cadastrar"
                        tipo="submit"
                        desabilitado={!validarFormulario() || estaSubmetendo}
                    />
                </form>


                <div className="rodapePaginaPublica">
                    <p>Já possui uma conta?</p>
                    <Link href="/">Faça seu login agora!</Link>
                </div>
                
            </div>
        </section>    
    );
}