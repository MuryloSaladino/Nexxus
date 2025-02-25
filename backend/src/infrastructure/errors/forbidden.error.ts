import { HttpError } from "./http.error";

export class ForbiddenError extends HttpError {
    constructor(details?: string | string[]) {
        super("Forbidden", 403, details);
    }
}
