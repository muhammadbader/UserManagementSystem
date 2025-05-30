import multer from "multer";
import { nanoid } from 'nanoid'

function fileUpload() {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, `${nanoid()}-${file.originalname}`);
    },
  });

  filefilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."), false);
    }
  }

  const upload = multer({ filefilter, storage });

  return upload;
}

export default fileUpload;
