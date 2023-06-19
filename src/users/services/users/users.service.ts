import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dtos/CreateUser.dto';

@Injectable()
export class UsersService {
  private fakeUsers = [
    { username: 'Anson', email: '809432894@qq.com' },
    { username: 'Anson2', email: '809432894222@qq.com' },
    { username: 'Anson3', email: '809432894333@qq.com' },
  ];

  fetchUsers() {
    return this.fakeUsers;
  }

  createUser(userData: CreateUserDTO) {
    this.fakeUsers.push(userData);
    return this.fakeUsers;
  }
}
