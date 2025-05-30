import multer from "multer";
import { nanoid } from "nanoid";

// store the uploaded files in the "uploads" directory with a unique name
function fileUpload() {
  // alternative: cloudinary for file storage or S3 aws

  // approach 2: cloudinary or S3 aws
  const storage = multer.diskStorage({
    // // uncommect for the first approach, second approach is cloudinary or S3 aws which is in the put API
    // destination: (req, file, cb) => {
    //   cb(null, "uploads/");
    // },
    // filename: (req, file, cb) => {
    //   cb(null, `${nanoid()}-${file.originalname}`);
    // },
  });

  function fileFilter(req, file, cb) {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."),
        false
      );
    }
  }

  const upload = multer({ fileFilter, storage });

  return upload;
}

export default fileUpload;
