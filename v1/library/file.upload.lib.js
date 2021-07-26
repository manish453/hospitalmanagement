const multer = require('multer');
const path = require("path");
const { uploadFileTypeValidator } = require('../../helpers/common.helper')
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
exports.upload = multer({ 
  storage: storage, 
  fileFilter: uploadFileTypeValidator
 }).single('uploadfile');