import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import { constants } from 'http2';
import { user } from './routes/users.js';
import { createUser, loginUser } from './controllers/users.js';
import { card } from './routes/cards.js';
import {
  signUpValidate,
  signInValidate,
} from './utils/validatorUser.js';
import { auth } from './middlewares/auth.js';
import { CORS } from './middlewares/CORS.js';
import { NotFoundError } from './errors/index.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(requestLogger);

app.use(CORS);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', signInValidate, loginUser);
app.post('/signup', signUpValidate, createUser);

app.use(auth);
app.use('/', user);
app.use('/', card);

app.all('/*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  res.status(err.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
    .send({ message: err.statusCode === 500 ? 'Неизвестная ошибка' : err.message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
