const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const azureVisionController = require("../controllers/azureVisionController");

router.post(
  "/analyze",
  upload.single("image"),
  azureVisionController.analyzeImage
);
module.exports = router;
