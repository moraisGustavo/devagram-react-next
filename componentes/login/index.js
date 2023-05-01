import InputPublico from "../inputPublico";
import Image from "next/legacy/image";
import Link from "next/link";
import { useState } from "react";

import iconeEnvelope from "../../public/imagens/envelope.svg";
import iconeKey from "../../public/imagens/key.svg";
import imagemLogo from "../../public/imagens/logo.svg";
import Botao from "../botao";


export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    
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
                <form>
                    <InputPublico
                        imagem={iconeEnvelope}
                        placeholder="E-mail"
                        tipo="email"
                        aoAlterarValor={e => setEmail(e.target.value)}
                        valor={email}
                        />

                    <InputPublico
                        imagem={iconeKey}
                        placeholder="Senha"
                        tipo="password"
                        aoAlterarValor={(e => setSenha(e.target.value))}
                        valor={senha}
                    />

                    <Botao
                        texto="Login"
                        tipo="submit"
                        desabilitado={false}
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