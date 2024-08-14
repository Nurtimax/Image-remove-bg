import {useState} from "react"
import "./App.css"
import BackgroundRemover from "./components/BackgroundRemover"
import ImageUploader from "./components/ImageUploader"
import ImageDisplay from "./components/ImageDisplay"

function App() {
   const [image, setImage] = useState<null | File[]>(null)
   const [resultImage, setResultImage] = useState<null | string[]>(null)

   return (
      <div className="App">
         <h1>Сервис удаления фона</h1>
         <ImageUploader onImageUpload={file => setImage(file)} />
         <ImageDisplay images={image} resultImage={resultImage} />
         <BackgroundRemover images={image} setResultImage={setResultImage} />
      </div>
   )
}

export default App
