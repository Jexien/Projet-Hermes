import React, { useRef, useState } from 'react'

export default function Editor(){
  const canvasRef = useRef(null)
  const [imgSrc, setImgSrc] = useState(null)

  function onFile(e){
    const f = e.target.files && e.target.files[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => {
      setImgSrc(reader.result)
      drawToCanvas(reader.result)
    }
    reader.readAsDataURL(f)
  }

  function drawToCanvas(dataUrl){
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.clearRect(0,0,canvas.width,canvas.height)
      ctx.drawImage(img,0,0)
    }
    img.src = dataUrl
  }

  return (
    <div className="editor-root">
      <div className="toolbar">
        <input type="file" accept="image/*" onChange={onFile} />
      </div>
      <div className="canvas-wrap">
        <canvas ref={canvasRef} style={{border:'1px solid #ccc',maxWidth:'100%'}} />
      </div>
    </div>
  )
}
