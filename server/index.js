// server.js
const express = require("express")
const multer = require("multer")
const axios = require("axios")
const path = require("path")
const fs = require("fs")
const FormData = require("form-data") // Import FormData
const app = express()
const PORT = 3001
const cors = require("cors")
app.use(express.json())
app.use(cors())
// Configure Multer for file uploads
const upload = multer({dest: "uploads/"})

// API endpoint to handle image uploads
app.post("/upload", upload.array("images", 100), async (req, res) => {
   const files = req.files
   try {
      // Process each file
      const promises = files.map(file => processImage(file.path))
      const results = await Promise.all(promises)

      // Send back processed image URLs or data
      res.json(results)
   } catch (error) {
      res.status(500).send("Error processing images")
   }
})

// Function to process images using a background removal API
const processImage = async filePath => {
   // Use a background removal API (example)
   const formData = new FormData()
   formData.append("image_file", fs.createReadStream(filePath))

   const response = await axios.post(
      "https://api.remove.bg/v1.0/removebg",
      formData,
      {
         headers: {
            "Content-Type": "multipart/form-data",
            "X-Api-Key": "YOUR_API_KEY"
         },
         responseType: "arraybuffer"
      }
   )

   const processedFilePath = path.join("processed", path.basename(filePath))
   fs.writeFileSync(processedFilePath, response.data)

   // Clean up
   fs.unlinkSync(filePath)

   return {
      original: filePath,
      processed: processedFilePath
   }
}

app.get("/", async (req, res) => {
   return res.send("Success is running")
})

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})
module.exports = app
