import {useState} from "react"
import UploaderImage from "./UploaderImage"
import DisplayImage from "./DisplayImage"
import ImageBackgroundRemover from "./ImageBackgroundRemover"

const Image = () => {
   const [image, setImage] = useState<string | Blob>("")
   const [resultImage, setResultImage] = useState<null | string>(null)

   const handleClearImages = () => {
      setImage("")
      setResultImage(null)
   }

   return (
      <div className="App">
         <h1>Сервис удаления фона</h1>
         <UploaderImage onImageUpload={file => setImage(file)} />
         <DisplayImage image={image} resultImage={resultImage} />
         <ImageBackgroundRemover
            image={image}
            setResultImage={setResultImage}
            handleClearImages={handleClearImages}
            resultImage={resultImage}
         />
      </div>
   )
}

export default Image
