import { Body, Controller, Get, Post, Query, Param, Patch, Delete, Req, BadRequestException } from '@nestjs/common';
import { ApiService } from './api.service';
import { UserAuthGuard } from '../auth/passport/user-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) { }

  @Get('getPost')
  @UseGuards(UserAuthGuard)
  async getPost(@Query('postId') postId: string) {

    const post = this.apiService.getPost(postId);
    if (!post) return { error: "No post with given id!" }
    else return post;
  }

  @Get('getPosts')
  @UseGuards(UserAuthGuard)
  async getPosts(@Req() req, @Query('skip') skip: number, @Query('limit') limit: number) {
    return this.apiService.getPosts(req['user'].id, skip, limit);
  }

  @Post('createPost')
  @UseGuards(UserAuthGuard)
  async createPost(@Body() _body, @Req() req) {
    const { raw, commentsEnabled, isPrivate } = _body;
    return this.apiService.createPost(raw, commentsEnabled, isPrivate, req['user'].id);
  }

  @Delete('deletePost')
  @UseGuards(UserAuthGuard)
  async deletePost(@Query('postId') postId: string) {
    return this.apiService.deletePost(postId);
  }

  @Get('getPublicPosts')
  async getPublicPosts(@Query('username') username: string, @Query('skip') skip: number, @Query('limit') limit: number) {
    const ret = await this.apiService.getPublicPosts(username, skip, limit);
    if (ret === 1) {
      throw new BadRequestException(`No user with ${username} found!`)
    }
    return ret;
  }

  
  @Get('getPublicPost')
  async getPublicPost(@Query('username') username: string, @Query('postId') postId: string) {
    const post = await this.apiService.getPublicPost(username, postId);
    if (!post) return { error: "No post with given id!" }
    if (post === 1) {
      throw new BadRequestException(`No user with ${username} found!`);
    }
    return post;
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() _body) {
    const { postData } = _body;
    return this.apiService.update(id, postData);
  }

  @Get('getPrivatePosts')
  @UseGuards(UserAuthGuard)
  async getPrivatePosts(@Query('username') username: string, @Query('skip') skip: number, @Query('limit') limit: number) {
    const ret = await this.apiService.getPrivatePosts(username, skip, limit);
    if (ret === 1) {
      throw new BadRequestException(`No user with ${username} found!`)
    }
    return ret;
  }


}
