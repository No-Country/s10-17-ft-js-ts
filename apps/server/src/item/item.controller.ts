import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto, ErrorResponse, ItemDto, UpdateItemDto } from '@dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Item successfully created',
    type: ItemDto,
  })
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Get()
  @ApiOkResponse({
    type: [ItemDto],
  })
  findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: ItemDto,
  })
  @ApiNotFoundResponse({
    description: 'Item not found',
    type: ErrorResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid UUID',
    type: ErrorResponse,
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.itemService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.itemService.update(id, updateItemDto);
  }
}
