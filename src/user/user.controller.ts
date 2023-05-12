import { UserService } from './user.service';
import { IDataUser, IMessage, IUserRegistered } from './user.entity';
import {
  Delete,
  Get,
  Patch,
  Post,
  Controller,
  Body,
  Param,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    const getAll = await this.userService.getAllUsers();
    return getAll;
  }

  @Post()
  async insertUser(@Body() body: IDataUser) {
    const getAll = await this.userService.insertUser(body);
    return getAll;
  }

  @Patch(':id')
  async updateUser(@Body() body: IDataUser, @Param('id') id: string) {
    const getId: IUserRegistered = await this.userService.findById(id);

    if (getId) {
      const update: IUserRegistered | IMessage =
        await this.userService.updateUser(getId.id, body);
      return update;
    }
    return { message: 'Usuário não encontrado' };
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    const getId: IUserRegistered = await this.userService.findById(id);

    if (getId) {
      const remove: IMessage = await this.userService.removeUser(id);
      return remove;
    }
    return { message: 'Usuário não encontrado' };
  }
}
