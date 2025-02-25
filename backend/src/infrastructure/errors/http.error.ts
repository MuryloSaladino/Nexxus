import { IErrorFormat } from "src/domain/interfaces/errors.interface";

export class HttpError extends Error implements IErrorFormat {
    statusCode: number;
    details?: string | string[];

    constructor(message: string, status: number = 400, details?: string | string[]) {
        super(message);
        this.statusCode = status;
        this.details = details;
    }
}
