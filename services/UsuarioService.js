import DevagramApiServices from "./DevagramApiServices";
import imagemAvatar from "../public/imagens/avatar.svg";


export default class UsuarioService extends DevagramApiServices {
    // LOGIN
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

    // lOGOUT
    async logout() {
        localStorage.removeItem("nome");
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("avatar");
    }

    async cadastro(dados) {
        return this.post('/cadastro', dados);        
    }

    async atualizarPerfil(dados){
        return this.put('/usuario', dados);
    }

    estaAtuenticado() {
        return localStorage.getItem('token') !== null;
    }

    // PESQUISAR
    async pesquisar(termoDaPesquisa){
        return this.get('/pesquisa?filtro=' + termoDaPesquisa);
    }
    
    async obterPerfil(idUsuario) {
        return this.get(`/pesquisa?id=${idUsuario}`); 
    }

    async alternarSeguir (idUsuario) {
        return this.put(`/seguir?id=${idUsuario}`);
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