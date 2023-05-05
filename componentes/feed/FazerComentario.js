import Avatar from "../avatar";

export function FazerComentario({usuarioLogado}) {
    return ( 
        <div className="containerFazerComentario">
            <Avatar src={usuarioLogado.avatar} />
            <textarea placeholder="Adicione um comentario..." rows={1}>
            </textarea>
        </div>
        )
}