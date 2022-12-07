import { Joi, celebrator, Segments } from 'celebrate';

export const linkRegExp = /^https?:\/\/(www.)?[\w-]+\.[\w-]+[\w\-._~:/?#[\]@!$&'()*+,;=]*#?$/;

const celebrate = celebrator(
  { mode: 'full' }, // проверять весь запрос (если валидируем несколько частей)
  { abortEarly: false }, // не останавливать проверку при первой же ошибке
);

const schemaCard = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  link: Joi.string().pattern(linkRegExp).required(),
}).required();

const schemaId = Joi.object({
  cardId: Joi.string().hex().length(24).required(),
}).required();

export const validateCard = celebrate({ [Segments.BODY]: schemaCard });
export const validateId = celebrate({ [Segments.PARAMS]: schemaId });
