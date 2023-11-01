const multer = require('multer');


//store in uploads folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    //store with user_id or quiz_id as filename
    cb(null, req._id.toString() )
  }
})

const upload = multer({ storage: storage })

// const uploadImage =upload.single('file'), (req, res) => {
//   res.send({"message":'Form data and file received.'});
// });

module.exports = upload;