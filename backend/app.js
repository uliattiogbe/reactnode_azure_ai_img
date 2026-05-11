const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const azureVisionRoutes = require("./routes/azureVisionRoutes");




const app = express();
app.use(express.json());


// Routes

app.use("/api/vision", azureVisionRoutes);
app.get("/",(req,res)=>{ 
    res.send("server get api is up running");
});

const startServer = () => {
try {
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
      console.log(`Vision API available at: http://localhost:${PORT}/api/vision/analyze`);
    
} catch (error) {
    console.error("Failed to start server:", error);
}


};
startServer();

module.exports = app;