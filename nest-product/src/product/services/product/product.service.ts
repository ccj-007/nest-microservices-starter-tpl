import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../../dtos/CreateUser.dto';

@Injectable()
export class ProductService {
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
