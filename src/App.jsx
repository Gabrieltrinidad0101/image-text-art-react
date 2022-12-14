import { useEffect, useRef, useState } from 'react'
import ImageCanvas from './canvas/imageCanvas';
import DrawCanvas from './canvas/drawCanvas';
import functionWait from './functionWait';
import "./app.css"
const imageCanvas = new ImageCanvas();
const drawCanvas = new DrawCanvas();
export default function App() {
    const refImageCanvas = useRef();
    const refTextArt = useRef();
    const refDrawCanvas = useRef();
    const [textArtHtml, setTextArtHtml] = useState("");
    const [letterCss, setLetterCss] = useState({ fontSize: 10});

    useEffect(_ => { 
        imageCanvas.set = refImageCanvas.current;
        drawCanvas.set = refDrawCanvas.current;
    }, [])

    const selectImage = async e => {
        const reader = new FileReader();
        const srcImage = new Image();
        reader.readAsDataURL(e.target.files[0])
        await functionWait(reader, "onload")
        srcImage.src = reader.result;
        await functionWait(srcImage, "onload");
        imageCanvas.setImage(srcImage)
        imageCanvas.insertImage(refDrawCanvas.current)
    }
    
    const convert = _ => {
        const textArt = imageCanvas.convertToText();
        const heigth = textArt.split("\n").length;
        const width = textArt.split("\n")[0].length;
        const lineHeight = (refTextArt.current.clientHeight / heigth);
        const lineWidth = ((refTextArt.current.clientWidth) / width);
        const fontSize = lineHeight > lineWidth ? lineWidth : lineHeight;
        setLetterCss(prev => ({
            ...prev,
            fontSize: fontSize,
            letterSpacing: 0, lineHeight,
            lineaLengthWidth: width
        }));
        setTextArtHtml(textArt);
    }

    useEffect(_ => {
        const textArtWidth = document.querySelector("pre").getBoundingClientRect().width;
        const canvasWidth = refImageCanvas.current.clientWidth;
        const diff = Math.abs(Math.floor(textArtWidth) - Math.floor(canvasWidth));
        if (diff <= 1 && diff >= 0) return;
        const letterSpacing = (canvasWidth
            - textArtWidth) /
            letterCss.lineaLengthWidth
        setLetterCss(prev => ({ ...prev, letterSpacing }))
    }, [letterCss.letterSpacing])


    const styles = {
        fontSize: `${letterCss.fontSize}px`,
        lineHeight: `${letterCss.lineHeight}px`,
        letterSpacing: `${letterCss.letterSpacing}px`,
    }

    return (
        <>
            <div className='app'>
                <div className='menu-container'>
                    <div className='menu'>
                        <div className="file-upload-container">
                            <div className="file-upload-label button-style">Upload Image</div>
                            <input className="file-upload" type="file" onChange={selectImage} />
                        </div>
                        <button className="convert button-style button-79" onClick={convert} role="button">convert</button>
                        <button className='draw button-style' onClick={convert}>Draw</button>
                    </div>
                </div>
                <div className='image-container'>
                    <div className='image'>
                        <div>
                            <h2 className='title-text'>
                                Image
                            </h2>
                        </div>
                        <div className='container-canvas'>
                            <canvas className='image-canvas' ref={refImageCanvas}></canvas>
                            <canvas className='draw-canvas' ref={refDrawCanvas}></canvas>
                        </div>
                    </div>
                </div>
                <div className='text-art-container'>
                    <div className='text-art'>
                        <div>
                            <h2 className='title-text'>
                                Text Art
                            </h2>
                        </div>
                        <div className='text' ref={refTextArt}>
                            <pre
                                style={styles}
                                dangerouslySetInnerHTML={{ __html: textArtHtml }}></pre>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

