import React, {useState, useEffect, useRef} from 'react'

const Upload = () => {

    const [file, setFile] = useState()
    const [fileName, setFileName] = useState()
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
        imageUploadRef.current.value = null
    }


    useEffect(() => {
        if(file){
            const objectUrl = URL.createObjectURL(file)
            setFileUrl(objectUrl)
            setFileName(file.name)
            console.log(file.name)
        }
    }, [file])

    return (
        <>
            <div style={{display : 'flex',justifyContent : 'center'}}>
            <form>
                <input type="file" onChange={handleImageChange} ref={imageUploadRef}/>
                <input type="submit" />
                {
                    fileUrl ? <button onClick={handleClearImage}>Clear Image</button> : <></>
                }
            </form>
            </div>
            <div style={{marginTop : 25}}>
                {
                    fileUrl ? <>
                        <h1>{fileName}</h1>
                        <img src={fileUrl} width={750} />
                    </> : <></>
                }
            </div>
            {
                fileUrl ? <div>
                    <input 
                        onChange = {e => {
                            setFileName(e.target.value)
                            // imageUploadRef.current.value = e.target.value
                            }} 
                        placeholder="Filename" 
                        value={fileName} 
                    />
                    <input 
                        onChange = {e => setAlt(e.target.value)} 
                        placeholder="Alt for image" 
                        value={alt} 
                    />
                    <input 
                        onChange= {e => setTitle(e.target.value)} 
                        placeholder="Title" 
                        value={title} 
                    />
                </div> : <></>
            }
        </>
    )
}

export default Upload