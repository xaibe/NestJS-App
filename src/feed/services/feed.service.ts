import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FeedPostEntity } from '../models/post.entity';
import { CreateFeedDto } from '../dto/create-feed.dto';
import { UpdateFeedDto } from '../dto/update-feed.dto';
@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>,
  ) {}

  createPost(feedPost: CreateFeedDto): Observable<CreateFeedDto> {
    return from(this.feedPostRepository.save(feedPost));
  }

  findAllPosts(): Observable<CreateFeedDto[]> {
    return from(this.feedPostRepository.find());
  }

  updatePost(
    id: number,
    updatefeedDto: UpdateFeedDto,
  ): Observable<UpdateResult> {
    return from(this.feedPostRepository.update(id, updatefeedDto));
  }

  deletePost(id: number): Observable<DeleteResult> {
    return from(this.feedPostRepository.delete(id));
  }
}
