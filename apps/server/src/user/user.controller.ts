import { CreateUserDto, UpdateUserDto } from '@dto';
import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { v2 as cloudinary } from 'cloudinary';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @ApiOperation({ summary: 'Get all users' })
  @Get('/all')
  getAll() {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Get a user by ID' })
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.userService.getOne(id);
  }


  @ApiBody({ type: UpdateUserDto} )  @ApiOperation({ summary: 'Update user information' })
  @Put('/:id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
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
  @ApiNotFoundResponse({description : `User not found`})
  @ApiBadRequestResponse({description : `Cannot like yourself. User IDs must be different`})
  @ApiParam({
    name: 'userId',
    description: 'ID del usuario que dio el like',
    required: true,
    type: 'string',
  })
  @ApiParam({
    name: 'idLiked',
    description: 'ID del usuario que fue likeado',
    required: true,
    type: 'string',
  })
  @Post('/like/:userId/:idLiked')
  like(@Param('userId') userId: string, @Param('idLiked') idLiked: string) {
    return this.userService.likedBy(userId, idLiked);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Dislike a user' })
  @ApiNotFoundResponse({description : `User not found`})
  @ApiBadRequestResponse({description : `Cannot like yourself. User IDs must be different`})
  @ApiBadRequestResponse({description : `User 1 already liked user 2`})
  @ApiParam({
    name: 'userId',
    description: 'ID del usuario que dio el like',
    required: true,
    type: 'string',
  })
  @ApiParam({
    name: 'idDisliked',
    description: 'ID del usuario que fue dislikeado',
    required: true,
    type: 'string',
  })
  @Post('/dislike/:userId/:idDisliked')
  dislike(@Param('userId') userId: string, @Param('idDisliked') idDisliked: string) {
    return this.userService.disLikeBy(userId, idDisliked);
  }


}
