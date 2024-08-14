// src/components/BackgroundRemover.tsx
import React, {FC, useState} from "react"
import axios from "axios"

interface IProcessedImage {
   processed: string // URL or path to the processed image
}

interface IBackgroundRemoverProps {
   images: File[] | null
   setResultImage: React.Dispatch<React.SetStateAction<string[] | null>>
}

const BackgroundRemover: FC<IBackgroundRemoverProps> = ({
   images,
   setResultImage
}) => {
   const [processedImages, setProcessedImages] = useState<IProcessedImage[]>([])
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState<string | null>(null)

   const handleProcessImages = async () => {
      if (!images || images.length === 0) return

      const formData = new FormData()
      images.forEach(file => {
         formData.append("images", file) // Append each image to FormData
      })

      setLoading(true)
      setError(null)

      try {
         const response = await axios.post(
            "https://server-tau-five-73.vercel.app/upload",
            formData,
            {
               headers: {
                  "Content-Type": "multipart/form-data"
               }
            }
         )

         setProcessedImages(response.data)
      } catch (error) {
         setError("Error processing images.")
         console.error("Error processing images:", error)
      } finally {
         setLoading(false)
      }
   }

   const handleDownload = (url: string) => {
      const a = document.createElement("a")
      a.href = url
      a.download = url.split("/").pop() || "image.png" // Extract file name from URL
      a.click()
   }

   const handleClearImages = () => {
      setResultImage([])
      setProcessedImages([])
   }

   return (
      <div className="mt-4">
         <button
            onClick={handleProcessImages}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
         >
            {loading ? "Processing..." : "Remove Background"}
         </button>
         {error && <p className="text-red-500 mt-2">{error}</p>}
         <div className="mt-4">
            {processedImages.length > 0 && (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {processedImages.map((image, index) => (
                     <div key={index} className="relative">
                        <img
                           src={image.processed}
                           alt={`Processed ${index}`}
                           className="w-full h-auto rounded"
                        />
                        <button
                           onClick={() => handleDownload(image.processed)}
                           className="absolute bottom-2 right-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors duration-300"
                        >
                           Download
                        </button>
                     </div>
                  ))}
               </div>
            )}
         </div>
         {processedImages.length > 0 && (
            <button
               onClick={handleClearImages}
               className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
            >
               Remove All Images
            </button>
         )}
      </div>
   )
}

export default BackgroundRemover
