import { IsDecimal, IsIn, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength, ValidateIf } from "class-validator";
import { Category, categoryTypes } from "src/domain/types/category.type";
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

    @IsIn(categoryTypes)
    readonly category: Category;
    
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
    @IsOptional()
    readonly benefit: number | null;
    
    @IsDecimal({ decimal_digits: "2" })
    @ValidateIf((_, value) => value !== null)
    @IsOptional()
    readonly investment: number | null;
    
    @IsIn(statusTypes)
    @IsOptional()
    readonly status: Status;
    
    @IsIn(priorityTypes)
    @IsOptional()
    readonly priority: Priority;

    @IsIn(categoryTypes)
    @IsOptional()
    readonly category: Category;
    
    @IsString()
    @IsOptional()
    readonly description: string;
    
    @IsString()
    @IsOptional()
    readonly justification: string;
    
    @IsString()
    @IsOptional()
    readonly orchestration: string;
}
