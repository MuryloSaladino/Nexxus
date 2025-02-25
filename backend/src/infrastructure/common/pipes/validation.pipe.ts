import { ValidationPipe } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { BadRequestError } from "src/infrastructure/errors/bad-request.error";

export const validationPipe = new ValidationPipe({
    whitelist: true,
    transform: true,
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestError(
            validationErrors.flatMap(x => Object.values(x.constraints!))
        );
    }
});
