import { Post, Get, Res, Req, Body, Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}


  @Post('create')
  async createComment(@Body() _body) {
    const { email, text, nickname, isReply, parentCommentId, postId } = _body;
    return this.commentService.createComment(text, email, nickname, isReply, parentCommentId, postId);
  }

  @Get('get')
  async getComment(@Query('commentId') commentId: string) {
    return this.commentService.getComment(commentId);
  }

  @Get('getReply')
  async getReply(@Query('postId') postId: string, @Query('parentCommentId') parentCommentId: string) {
    return this.commentService.getReply(postId, parentCommentId);
  }

  @Get('getMany')
  async getComments(@Query('postId') postId: string) {
    return this.commentService.getComments(postId);
  }
}
