import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response, response } from 'express';
import { CreateUserDTO } from '../../dtos/CreateUser.dto';
import { ProductService } from '../../services/product/product.service';

@Controller('users')
export class ProductController {
  constructor(private userService: ProductService) {}

  @Get('/list')
  getUsers() {
    return this.userService.fetchUsers();
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body() userData: CreateUserDTO) {
    this.userService.createUser(userData);
    return {};
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    console.log(id);

    return { id };
  }
}
