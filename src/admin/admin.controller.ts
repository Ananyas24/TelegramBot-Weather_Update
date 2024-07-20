import { Controller, Get, Req, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService, User } from './admin.service';
import { Request } from 'express';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request) {
    return { message: 'Logged in with Google', user: req.user };
  }

  @Get('settings')
  async getSettings() {
    return this.adminService.getSettings();
  }

  @Post('settings')
  async updateSettings(@Body() settings: any) {
    return this.adminService.updateSettings(settings);
  }

  @Get('users')
  async getUsers(): Promise<User[]> {
    return this.adminService.getUsers();
  }

  @Post('users/block')
  async blockUser(@Body('userId') userId: string) {
    return this.adminService.blockUser(userId);
  }

  @Post('users/delete')
  async deleteUser(@Body('userId') userId: string) {
    return this.adminService.deleteUser(userId);
  }
}
