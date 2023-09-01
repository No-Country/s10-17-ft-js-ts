import { CreateUserDto, UpdateUserDto } from '@dto';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // PUT/user/ - para editar
  // DELETE/user/ - para eliminar
  // GET/user/profile/:id - para obtener perfil
  // POST/like/:id - para enviar like, verificando match
  // POST/dislike/:id - para enviar dislike

  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/all')
  getAll() {
    return this.userService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.userService.getOne(id);
  }

  @Put('/:id')
  // @UseInterceptors(FileInterceptor('file'))
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string
    // @UploadedFile() file: Express.Multer.File,
  ) {
    // if(file){
    // const url = await this.userService.uploadImage(file)
    // const updateimages = await this.userService.update(url)
    // }

    return this.userService.update(id, updateUserDto);
  }

  // @Delete('/:id')
  // delete(@Param('id') id: string){
  //   return this.userService.deleteOne(id)
  // }

  @Post('/like/:userId/:idLiked')
  like(@Param('userId') userId: string, @Param('idLiked') idLiked: string) {
    return this.userService.likedBy(userId, idLiked);
  }

  @Post('/verificar')
  dislike() {
    const id = 'c0c3931c-108d-4b2d-ac5c-afcf3241fe10';
    return this.userService.confirmVerify(id);
  }
}
