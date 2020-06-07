import React, { useEffect, useRef, useState } from 'react'
// import image from '../../assests/image/image.png'

const Canvas = ({image, getCroppedImageBlob}) => {

    const [startDraw, setStartDraw] = useState(false)
    const [croppedImg, setCroppedImg] = useState(undefined)
    const myCanvas = useRef();
    const [ctx, setCtx] = useState()
    const [canvasHeight, setCanvasHeight] = useState(750)
    const [canvasWidth, setCanvasWidth] = useState(750)
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [sx, setSx] = useState(50)
    const [sy, setSy] = useState(50)
    const [crop, setCrop] = useState(false);

    useEffect(() => {
        const context = myCanvas.current.getContext('2d')
        setCtx(context)
    }, [myCanvas])

    useEffect(() => { 
        myCanvas.current.style.background = `url('${image}')`
        myCanvas.current.style.backgroundRepeat = 'no-repeat'
        myCanvas.current.style.backgroundSize = 'cover'
        setCrop(false);
    }, [image])

    useEffect(() => {
        if(ctx){
            ctx.clearRect(0,0,canvasWidth, canvasHeight)
            ctx.borderStyle = '1px solid blue'
            ctx.beginPath()
            ctx.rect(x,y,sx,sy)
            ctx.stroke()
        }
    }, [x, y, sx, sy])

    useEffect(() => {
        if(ctx){
            if(image && sx && sy){
                const img = new Image()
                img.onload = function(e){
                    e.preventDefault()
                    // ctx.clearRect(0,0,canvasWidth, canvasHeight)
                    setCanvasWidth(sx)
                    setCanvasHeight(sy)
                    myCanvas.current.setAttribute('style', null)
                    ctx.drawImage(img,x,y,sx,sy,0,0,sx,sy)
                    myCanvas.current.toBlob(blob => {getCroppedImageBlob(blob)}, 'image/jpeg',0.82)
                }
                img.src = image
            }
        }
    }, [crop])

    const handleMouseDown = e => {
        e.preventDefault()
        const rect = e.target.getBoundingClientRect();
        const x0 = e.clientX - rect.left; //x position within the element.
        const y0 = e.clientY - rect.top;
        setX(x0)
        setY(y0)
        setStartDraw(true)
    }

    const handleMouseUp = e => {
        e.preventDefault()
        setStartDraw(false)
        setCrop(true)
        console.log({x,y,sx,sy})
    }

    const handleMouseMove = e => {
        e.preventDefault()
        if(startDraw){
            const rect = e.target.getBoundingClientRect();
            const x1 = e.clientX - rect.left;
            const y2 = e.clientY - rect.top;
            const length = x1 - x
            const height = y2 - y
            setSx(length)
            setSy(height);
        }
    }


    return (
        <>
        <canvas 
            ref={myCanvas} 
            id="myCanvas" 
            width={canvasWidth} 
            height={canvasHeight} 
            onMouseDown={handleMouseDown} 
            onMouseUp={handleMouseUp} 
            onMouseMove={handleMouseMove}
            style={{background : `url('${image}')`, backgroundRepeat : 'no-repeat', backgroundSize:'cover'}}
        >

        </canvas>
        </>
    )
}

export default Canvas