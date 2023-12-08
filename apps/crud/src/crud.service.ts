import { ConflictException, Injectable } from '@nestjs/common';
import { SignupDto } from '../dto/signupDto';
import { PrismaService } from './prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dto/updateUserDto';

@Injectable()
export class CrudService {
  constructor(private readonly prismaService: PrismaService) {}
  
  async signup(signupDto : SignupDto) {
    try{
      const {email, password, name} = signupDto;
      const user = await this.prismaService.user.findUnique({where: {email}})
      if(user) throw new ConflictException('User already exists');
      const hashPassword = await bcrypt.hash(password, 10);
      await this.prismaService.user.create({
        data: {email, name, password: hashPassword},
      });
      return {data:"User successfuly created !" }
    }catch(err){
      return err; 
    }
    
  }
  
  
  getUsers(): any {
    try{
      const allUsers = this.prismaService.user.findMany();
      return allUsers;
    }catch(err){
      throw err;
    }
  }
  
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    try{
      const {name} = updateUserDto;
      const updatedUser = await this.prismaService.user.update({
        where: { id: id },
        data: { name: name },
      });
      return updatedUser;
    }catch(err) {
      throw err;
    }
  }

  async deleteUser(id: number) {
    try{
      const deletedUser = await this.prismaService.user.delete({
        where: {id: id}
      });
      return deletedUser.id
    }catch(err){
      throw err;
    }
  }
}
