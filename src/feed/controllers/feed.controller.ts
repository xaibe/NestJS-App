import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FeedPostEntity } from '../models/post.entity';
import { CreateFeedDto } from '../dto/create-feed.dto';
import { FeedService } from '../services/feed.service';
import { UpdateFeedDto } from '../dto/update-feed.dto';
@ApiTags('feed')
@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}
  @ApiBody({ schema: { example: { post: FeedPostEntity } } })
  @ApiCreatedResponse({ type: FeedPostEntity })
  @ApiBadRequestResponse()
  @Post('create')
  create(@Body() post: CreateFeedDto): Observable<CreateFeedDto> {
    return this.feedService.createPost(post);
  }

  @ApiOkResponse({ type: FeedPostEntity, isArray: true })
  @Get('all')
  findAll(): Observable<CreateFeedDto[]> {
    return this.feedService.findAllPosts();
  }

  @ApiBody({ schema: { example: { post: FeedPostEntity } } })
  @ApiBadRequestResponse()
  @Put('update/:id')
  updatefeed(
    @Param('id') id: number,
    @Body() updatefeedDto: UpdateFeedDto,
  ): Observable<UpdateResult> {
    return this.feedService.updatePost(id, updatefeedDto);
  }

  @ApiBadRequestResponse()
  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.feedService.deletePost(id);
  }
}
