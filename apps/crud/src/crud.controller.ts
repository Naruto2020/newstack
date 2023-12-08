import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CrudService } from './crud.service';
import { SignupDto } from '../dto/signupDto';
import { UpdateUserDto } from '../dto/updateUserDto';

@Controller('newstack')
export class CrudController {
  constructor(private readonly crudService: CrudService) {}

  @Post('signup')
  signup(@Body() signupDto : SignupDto){
    return this.crudService.signup(signupDto);
  }


  @Get('users')
  getUsers(): any {
    return this.crudService.getUsers();
  }

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body()   updateUserDto: UpdateUserDto) {
    return this.crudService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.crudService.deleteUser(id);
  }
}
