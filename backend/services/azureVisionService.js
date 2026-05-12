const axios = require("axios");

class AzureVisionService {
  constructor() {
    this.endpoint = process.env.VISION_ENDPOINT;
    this.key = process.env.VISION_KEY;
  }

  async analyzeUploadedImage(imageBuffer) {
    // Validate environment variables
    if (!this.endpoint || !this.key) {
      throw new Error(
        "Azure Computer Vision credentials are not configured",
      );
    }

    // Ensure endpoint ends with /
    const endpoint = this.endpoint.endsWith("/")
      ? this.endpoint
      : `${this.endpoint}/`;

    // Azure Vision API URL
    const url =
      `${endpoint}computervision/imageanalysis:analyze` +
      `?api-version=2023-10-01` +
      `&features=caption,tags,read` +
      `&language=en` +
      `&gender-neutral-caption=true`;

    try {
      const response = await axios.post(url, imageBuffer, {
        headers: {
          "Content-Type": "application/octet-stream",
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
        `Failed to analyze image with Azure Vision API: ${
          error.response?.data?.error?.message || error.message
        }`,
      );
    }
  }
}

module.exports = new AzureVisionService();








// const axios = require("axios");
// const FormData = require("form-data");
// class AzureVsionService {
//   constructor() {
//     this.endpoint = process.env.VISION_ENDPOINT;
//     this.key = process.env.VISION_KEY;
//   }

//   async analyzeUploadedImage(ImageBuffer, imageUrl = null) {
//     if (!this.endpoint || !this.key) {
//       throw new Error("Azure Computer Vison credentials is not configured");
//     }

//     // const url = `${this.endpoint}computervision/imageanalysis:analyze?api-version=2023-10-01-preview&features=caption,read,tags,objects,denseCaptions`;
// const url =
//   `${endpoint}computervision/imageanalysis:analyze` +
//   `?api-version=2023-10-01` +
//   `&features=caption,tags,read` +
//   `&language=en` +
//   `&gender-neutral-caption=true`;

//     const form = new FormData();
//     form.append("image", ImageBuffer, "image.jpg");

//     try {
//       const response = await axios.post(url, form, {
//         Headers: {
//           ...form.getHeaders(),
//           "Ocp-Apim-Subscription-Key": this.key,
//         },
//         maxBodyLength: Infinity,
//       });

//       return response.data;
//     } catch (error) {
//       console.error(
//         "Azure Vision API Error:",
//         error.response?.data || error.message,
//       );
//       throw new Error(
//         `Failed to analyze image with Azure Vision API: ${error.response?.data?.error?.message || error.message}`,
//       );
//     }
//   }
// }

// module.exports = new AzureVsionService();
