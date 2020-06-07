import React, {useState, useEffect, useRef} from 'react'
import Input from '../Common/Input'
import Canvas from '../Canvas'

const Upload = () => {

    const [file, setFile] = useState()
    const [fileName, setFileName] = useState()
    const [croppedImg, setCroppedImg] = useState();
    const [croppedImgUrl, setCroppedImgUrl] = useState();
    const [alt, setAlt] = useState()
    const [title, setTitle] = useState()
    const [fileUrl, setFileUrl] = useState()
    const imageUploadRef = useRef()

    const handleImageChange = event => {
        setFile(event.target.files[0])
    }

    const handleClearImage = () => {
        setFile()
        setFileUrl()
        setCroppedImgUrl(undefined)
        if(imageUploadRef.current){
            imageUploadRef.current.value = null
        }
    }

    const handleCroppedImage = blob => {
        setCroppedImg(blob)
        const croppedUrl = blobToImage(blob);
        setCroppedImgUrl(croppedUrl);
        console.log(croppedUrl);
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log({
            file : croppedImg || file, 
            fileName, 
            alt, 
            title
        })
    }

    const blobToImage = blob => {
        if(blob){
            const objectUrl = URL.createObjectURL(blob);
            return objectUrl
        }
    }


    useEffect(() => {
        if(file){
            const objectUrl = blobToImage(file)
            setFileUrl(objectUrl)
            setFileName(file.name)
            // console.log(file)
        }
    }, [file])

    return (
        <>
            <div style={{display : 'flex',justifyContent : 'center'}}>
            <form onSubmit={handleSubmit}>
                <Input type="file" onChange={handleImageChange} ref={imageUploadRef}/>
                <Input type="submit" />
                {
                    fileUrl ? <button onClick={handleClearImage}>Clear Image</button> : <></>
                }
            </form>
            </div>
            <div style={{marginTop : 25}}>
                {
                    fileUrl ? <>
                        <h1>{fileName}</h1>
                        {/* <img src={fileUrl} width={750} /> */}
                        <Canvas image={croppedImgUrl || fileUrl} getCroppedImageBlob={handleCroppedImage} />
                    </> : <></>
                }
            </div>
            {
                fileUrl ? <div style={{marginTop : 25, marginBottom : 25}}>
                    <Input 
                        onChange = {e => {
                            setFileName(e.target.value)
                        }} 
                        placeholder="Filename" 
                        value={fileName} 
                    />
                    <Input 
                        onChange = {e => setAlt(e.target.value)} 
                        placeholder="Alt for image" 
                        value={alt} 
                    />
                    <Input 
                        onChange= {e => setTitle(e.target.value)} 
                        placeholder="Title" 
                        value={title} 
                    />
                </div> : <></>
            }
            <div>
                {
                    croppedImgUrl && <img src={croppedImgUrl} />
                }
            </div>
        </>
    )
}

export default Upload