import { useEffect, useRef, useState } from 'react'
import Canvas from './canvas';
import functionWait from './functionWait';
import "./app.css"
const canvas = new Canvas();
export default function App() {
    const refCanvas = useRef();
    const [textArtHtml, setTextArtHtml] = useState("");
    const [letterCss, setLetterCss] = useState({fontSize: 10, spaceLetter: 0});
    useEffect(_ => { canvas.set = refCanvas.current }, [])

    const selectImage = async e => {
        const reader = new FileReader();
        const srcImage = new Image();
        reader.readAsDataURL(e.target.files[0])
        await functionWait(reader, "onload")
        srcImage.src = reader.result;
        await functionWait(srcImage, "onload");
        canvas.setImage(srcImage)
    }

    const convert = _ => {
        const textArt = canvas.convertToText();
        const heigth = textArt.split("\n").length;
        const fontSize = ((window.innerHeight / 2) / heigth);
        setLetterCss(prev =>({...prev,fontSize}));
        setTextArtHtml(textArt);
    }

    return (
        <div className='app'>
            <div className='tools'>
                <canvas ref={refCanvas}></canvas>
                <div className='buttons' >
                    <div className="button-wrap">
                        <div className="button-style button-79 background-green">Upload Image</div>
                        <input id="upload" type="file" onChange={selectImage} />
                    </div>
                    <button className="convert button-style button-79" onClick={convert} role="button">convert</button>
                    <button className='draw button-style' onClick={convert}>Draw</button>
                </div>
            </div>
            <div className='container-text-art'>
                <div>
                    <pre className='text-art' style={{fontSize: `${letterCss.fontSize}px`, lineHeight: `${letterCss.fontSize}px`}} dangerouslySetInnerHTML={{__html: textArtHtml }}></pre>
                </div>
            </div>
        </div>
    )
}
