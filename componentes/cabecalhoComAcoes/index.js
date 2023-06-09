import Image from "next/legacy/image";

export default function CabecalhoComAcoes({
    className,
    iconeSetaEsquerda,
    textoEsquerda = null,
    aoClicarAcaoEsquerda,
    titulo,
    elementoDireita,
    aoClicarElementoDireita
}){
    return (
        <div className={`cabecalhoComAcoes ${className}`}>
            {iconeSetaEsquerda ? (
                <Image 
                    src={iconeSetaEsquerda}
                    alt="Icone Voltar"
                    onClick={aoClicarAcaoEsquerda}
                    width={25}
                    height={25}
                />
            ) : (
              textoEsquerda !== null && (
                <span className="textoEsquerda" onClick={aoClicarAcaoEsquerda}>
                    {textoEsquerda}
                </span>
              )
            )}

            <h3>{titulo}</h3>

            {elementoDireita && (
            <button 
                type="button"
                className="btnAcaoDireita"
                onClick={aoClicarElementoDireita}
            >
                {elementoDireita}
            </button>
            )}
        </div>
    )
}