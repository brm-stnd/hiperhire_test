import {
  Controller,
  Post,
  Body,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterUserBodyDto, LoginUserBodyDto } from './user.dto';
import { User as UserModel } from '@prisma/client';
import { UserService } from './user.service';

@Controller({ path: 'user' })
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @UsePipes(new ValidationPipe())
  async signupUser(
    @Res() res,
    @Body() userData: RegisterUserBodyDto,
  ): Promise<UserModel> {
    try {
      const resp = await this.userService.createUser(userData);

      return res.status(resp.status).json({
        status: resp.status,
        message: resp.result || resp,
      });
    } catch (e) {
      return res.status(e.status).json({
        status: e.status,
        message: e.response,
      });
    }
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async signinUser(
    @Res() res,
    @Body() userData: LoginUserBodyDto,
  ): Promise<UserModel> {
    try {
      const resp = await this.userService.loginUser(userData);

      return res.status(resp.status).json({
        status: resp.status,
        message: resp.result || resp,
      });
    } catch (e) {
      console.log(':::e', e);
      return res.status(e.status).json({
        status: e.status,
        message: e.response,
      });
    }
  }
}
