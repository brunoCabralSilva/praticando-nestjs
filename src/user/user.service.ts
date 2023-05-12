import { Injectable } from '@nestjs/common';
import { IDataUser, IUserRegistered } from './user.entity';

@Injectable()
export class UserService {
  private users: IUserRegistered[] = [
    {
      id: '1',
      firstName: 'Bruno',
      lastName: 'Cabral',
      dateOfBirth: '25/01/1994',
      cpf: '11111111111',
      email: 'bruno.cabral.silva2018@gmail.com',
    },
    {
      id: '2',
      firstName: 'Joana',
      lastName: "D'ark",
      dateOfBirth: '10/12/1995',
      cpf: '22222222222',
      email: 'bruno.silva2018@gmail.com',
    },
    {
      id: '3',
      firstName: 'Claudio',
      lastName: 'Marcio',
      dateOfBirth: '03/12/2008',
      cpf: '33333333333',
      email: 'bruno.silva@gmail.com',
    },
  ];

  async getAllUsers() {
    return await this.users;
  }

  async findId(email: string, cpf: string) {
    const find: IUserRegistered = await this.users.find(
      (user) => user.email === email || user.cpf === cpf,
    );
    return find;
  }

  async findById(id: string) {
    const find: IUserRegistered = await this.users.find(
      (user) => user.id === id,
    );
    return find;
  }

  async insertUser(body: IDataUser) {
    const { firstName, lastName, dateOfBirth, cpf, email } = body;
    const find: IUserRegistered = await this.findId(email, cpf);
    if (!find) {
      this.users.push({
        id: (this.users.length + 1).toString(),
        firstName,
        lastName,
        dateOfBirth,
        cpf,
        email,
      });
      return this.users[this.users.length - 1];
    }
    return { message: 'Usuário já existente' };
  }

  async updateUser(id: string, body: IDataUser) {
    const { firstName, lastName, dateOfBirth, cpf, email } = body;
    const find: IUserRegistered = await this.findById(id);

    if (find) {
      const otherUsers: IUserRegistered[] = await this.users.filter(
        (user) => user.id !== id,
      );

      await otherUsers.push({
        id,
        firstName,
        lastName,
        dateOfBirth,
        cpf,
        email,
      });

      this.users = otherUsers;

      return this.users[this.users.length - 1];
    }
    return { message: 'Usuário não encontrado' };
  }

  async removeUser(id: string) {
    const find: IUserRegistered = await this.findById(id);

    if (find) {
      const otherUsers: IUserRegistered[] = await this.users.filter(
        (user) => user.id !== id,
      );

      this.users = otherUsers;

      return { message: 'Usuário removido com sucesso' };
    }
    return { message: 'Usuário não encontrado' };
  }
}
