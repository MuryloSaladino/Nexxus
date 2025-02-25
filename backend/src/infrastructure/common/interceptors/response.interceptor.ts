import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { map, Observable } from "rxjs";

export class ResponseFormat<T> {
    @ApiProperty()
    readonly isArray: boolean;
    @ApiProperty()
    readonly path: string;
    @ApiProperty()
    readonly duration: string;
    @ApiProperty()
    readonly method: string;
    @ApiProperty()
    readonly data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseFormat<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseFormat<T>> {
        const now = Date.now();
        const httpContext = context.switchToHttp();
        const { method, path } = httpContext.getRequest();

        return next.handle().pipe(
            map((data) => ({
                data,
                path,
                method,
                isArray: Array.isArray(data),
                duration: `${Date.now() - now}ms`,
            })),
        );
    }
}
