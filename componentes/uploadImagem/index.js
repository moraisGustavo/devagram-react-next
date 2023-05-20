import { useEffect, useRef } from "react";

export function UploadImagem({
    className = '',
    setImagem,
    imagemPreview,
    imagemPreviewClassName = '',
    aoSetarAreferencia
}) {
    const refereciaInput = useRef(null);

    useEffect(() => {
        if (!aoSetarAreferencia) {
            return;
        }

        aoSetarAreferencia(refereciaInput?.current);
    }, [refereciaInput?.current]);


    const abrirSeletorArquivos = () => {
        refereciaInput?.current?.click();
    }


    const aoAlterarImagem = async () => {
        if (!refereciaInput?.current?.files?.length) {
            return;
        }


        const arquivo = refereciaInput?.current?.files[0];
        obterUrlImagemEAtualizarEstado(arquivo);
    }

    const obterUrlImagemEAtualizarEstado = (arquivo) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(arquivo);
        fileReader.onloadend = () => {
            setImagem({
                preview: fileReader.result,
                arquivo
            });
        }
    }

    const aoSoltarImagem = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const arquivo = e.dataTransfer.files[0];
            obterUrlImagemEAtualizarEstado(arquivo);
        }
    }

    return (
        <div
            className={`uploadImagemContainer ${className}`}
            onClick={abrirSeletorArquivos}
            onDragOver={e => e.preventDefault()}
            onDrop={aoSoltarImagem}
        >
            {imagemPreview && (
                <div className="imagemPreviewContainer">
                    <img
                        src={imagemPreview}
                        alt='Imagem Preview'
                        className={imagemPreviewClassName}
                    />

                </div>
            )}
            <input
                type='file'
                className='oculto'
                accept="image/*"
                ref={refereciaInput}
                onChange={aoAlterarImagem}
            />
        </div>
    );
}