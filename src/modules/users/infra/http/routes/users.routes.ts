import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/multer';
import { container } from 'tsyringe';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensuredAuthenticated';

const usersRouter = Router();
const usersController = new UsersController()
const usersAvatarController = new UserAvatarController()
const upload = multer(uploadConfig)

usersRouter.post('/', usersController.create);

usersRouter.patch('/avatar', 
  ensureAuthenticated, 
  upload.single('avatar'),
  usersAvatarController.update
);

export default usersRouter;