import Head from 'next/head'
import Image from 'next/image'
import { UploadImagem } from '../componentes/uploadImagem'
import { useRef, useState } from 'react'
import Botao from '../componentes/botao';
import Avatar from '../componentes/avatar';


export default function Home() {
  const [imagem, setImagem] = useState(null);
  const refereciaInput = useRef(null);

  console.log(imagem);

  return (
    <>
      <h1>Hello World!</h1>
      <button onClick={() => refereciaInput?.current?.click()}> abrir seletor de arquivos</button>

      <UploadImagem 
        setImagem={setImagem} 
        imagemPreview={imagem?.preview} 
        aoSetarAreferencia={(ref) => refereciaInput.current = ref}
      />
      <Avatar />
      <Botao 
        texto={'Login'} 
        manipularClick={() => 
          console.log('Botao Clicado')}
          cor='primaria'
      />
    </>
  )
}
