import { useEffect, useRef, useState } from 'react'
import ImageCanvas from './canvas/imageCanvas';
import DrawCanvas from './canvas/drawCanvas';
import functionWait from './functionWait';
import useDebounce from './customHooks/useDebounce/useDebounce';
import "./app.css"
const imageCanvas = new ImageCanvas();
const drawCanvas = new DrawCanvas();
export default function App() {
    const refImageCanvas = useRef();
    const refTextArt = useRef();
    const refDrawCanvas = useRef();
    const [textArtHtml, setTextArtHtml] = useState("");
    const [resolution, setResolution] = useState(15);
    const [letterCss, setLetterCss] = useState({ fontSize: 10 });

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
        drawCanvas.clear();
        imageCanvas.setImage(srcImage)
    }

    const convert = _ => {
        imageCanvas.insertImage(refDrawCanvas.current)
        const textArt = imageCanvas.convertToText(parseInt(resolution));
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


    useDebounce(()=> convert(), 1000, [resolution])

    const ChangeResolution = async value =>{
        setResolution(value)
    }

    useEffect(_ => {
        const textArtWidth = document.querySelector("pre").getBoundingClientRect().width;
        const canvasWidth = refImageCanvas.current.clientWidth;
        const diff = Math.abs(Math.floor(textArtWidth) - Math.floor(canvasWidth));
        if (diff <= 1 && diff >= 0) return;
        const letterSpacing = (canvasWidth- textArtWidth) / letterCss.lineaLengthWidth
        setLetterCss(prev => ({ ...prev, letterSpacing }))
    }, [textArtHtml])


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
                        <div>
                            Resolution {16 - resolution}px
                            <input type="range" max="15" min="1" value={resolution} onChange={e=>ChangeResolution(e.target.value)}/>
                        </div>
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
                            <canvas width="100px" height="100px" className='image-canvas' ref={refImageCanvas}></canvas>
                            <canvas width={`${refImageCanvas.current?.clientWidth}px`}
                                height={`${refImageCanvas.current?.clientHeight}px`}
                                className='draw-canvas'
                                ref={refDrawCanvas}
                            ></canvas>
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

