export declare class BannerLog {
    isLoggingEnabled: boolean;
    private console;
    private showLogs;
    constructor(isLoggingEnabled: boolean);
    error(message: string): void;
    log(message: string): void;
}
