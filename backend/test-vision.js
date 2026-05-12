require('dotenv').config();
const { default: createImageAnalysisClient } = require("@azure-rest/ai-vision-image-analysis");
const { AzureKeyCredential } = require("@azure/core-auth");

// 1. Retrieve cloud credentials safely from your environment setup
const endpoint = process.env.AZURE_VISION_ENDPOINT;
const key = process.env.AZURE_VISION_KEY;

if (!endpoint || !key) {
  console.error("❌ Error: Missing VISION_ENDPOINT or VISION_KEY environment variables.");
  process.exit(1);
}

async function testAzureConnection() {
  console.log("🔄 Initializing Azure Image Analysis client...");
  
  // 2. Initialize the cloud client factory instance
  const client = createImageAnalysisClient(endpoint, new AzureKeyCredential(key));

  // 3. Define a lightweight hosted sample image to bypass local payload uploads
  const sampleImageUrl = "microsoft.com";

  try {
    console.log("📡 Sending test request to Azure endpoint...");
    
    // 4. Request a simple feature (like Caption) to verify complete authentication round-trip
    const response = await client.path("/analyze").post({
      body: { url: sampleImageUrl },
      queryParameters: { features: ["Caption"] },
      contentType: "application/json"
    });

    // 5. Inspect HTTP Response blocks explicitly
    if (response.status !== "200") {
      throw response.body.error;
    }

    console.log("✅ Connection Successful! Azure Computer Vision is online.");
    console.log(`📝 Verified Description: "${response.body.captionResult.text}"`);

  } catch (error) {
    console.error("❌ Connection Test Failed!");
    console.error(`Error Details: ${error.message || JSON.stringify(error)}`);
  }
}

testAzureConnection();