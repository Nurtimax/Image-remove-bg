import {FC} from "react"

interface IImageDisplayProps {
   images: File[] | null
   resultImage: string[] | null
}

const ImageDisplay: FC<IImageDisplayProps> = ({images, resultImage}) => {
   return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2  my-4 gap-2 ">
         {images?.map(image => (
            <>
               {image ? (
                  <img
                     className="rounded-lg"
                     src={
                        typeof image === "string"
                           ? image
                           : URL.createObjectURL(image)
                     }
                     alt="Preview"
                  />
               ) : null}
            </>
         ))}
         {resultImage &&
            resultImage.map(rImage => (
               <img className="rounded-lg" src={rImage} alt="" />
            ))}
      </div>
   )
}

export default ImageDisplay
