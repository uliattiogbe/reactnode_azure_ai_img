

const axios = require("axios");
const FormData = require("form-data");
class AzureVsionService {
  constructor() {
    this.endpoint = process.env.AZURE_VISION_ENDPOINT;
    this.key = process.env.AZURE_VISION_KEY;
  }

  async analyzeUploadedImage(ImageBuffer,imageUrl = null) {
    if (!this.endpoint || !this.key) {
      throw new Error("Azure Computer Vison credentials is not configured");
    }

    const url = `${this.endpoint}computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=caption,read,tags,objects,denseCaptions`;
    //const url = `${this.endpoint}computervision/imageanalysis:analyze?api-version=2024-02-01&features=caption,read,denseCaptions,objects`;

    const form = new FormData();
    form.append("image", ImageBuffer, "image.jpg");

    try {
      
      
      const response = await axios.post(url, form, {
        Headers: {
          ...form.getHeaders(),
          "Ocp-Apim-Subscription-Key": this.key,
        },
        maxBodyLength: Infinity,
        
      });

      return response.data;
    } catch (error) {
      console.error(
        "Azure Vision API Error:",
        error.response?.data || error.message,
      );
      throw new Error(
        `Failed to analyze image with Azure Vision API: ${error.response?.data?.error?.message || error.message}`,
      );
    }
  }

}

module.exports = new AzureVsionService();
