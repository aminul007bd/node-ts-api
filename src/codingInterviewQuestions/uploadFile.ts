// Question: Write an endpoint to accept multi-part form data with both a file and JSON fields.

import multer from "multer";

const upload = multer({ dest: "uploads/" });

app.post(
  "/api/upload",
  upload.single("file"),
  (req: Request, res: Response) => {
    const { title, description } = req.body;
    const file = req.file;

    if (!file || !title || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    res.json({
      message: "Upload successful",
      title,
      description,
      filePath: file.path,
    });
  }
);
