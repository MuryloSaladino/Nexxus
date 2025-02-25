import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { FastifyRequest } from "fastify";
import { Observable, tap } from "rxjs";
import { LoggerService } from "src/infrastructure/services/logger/logger.service";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logger: LoggerService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest<FastifyRequest>();

        const ip = this.getIP(request);

        this.logger.log(`Incoming Request on ${request.url}`, `method=${request.method} ip=${ip}`);

        return next.handle().pipe(
            tap(() => {
                this.logger.log(
                    `End Request for ${request.url}`,
                    `method=${request.method} ip=${ip} duration=${Date.now() - now}ms`,
                );
            }),
        );
    }

    private getIP(request: FastifyRequest): string | undefined {
        let ip: string | undefined;
        const ipAddr = request.headers['x-forwarded-for'];
        if (ipAddr) {
            ip = ipAddr[ipAddr.length - 1];
        } else {
            ip = request.socket.remoteAddress;
        }
        return ip?.replace('::ffff:', '');
    }
}