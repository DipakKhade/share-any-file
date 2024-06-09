import express, { Request, Response, NextFunction } from 'express';
import { FileModel } from '../models/file';
import { config } from 'dotenv';
config();

const app = express();
const router = express.Router();

// Interface for File model (assuming you have a TypeScript type or interface for your File model)
interface File {
  uuid: string;
  filename: string;
  size: number;
  path: string;
}

interface ProcessEnv {
  APP_BASE_URL: string;
}

router.get('/:uuid', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = await FileModel.findOne({ uuid: req.params.uuid }) as File | null;

    if (!file) {
      return res.render('download', { error: 'File not found' });
    } else {
      return res.render('download', {
        uuid: file.uuid,
        filename: file.filename,
        filesize: file.size,
        download: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
      });
    }
  } catch (error) {
    return res.render('download', { error: 'Some error occurred' });
  }
});

export default router;
