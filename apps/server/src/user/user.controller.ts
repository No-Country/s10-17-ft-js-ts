import { CategoryDto, UpdateUserDto } from '@dto';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../auth/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
    // cloudinary.config({
    //   cloud_name: this.configService.get<string>('cloudinary.cloudName'),
    //   api_key: this.configService.get<string>('cloudinary.apiKey'),
    //   api_secret: this.configService.get<string>('cloudinary.apiSecret'),
    // });
  }

  // los controller de like y dislike, ponerlos con el jwt. V
  // arreglar el automapper en findOne.V
  // agregar endpoint para devolver informacion del usuario V
  // subir imagenes a cloudinary. V
  // Crear por lo menos la maqueta de las categories y los pines
  // ver la funcion de distancia con API de google MAPS. V
  // en user agregar: lookingFor, avatar, coordenadas, rango de KM, 1/2

  @ApiOperation({ summary: 'Get all users' })
  @Get('/all')
  getAll() {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.userService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user by JWT' })
  @Get()
  getByJWT(@User('id') id: string) {
    return this.userService.getOne(id);
  }

  @ApiOperation({ summary: 'update categorys' })
  @ApiBody({ type: CategoryDto })
  @UseGuards(JwtAuthGuard)
  @Put('/categorys')
  updateCategorys(
    @Body(new ParseArrayPipe({ items: CategoryDto }))
    updateCategorysDto: CategoryDto[],
    @User('id') id: string
  ) {
    return this.userService.updateCategorys(updateCategorysDto, id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdateUserDto })
  @ApiOperation({ summary: 'Update user information' })
  @Put()
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Body() updateUserDto: UpdateUserDto,
    @User('id') id: string
    // @UploadedFile() file: Express.Multer.File
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

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Like a user' })
  @ApiNotFoundResponse({ description: `User not found` })
  @ApiBadRequestResponse({
    description: `Cannot like yourself. User IDs must be different`,
  })
  @ApiParam({
    name: 'idLiked',
    description: 'ID del usuario que fue likeado',
    required: true,
    type: 'string',
  })
  @Post('/like/:idLiked')
  like(@User('id') id: string, @Param('idLiked') idLiked: string) {
    return this.userService.likedBy(id, idLiked);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Dislike a user' })
  @ApiNotFoundResponse({ description: `User not found` })
  @ApiBadRequestResponse({
    description: `Cannot like yourself. User IDs must be different`,
  })
  @ApiBadRequestResponse({ description: `User 1 already liked user 2` })
  @ApiParam({
    name: 'idDisliked',
    description: 'ID del usuario que fue dislikeado',
    required: true,
    type: 'string',
  })
  @Post('/dislike/:idDisliked')
  dislike(@Param('idDisliked') idDisliked: string, @User('id') id: string) {
    return this.userService.disLikeBy(id, idDisliked);
  }
}
