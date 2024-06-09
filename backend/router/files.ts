import express, { Request, Response, NextFunction } from "express";
import multer, { MulterError } from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { config } from "dotenv";
import { FileModel } from '../models/file';
config();

const router = express.Router();

// Define Multer storage configuration
const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, "uploads/");
  },
  filename: (_req, file, callback) => {
    const fileName = `${Date.now()}-${Math.round(Math.random() * 100000)}${path.extname(file.originalname)}`;
    callback(null, fileName);
  },
});

// Multer upload configuration
const upload = multer({
  storage,
  limits: { fileSize: 104857600 },
}).single("sendfile");

interface MulterRequest extends Request {
  file: Express.Multer.File;
}

router.post("/", (req: MulterRequest, res: Response, next: NextFunction) => {
  upload(req, res, async (err: MulterError | any) => {
    if (!req.file) {
      return res.status(400).json({ error: "Please add a file." });
    }

    if (err) {
      return res.status(500).send({ error: err.message });
    }

    const fileuuid = uuidv4();
    try {
      // Storing file details in the database
      const file = new FileModel({
        filename: req.file.filename,
        uuid: fileuuid,
        path: req.file.path,
        size: req.file.size,
      });

      const response = await file.save();
      console.log(response);

      FileModel.create({
        name:req.file.originalname,
        uuid:fileuuid,
        size:req.file.size,
        path:req.file.path,
      })

      return res.json({ 
        message: "File added successfully" ,
        uuid:fileuuid
      });
    } catch (error) {
      return res.status(500).send({ error: "Error saving file to database" });
    }
  });
});

export default router;
