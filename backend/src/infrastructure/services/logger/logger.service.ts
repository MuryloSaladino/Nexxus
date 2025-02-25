import { Injectable, Logger } from '@nestjs/common';
import { ILogger } from 'src/domain/services/logger.interface';

@Injectable()
export class LoggerService extends Logger implements ILogger {
    
    public debug(message: string, context?: string) {
        if (process.env.NODE_ENV !== 'prod') {
            super.debug(`[DEBUG] ${message}`, context);
        }
    }

    public log(message: string, context?: string) {
        super.log(`[INFO] ${message}`, context);
    }

    public error(message: string, context?: string, trace?: string) {
        super.error(`[ERROR] ${message}`, trace, context);
    }

    public warn(message: string, context?: string) {
        super.warn(`[WARN] ${message}`, context);
    }

    public verbose(message: string, context?: string) {
        if (process.env.NODE_ENV !== 'prod') {
            super.verbose(`[VERBOSE] ${message}`, context);
        }
    }
}