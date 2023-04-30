import { useEffect, useRef } from "react";

export function UploadImagem ({
    className ='',
    setImagem,
    imagemPreview,
    imagemPreviewClassName ='',
    aoSetarAreferencia
}) {
    const refereciaInput = useRef(null);
    useEffect(() => {
        if(!aoSetarAreferencia){
            return;
        }
        aoSetarAreferencia(refereciaInput?.current);
    }, [refereciaInput?.current]);


    const abrirSeletorArquivos =() => {
        refereciaInput?.current?.click();
    }


    const aoAlterarImagem = () => {
        if(!refereciaInput?.current?.files?.length){
            return;
        }

         
        const arquivo = refereciaInput?.current?.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(arquivo);
        fileReader.onloadend = () => {
            setImagem({
                preview: fileReader.result,
                arquivo
            });
        }
    }


    return (
        <div className={`uploadImagemContainer ${className}`} onClick={abrirSeletorArquivos}>
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