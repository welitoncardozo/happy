import express from 'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';

import './database/connection';
import routes from './routes';
import HandleError from './errors/HandleError';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(HandleError);

const uploadsDirectory = path.join(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsDirectory));

app.listen(3333);