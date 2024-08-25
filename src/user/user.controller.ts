import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/common/enums/rol.enum';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  //buscar al usuario por el nombre
  @Get('/data/:name')
  find(@Param('name') name: string): Promise<User | undefined> {
    return this.userService.findOneByName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @Post(':id/change-password')
  updatePassword(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    return this.userService.updatePassword(
      id,
      updateUserDto.oldPassword,
      updateUserDto.newPassword,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
