import {getRepository} from 'typeorm'
import User from '@modules/users/infra/typeorm/entities/User';
import fs from 'fs';
import { inject, injectable } from 'tsyringe'

import uploadConfig from '@config/multer';
import path from 'path'
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    user_id: string;
    avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository

  ){}

  public async execute ({ user_id, avatarFileName}: IRequest): Promise<User> {
  
    const user = await this.usersRepository.findById(user_id);
    
    if(!user) {
      throw new AppError('Only authenticated users can change avatar', 401)
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      
      try {
        await fs.promises.stat(userAvatarFilePath);
        await fs.promises.unlink(userAvatarFilePath);
      } catch (error) {
        console.log(error)
      } 
    }

    user.avatar = avatarFileName;

    await this.usersRepository.save(user)

    return user;
  }
}

export default UpdateUserAvatarService