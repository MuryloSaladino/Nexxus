import { IsDecimal, IsIn, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength, ValidateIf } from "class-validator";
import { Priority, priorityTypes } from "src/domain/types/priority.type";
import { statusTypes, Status } from "src/domain/types/status.type";

export class CreateSolutionDTO {

    @IsUUID()
    @ValidateIf((_, value) => value !== null)
    readonly userInChargeId: string | null;

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    readonly name: string;
    
    @IsString()
    @MinLength(3)
    readonly clientDepartment: string;
    
    @IsNumber({ maxDecimalPlaces: 2 })
    @ValidateIf((_, value) => value !== null)
    readonly benefit: number | null;
    
    @IsNumber({ maxDecimalPlaces: 2 })
    @ValidateIf((_, value) => value !== null)
    readonly investment: number | null;
    
    @IsIn(statusTypes)
    readonly status: Status;
    
    @IsIn(priorityTypes)
    readonly priority: Priority;
    
    @IsString()
    readonly description: string;
    
    @IsString()
    readonly justification: string;
    
    @IsString()
    readonly orchestration: string;
}

export class UpdateSolutionDTO {

    @IsUUID()
    @ValidateIf((_, value) => value !== null)
    @IsOptional()
    readonly userInChargeId: string | null;

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @IsOptional()
    readonly name: string;
    
    @IsString()
    @MinLength(3)
    @IsOptional()
    readonly clientDepartment: string;
    
    @IsDecimal({ decimal_digits: "2" })
    @ValidateIf((_, value) => value !== null)
    readonly benefit: number | null;
    
    @IsDecimal({ decimal_digits: "2" })
    @ValidateIf((_, value) => value !== null)
    readonly investment: number | null;
    
    @IsIn(statusTypes)
    readonly status: Status;
    
    @IsIn(priorityTypes)
    readonly priority: Priority;
    
    @IsString()
    readonly description: string;
    
    @IsString()
    readonly justification: string;
    
    @IsString()
    readonly orchestration: string;
}
