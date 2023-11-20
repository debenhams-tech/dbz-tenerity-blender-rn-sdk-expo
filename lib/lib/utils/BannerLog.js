export class BannerLog {
    constructor(isLoggingEnabled) {
        this.isLoggingEnabled = isLoggingEnabled;
        this.console = console;
        this.showLogs = isLoggingEnabled;
    }
    error(message) {
        if (this.showLogs) {
            this.console.error(message);
        }
    }
    log(message) {
        if (this.showLogs) {
            this.console.log(message);
        }
    }
}
//# sourceMappingURL=BannerLog.js.map