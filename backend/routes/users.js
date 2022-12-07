import { Router } from 'express';
import {
  getAllUsers,
  getUser,
  getMyUser,
  createUser,
  updateMyUser,
  updateMyUserAvatar,
} from '../controllers/users.js';
import {
  routeMeValidate,
  avatarValidate,
  profileValidate,
} from '../utils/validatorUser.js';

export const user = Router();

user.get('/users', getAllUsers);
user.get('/users/me', getMyUser);
user.get('/users/:userId', routeMeValidate, getUser);
user.post('/users', profileValidate, createUser);
user.patch('/users/me', profileValidate, updateMyUser);
user.patch('/users/me/avatar', avatarValidate, updateMyUserAvatar);
