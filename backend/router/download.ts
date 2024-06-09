import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { FileModel } from '../models/file';
// import { File } from 'buffer';

const router = express.Router();



interface File {
  uuid: string;
  path: string;
  filename: string;
  size: number;
}

router.get('/:uuid', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = await FileModel.findOne({ uuid: req.params.uuid }) as File | null;

    if (!file) {
      return res.render('download', {
        error: 'Link expired ...'
      });
    }

    const fileAddress = path.join(process.cwd(), file.path);
    const filePath = fileAddress.replace(/\\/g, '/');
    console.log(filePath);

    return res.download(filePath);
  } catch (error) {
    next(error);
  }
});

export default router;
