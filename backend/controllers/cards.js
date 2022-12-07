import { card } from '../models/card.js';
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  ServerError,
} from '../errors/index.js';

const messageNotFoundError = 'Карточки с этими данными не существует';
const messageBadRequestError = 'Введены некорректные данные';
const messageForbiddenError = 'Недостаточно прав для совершения действия';
const messageServerError = 'Произошла серверная ошибка';

export const getCards = (req, res, next) => {
  card.find({}).populate('likes').populate('owner').then((cards) => res.send({ data: cards }))
    .catch(() => {
      next(new ServerError(messageServerError));
    });
};

export const createCard = (req, res, next) => {
  const { name, link } = req.body;
  card
    .create({ name, link, owner: req.user._id })
    .then((data) => card.findById(data._id).populate('owner'))
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(messageBadRequestError));
      } else {
        next(new ServerError(messageServerError));
      }
    });
};

export const deleteCard = (req, res, next) => {
  card
    .findById(req.params.cardId).populate('likes').populate('owner')
    .then((data) => {
      if (!data) {
        throw (new NotFoundError(messageNotFoundError));
      } else if (data.owner._id.toString() !== req.user._id) {
        throw (new ForbiddenError(messageForbiddenError));
      } else {
        return data.remove({})
          .then((newData) => res.send({ newData }));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(messageBadRequestError));
      } else {
        next(err);
      }
    });
};

export const likeCard = (req, res, next) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).populate('likes').populate('owner')
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        throw (new NotFoundError(messageNotFoundError));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(messageBadRequestError));
      } else {
        next(err);
      }
    });
};

export const dislikeCard = (req, res, next) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).populate('likes').populate('owner')
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        throw (new NotFoundError(messageNotFoundError));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(messageBadRequestError));
      } else {
        next(err);
      }
    });
};
