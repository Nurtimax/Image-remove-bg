import {FC} from "react"
import {useDropzone} from "react-dropzone"

interface IImageUploaderProps {
   onImageUpload: (file: File[]) => void
}

const ImageUploader: FC<IImageUploaderProps> = ({onImageUpload}) => {
   const {getRootProps, getInputProps, isDragActive, isDragReject} =
      useDropzone({
         accept: {"image/jpeg": [], "image/png": []},
         onDrop: acceptedFiles => {
            onImageUpload(acceptedFiles)
         }
      })

   return (
      <div
         {...getRootProps({
            className: `flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 my-4
          ${
             isDragActive
                ? "border-green-500 bg-green-100"
                : "border-gray-300 bg-white"
          }
          ${isDragReject ? "border-red-500 bg-red-100" : ""}
        `
         })}
      >
         <input {...getInputProps()} />
         <div className="flex flex-col items-center">
            <svg
               className="w-12 h-12 mb-4 text-gray-500"
               fill="none"
               stroke="currentColor"
               viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 7V3m10 4V3M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2zm0-4h14M12 3v12m0 0l4-4m-4 4l-4-4"
               />
            </svg>
            <p className="text-gray-600 text-lg">
               {isDragActive
                  ? "Отпустите изображение сюда..."
                  : "Перетащите изображение сюда или кликните для выбора"}
            </p>
         </div>
      </div>
   )
}

export default ImageUploader
