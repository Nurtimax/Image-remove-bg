import {FC} from "react"

interface IImageDisplayProps {
   image: Blob | string | null
   resultImage: string | null
}

const DisplayImage: FC<IImageDisplayProps> = ({image, resultImage}) => {
   return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2  my-4 gap-2 ">
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
         {resultImage && (
            <img className="rounded-lg" src={resultImage} alt="" />
         )}
      </div>
   )
}

export default DisplayImage
