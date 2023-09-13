import { CategoryDto, UpdateUserDto } from '@dto';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseArrayPipe,
  Post,
  Put,
  UploadedFile,
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
import { v2 as cloudinarys } from 'cloudinary';
import { ConfigType } from '@nestjs/config';
import { appConfig } from '../app/app.config';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(appConfig.KEY) { cloudinary }: ConfigType<typeof appConfig>
  ) {
    cloudinarys.config({
      cloud_name: cloudinary.cloud_name,
      api_key: cloudinary.api_key,
      api_secret: cloudinary.api_secret,
    });

    // cloudinarys.config({
    //   cloud_name: cloudinary.cloud_name,
    //   api_key: cloudinary.api_key,
    //   api_secret: cloudinary.api_secret,
    // });
  }

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
  @ApiBody({ type: [CategoryDto] })
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
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @User('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (file) {
      const url = await this.userService.uploadFile(file);
      await this.userService.addUrlImages(url, id);
    }
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

  // @UseInterceptors(FileInterceptor('file'))
  // @Get('/prueba/:id')
  // async prueba(
  //   // @Body('email') email: string,
  //   @UploadedFile() file: Express.Multer.File,
  //   @Param('id') id: string
  // ) {
  //   const url = await this.userService.prueba(id);
  //   // const updateimages = await this.userService.update(url)

  //   return url;
  // }
}
