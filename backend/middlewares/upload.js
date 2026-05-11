const multer = require('multer');
const storage = multer.memoryStorage();

const isImageFileOnly = (req, file, callbackImg) =>{
    if(file.mimetype.startsWith('image/')){
        callbackImg(null,true);

    }else{
        callbackImg(new Error('Only Image files are allowed!'), false);

    }
};


const upload = multer({
    storage: storage,
    limits:{fileSize:5*1024*1024},
    fileFilter:isImageFileOnly
});

module.exports =upload;