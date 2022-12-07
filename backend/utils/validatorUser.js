import { Joi, celebrator, Segments } from 'celebrate';

export const linkRegExp = /^https?:\/\/(www.)?[\w-]+\.[\w-]+[\w\-._~:/?#[\]@!$&'()*+,;=]*#?$/;

const celebrate = celebrator(
  { mode: 'full' }, // проверять весь запрос (если валидируем несколько частей)
  { abortEarly: false }, // не останавливать проверку при первой же ошибке
);

const schemaRouteMe = Joi.alternatives().try(
  Joi.string().equal('me'),
  Joi.string().hex().length(24),
).required();

const schemaObjectRouteMe = Joi.object({
  userId: schemaRouteMe,
}).required();

const schemaSignUp = Joi.object().keys({
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: Joi.string().pattern(linkRegExp),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().required(),
});

const schemaSignIn = Joi.object().keys({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().required(),
});

export const schemaObjectProfile = Joi.object({
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),

}).required();
export const schemaObjectAvatar = Joi.object({
  avatar: Joi.string().pattern(linkRegExp),
}).required();

export const profileValidate = celebrate({ [Segments.BODY]: schemaObjectProfile });
export const avatarValidate = celebrate({ [Segments.BODY]: schemaObjectAvatar });
export const signUpValidate = celebrate({ [Segments.BODY]: schemaSignUp });
export const signInValidate = celebrate({ [Segments.BODY]: schemaSignIn });
export const routeMeValidate = celebrate({ [Segments.PARAMS]: schemaObjectRouteMe });
