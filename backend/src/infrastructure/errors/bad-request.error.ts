import { HttpError } from "./http.error";

export class BadRequestError extends HttpError {
    constructor(details?: string | string[]) {
        super("Bad Request", 400, details);
    }
}
