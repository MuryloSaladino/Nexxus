import { IsOptional, IsString, Length, Matches } from "class-validator";

export class CreateUserDTO {

    @IsString()
    @Length(3, 20)
    readonly username: string;

    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: "Password must contain at least one uppercase letter, " + 
        "one lowercase letter, one number, and one special character",
    })
    readonly password: string;
}

export class UpdateUserDTO {

    @IsString()
    @Length(3, 20)
    @IsOptional()
    readonly username: string;

    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: "Password must contain at least one uppercase letter, " + 
        "one lowercase letter, one number, and one special character",
    })
    @IsOptional()
    readonly password: string;
}
