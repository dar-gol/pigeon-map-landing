import fs from "fs";
import path from "path";

export enum LogLevel {
  ERROR = "ERROR",
  WARN = "WARN",
  INFO = "INFO",
  DEBUG = "DEBUG",
}

interface LogContext {
  [key: string]: unknown;
}

class LoggingService {
  private logDirectory: string;
  private isServer: boolean;

  constructor() {
    this.logDirectory = path.join(process.cwd(), "logs");
    this.isServer = typeof window === "undefined";

    // Create logs directory if it doesn't exist (server-side only)
    if (this.isServer) {
      try {
        if (!fs.existsSync(this.logDirectory)) {
          fs.mkdirSync(this.logDirectory, { recursive: true });
        }
      } catch (error) {
        console.error("Failed to create logs directory:", error);
      }
    }
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    context?: LogContext
  ): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` | Context: ${JSON.stringify(context)}` : "";
    return `[${timestamp}] [${level}] ${message}${contextStr}`;
  }

  private getDateString(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  private getDatedFilename(filename: string): string {
    const dateStr = this.getDateString();
    const ext = path.extname(filename);
    const baseName = path.basename(filename, ext);
    return `${baseName}-${dateStr}${ext}`;
  }

  private writeToFile(filename: string, message: string): void {
    if (!this.isServer) return;

    try {
      const datedFilename = this.getDatedFilename(filename);
      const logFile = path.join(this.logDirectory, datedFilename);
      const formattedMessage = message + "\n";
      fs.appendFileSync(logFile, formattedMessage, "utf8");
    } catch (error) {
      console.error("Failed to write to log file:", error);
    }
  }

  private log(
    level: LogLevel,
    message: string,
    context?: LogContext,
    filename?: string
  ): void {
    const formattedMessage = this.formatMessage(level, message, context);

    // Always log to console
    switch (level) {
      case LogLevel.ERROR:
        console.error(formattedMessage);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage);
        break;
      case LogLevel.INFO:
        console.info(formattedMessage);
        break;
      case LogLevel.DEBUG:
        console.debug(formattedMessage);
        break;
    }

    // Write to file if specified and on server
    if (filename) {
      this.writeToFile(filename, formattedMessage);
    }

    // Write to general log file
    this.writeToFile("app.log", formattedMessage);
  }

  error(message: string, context?: LogContext, filename?: string): void {
    this.log(LogLevel.ERROR, message, context, filename);
  }

  warn(message: string, context?: LogContext, filename?: string): void {
    this.log(LogLevel.WARN, message, context, filename);
  }

  info(message: string, context?: LogContext, filename?: string): void {
    this.log(LogLevel.INFO, message, context, filename);
  }

  debug(message: string, context?: LogContext, filename?: string): void {
    this.log(LogLevel.DEBUG, message, context, filename);
  }

  // Specific methods for blog functionality
  blogError(message: string, context?: LogContext): void {
    this.error(`BLOG: ${message}`, context, "blog.log");
  }

  blogWarn(message: string, context?: LogContext): void {
    this.warn(`BLOG: ${message}`, context, "blog.log");
  }

  blogInfo(message: string, context?: LogContext): void {
    this.info(`BLOG: ${message}`, context, "blog.log");
  }

  blogDebug(message: string, context?: LogContext): void {
    this.debug(`BLOG: ${message}`, context, "blog.log");
  }

  // Method to get recent logs (for debugging)
  getRecentLogs(filename: string = "app.log", lines: number = 50): string[] {
    if (!this.isServer) return [];

    try {
      const datedFilename = this.getDatedFilename(filename);
      const logFile = path.join(this.logDirectory, datedFilename);

      // If today's file doesn't exist, try the base filename for backwards compatibility
      if (!fs.existsSync(logFile)) {
        const fallbackLogFile = path.join(this.logDirectory, filename);
        if (!fs.existsSync(fallbackLogFile)) return [];

        const content = fs.readFileSync(fallbackLogFile, "utf8");
        const allLines = content.split("\n").filter((line) => line.trim());
        return allLines.slice(-lines);
      }

      const content = fs.readFileSync(logFile, "utf8");
      const allLines = content.split("\n").filter((line) => line.trim());
      return allLines.slice(-lines);
    } catch (error) {
      console.error("Failed to read log file:", error);
      return [];
    }
  }

  // Method to clear old logs
  clearLogs(filename?: string): void {
    if (!this.isServer) return;

    try {
      if (filename) {
        const logFile = path.join(this.logDirectory, filename);
        if (fs.existsSync(logFile)) {
          fs.unlinkSync(logFile);
        }
      } else {
        // Clear all log files
        const files = fs.readdirSync(this.logDirectory);
        files.forEach((file) => {
          if (file.endsWith(".log")) {
            fs.unlinkSync(path.join(this.logDirectory, file));
          }
        });
      }
    } catch (error) {
      console.error("Failed to clear logs:", error);
    }
  }

  // Method to get logs for a specific date
  getLogsForDate(filename: string, date: string, lines?: number): string[] {
    if (!this.isServer) return [];

    try {
      const ext = path.extname(filename);
      const baseName = path.basename(filename, ext);
      const datedFilename = `${baseName}-${date}${ext}`;
      const logFile = path.join(this.logDirectory, datedFilename);

      if (!fs.existsSync(logFile)) return [];

      const content = fs.readFileSync(logFile, "utf8");
      const allLines = content.split("\n").filter((line) => line.trim());
      return lines ? allLines.slice(-lines) : allLines;
    } catch (error) {
      console.error("Failed to read log file for date:", error);
      return [];
    }
  }

  // Method to list all available log files
  getAvailableLogFiles(): string[] {
    if (!this.isServer) return [];

    try {
      const files = fs.readdirSync(this.logDirectory);
      return files.filter((file) => file.endsWith(".log")).sort();
    } catch (error) {
      console.error("Failed to list log files:", error);
      return [];
    }
  }

  // Method to clean old log files (older than specified days)
  cleanOldLogs(daysToKeep: number = 7): void {
    if (!this.isServer) return;

    try {
      const files = fs.readdirSync(this.logDirectory);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

      files.forEach((file) => {
        if (file.endsWith(".log")) {
          const match = file.match(/-(\d{4}-\d{2}-\d{2})\.log$/);
          if (match) {
            const fileDate = new Date(match[1]);
            if (fileDate < cutoffDate) {
              fs.unlinkSync(path.join(this.logDirectory, file));
              console.log(`Cleaned old log file: ${file}`);
            }
          }
        }
      });
    } catch (error) {
      console.error("Failed to clean old logs:", error);
    }
  }
}

// Export singleton instance
export const logger = new LoggingService();
export default LoggingService;
