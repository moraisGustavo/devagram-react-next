import HttpServices from "./HttpServices";

export default class FeedServices extends HttpServices {
    async carregarPostagens(idUsuario) {
        let url = '/feed';
        if (idUsuario) {
            url += `?id=${idUsuario}`;
        }
        
        return this.get('/feed');
    }
}