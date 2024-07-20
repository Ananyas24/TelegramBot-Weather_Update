export interface User {
    id: string;
    blocked?: boolean;
}
export declare class AdminService {
    private settings;
    private users;
    getSettings(): {
        weatherApiKey: string | undefined;
        telegramBotToken: string | undefined;
    };
    updateSettings(newSettings: any): {
        weatherApiKey: string | undefined;
        telegramBotToken: string | undefined;
    };
    getUsers(): User[];
    blockUser(userId: string): {
        message: string;
    };
    deleteUser(userId: string): {
        message: string;
    };
}
