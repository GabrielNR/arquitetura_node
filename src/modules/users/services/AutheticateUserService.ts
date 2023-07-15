//imports
import { compare } from "bcryptjs";
import { getRepository } from "typeorm";
import { sign } from 'jsonwebtoken';
import authConfig from "@config/auth";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";
import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

//interfaces
interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

//classe
@injectable()
class AutheticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  
  ){}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    //buscar onde um usuario onde tem esse email
    const user = await this.usersRepository.findByEmail(email);    

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const {secret, expiresIn} = authConfig.jwt

    const token = sign({}, secret, {
	    subject: user.id,
      expiresIn
    });

    return {
      user,
      token,
    };
  }
}

export default AutheticateUserService;