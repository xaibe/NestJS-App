import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { FeedPostEntity } from '../models/post.entity';
import { FeedPost } from '../models/post.interface';
import { FeedService } from '../services/feed.service';
@ApiTags('feed')
@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}
  @ApiBody({ schema: { example: { post: FeedPostEntity } } })
  @ApiCreatedResponse({ type: FeedPostEntity })
  @ApiBadRequestResponse()
  @Post('create')
  create(@Body() post: FeedPost): Observable<FeedPost> {
    return this.feedService.createPost(post);
  }
}
