/// <reference types="passport" />
import { AdminService, User } from './admin.service';
import { Request } from 'express';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    googleAuth(req: Request): Promise<void>;
    googleAuthRedirect(req: Request): {
        message: string;
        user: Express.User | undefined;
    };
    getSettings(): Promise<{
        weatherApiKey: string | undefined;
        telegramBotToken: string | undefined;
    }>;
    updateSettings(settings: any): Promise<{
        weatherApiKey: string | undefined;
        telegramBotToken: string | undefined;
    }>;
    getUsers(): Promise<User[]>;
    blockUser(userId: string): Promise<{
        message: string;
    }>;
    deleteUser(userId: string): Promise<{
        message: string;
    }>;
}
