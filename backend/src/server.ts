import express from 'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';

import './database/Connection';
import routes from './Routes';
import handleError from './errors/HandleError';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(handleError);

const uploadsDirectory = path.join(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsDirectory));

app.listen(3333);