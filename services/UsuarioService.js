import HttpService from "./HttpServices";
import imagemAvatar from "../public/imagens/avatar.svg";


export default class UsuarioService extends HttpService {
    async login(credenciais){
        const {data} = await this.post('/login', credenciais);
        
        localStorage.setItem("nome", data.nome);
        localStorage.setItem("email", data.email);
        localStorage.setItem("token", data.token);

        const usuario = await this.get('/usuario');
        localStorage.setItem('id', usuario.data._id);

        if(usuario.data.avatar) {
            localStorage.setItem("avatar", usuario.data.avatar);
        }
    }
    async cadastro(dados) {
        return this.post('/cadastro', dados);        
    }

    estaAtuenticado() {
        return localStorage.getItem('token') !== null;
    }

    // PESQUISAR
    async pesquisar(termoDaPesquisa){
        return this.get('/pesquisa?filtro=' + termoDaPesquisa);
    }

    obterInformaçoesDoUsuarioLogado() {
        return {
            id: localStorage.getItem('id'),
            nome: localStorage.getItem('nome'),
            email: localStorage.getItem('email'),
            avatar: localStorage.getItem('avatar')
        }
    }
}