import multer from "multer"

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/temp') //filename where we want to keep our file in storage before uploading on cloudinary
    },
    filename:function(req,file,cb){ //cb is callback
       cb(null,file.file.originalname)
    }
})

export const upload=multer({
    storage,
})