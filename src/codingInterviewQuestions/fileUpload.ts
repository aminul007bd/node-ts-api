// Question: Write an API endpoint to upload a profile picture, accepting only .png and .jpg files. Use multer for handling the file upload.

import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(new Error("Only .png and .jpg files are allowed"));
    }
  },
});

app.post(
  "/api/upload-profile",
  upload.single("profilePic"),
  (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ error: "Invalid file type" });
    }

    res.json({
      message: "File uploaded successfully",
      filename: req.file.filename,
    });
  }
);
