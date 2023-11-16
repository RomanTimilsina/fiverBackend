import multer from 'multer';
import { registrationId } from '../controllers/auth.controller.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    console.log(`name:${registrationId}`)

    cb(null, file.originalname + '-' + `${registrationId}.png` );
  },
});

const upload = multer({ storage: storage });

export default upload;