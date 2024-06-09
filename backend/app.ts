import express, { Request, Response } from 'express';
import { config } from 'dotenv';
import { connectTodb } from './models/mongoose';
import fileRouter from './router/files';
import showRouter from './router/show';
import cors from 'cors';
import downloadRouter from './router/download';

config();

const app = express();
const Port:number = 3000;

connectTodb();

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.get('/', (req: Request, res: Response) => {
  res.render('home');
});

app.use('/api/files', fileRouter);
app.use('/files', showRouter);
app.use('/files/download', downloadRouter);


app.listen(Port, () => {
  console.log(`App started at port ${Port}`);
});
