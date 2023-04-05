import { Body, Controller, Get, Post, Query, Delete } from '@nestjs/common';
import { ApiService } from './api.service';
import { UserAuthGuard } from 'src/auth/passport/user-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('api')
@UseGuards(UserAuthGuard)
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('getPost')
  async getPost(@Query('postId') postId: string) {
    
    const post = this.apiService.getPost(postId);
    if (!post) return { error: "No post with given id!"}
    else return post;
  }

  @Get('getPosts')
  async getPosts(@Query('skip') skip: number, @Query('limit') limit: number) {
    return this.apiService.getPosts(skip, limit);
  }

  @Post('createPost')
  async createPost(@Body() _body) {
    const { raw } = _body;
    return this.apiService.createPost(raw);
  }

  @Delete('deletePost')
  async deletePost(@Query('postId') postId: string) {
    return this.apiService.deletePost(postId);
  }
}
