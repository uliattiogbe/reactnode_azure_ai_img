const AzureVsionService = require('../services/azureVisionService');
const logger = require('../utils/logger');


const  azureVisionController = {
    analyzeImage: async (req, res,next) => {
        try {

            if(!req.file){
                return res.status(400).json({ 
                            success: false,
                            message: "No image file uploaded" });
                        }


            const analysis= await AzureVsionService.analyzeUploadedImage(req.file.buffer);                  
            logger.info("Image analyzed successfully. Caption: " + analysis.caption?.result?.text || "No caption generated");
        
        res.status(200).json({
            success: true,
            message: 'Image analyzed successfully',
            data: analysis
        });
        
        } catch (error) {
       next(error)
        }

    }
};

module.exports = azureVisionController;