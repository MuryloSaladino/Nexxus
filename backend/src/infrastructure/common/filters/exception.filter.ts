import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus
} from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import { HttpError } from "src/infrastructure/errors/http.error";
import { LoggerService } from "src/infrastructure/services/logger/logger.service";


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(
        private readonly logger: LoggerService,
    ) { }

    catch(error: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();
        const request: any = ctx.getRequest<FastifyRequest>();

        const status =
            error instanceof HttpError
                ? error.statusCode
                : HttpStatus.INTERNAL_SERVER_ERROR;
        const message =
            error instanceof HttpError
                ? error.message
                : 'Internal server error';
        const details =
            error instanceof HttpError
                ? error.details
                : undefined;

        const responseData = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
            details
        };

        this.logMessage(request, message, status, error as Error);

        response.status(status).send(responseData);
    }

    private logMessage(request: any, message: string, status: number, error?: Error) {
        if (status === 500) {
            this.logger.error(
                `End Request for ${request.path}`,
                `method=${request.method} status=${status} message=${message}`,
                error?.stack
            );
        } else {
            this.logger.warn(
                `End Request for ${request.path}`,
                `method=${request.method} status=${status} message=${message}`
            );
        }
    }
}