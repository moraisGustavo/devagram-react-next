import Image from "next/legacy/image";
import Link from "next/link";
import InputPublico from "../../componentes/inputPublico/index";
import Botao from "../../componentes/botao";
import { useState } from "react";

//Imagens Importadas
import imagemLogo from "../../public/imagens/logo.svg";
import iconeUserAtivo from "../../public/imagens/userAtivo.svg";
import iconeEnvelope from "../../public/imagens/envelope.svg";
import iconeKey from "../../public/imagens/key.svg";
import imagemAvatar from "../../public/imagens/avatar.svg";
import { UploadImagem } from "../../componentes/uploadImagem";


export default function Cadastro(){
    const [avatar, setAvatar] = useState(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setconfirmarSenha] = useState("");

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
                <form>
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
                    />
                    
                    <InputPublico // Email
                        imagem={iconeEnvelope}
                        placeholder="E-mail"
                        tipo="email"
                        aoAlterarValor={e => setEmail(e.target.value)}
                        valor={email}
                    />

                    <InputPublico // Senha
                        imagem={iconeKey}
                        placeholder="Senha"
                        tipo="password"
                        aoAlterarValor={(e => setSenha(e.target.value))}
                        valor={senha}
                    />

                    <InputPublico // Confirmar Senha
                        imagem={iconeKey}
                        placeholder="Confirmar Senha"
                        tipo="password"
                        aoAlterarValor={(e => setconfirmarSenha(e.target.value))}
                        valor={confirmarSenha}
                    />

                    <Botao
                        texto="Cadastrar"
                        tipo="submit"
                        desabilitado={false}
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