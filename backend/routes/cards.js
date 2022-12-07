import { Router } from 'express';

import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards.js';
import {
  validateCard,
  validateId,
} from '../utils/validatorCard.js';

export const card = Router();

card.get('/cards', getCards);
card.post('/cards', validateCard, createCard);
card.delete('/cards/:cardId', validateId, deleteCard);
card.put('/cards/:cardId/likes', validateId, likeCard);
card.delete('/cards/:cardId/likes', validateId, dislikeCard);
