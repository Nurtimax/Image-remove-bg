import {FC, useState} from "react"
import axios from "axios"

interface IBackgroundRemoverProps {
   image: string | Blob
   resultImage: string | null
   handleClearImages: () => void
   setResultImage: React.Dispatch<React.SetStateAction<string | null>>
}

const BackgroundRemover: FC<IBackgroundRemoverProps> = ({
   image,
   resultImage,
   setResultImage,
   handleClearImages
}) => {
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState<null | string>(null)

   const removeBackground = async () => {
      if (!image) return

      const formData = new FormData()
      formData.append("image_file", image)

      setLoading(true)
      setError(null)

      try {
         const response = await axios.post(
            "https://api.remove.bg/v1.0/removebg",
            formData,
            {
               headers: {
                  "Content-Type": "multipart/form-data",
                  "X-Api-Key": "gjEdoXLZn6k4tVamZ3noJYMo" // Replace with your API key
               },
               responseType: "arraybuffer"
            }
         )

         const blob = new Blob([response.data], {type: "image/png"})
         setResultImage(URL.createObjectURL(blob))
      } catch (error) {
         setError("Error removing background.")
         console.error("Error removing background:", error)
      } finally {
         setLoading(false)
      }
   }

   const handleDownload = () => {
      if (!resultImage) return

      const a = document.createElement("a")
      a.href = resultImage
      a.download = "processed-image.png" // Change the file name as needed
      a.click()
   }

   return (
      <div>
         <div className="flex items-center flex-wrap gap-2">
            {image && (
               <button
                  onClick={removeBackground}
                  disabled={loading}
                  className="w-full"
               >
                  {loading ? "Processing..." : "Remove Background"}
               </button>
            )}
            {resultImage && (
               <>
                  <button
                     onClick={handleDownload}
                     className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
                  >
                     Download Image
                  </button>
                  <button
                     onClick={handleClearImages}
                     className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
                  >
                     Remove Result
                  </button>
               </>
            )}
         </div>

         {error && <p>{error}</p>}
      </div>
   )
}

export default BackgroundRemover
