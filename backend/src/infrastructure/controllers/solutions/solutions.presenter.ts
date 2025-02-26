import { ApiProperty } from "@nestjs/swagger";
import { UserPresenter } from "../users/users.presenter";
import { Status } from "src/domain/types/status.type";
import { Priority } from "src/domain/types/priority.type";
import { SolutionModel } from "src/domain/models/solution.model";
import { Category } from "src/domain/types/category.type";

export class SummarizedSolutionPresenter {
    @ApiProperty()
    readonly id: string;
    @ApiProperty()
    readonly createdAt: Date;
    @ApiProperty()
    readonly updatedAt: Date;
    @ApiProperty()
    readonly deletedAt: Date | null;
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly userInCharge: UserPresenter | null;
    @ApiProperty()
    readonly userInChargeId: string | null;
    @ApiProperty()
    readonly clientDepartment: string;
    @ApiProperty()
    readonly benefit: number | null;
    @ApiProperty()
    readonly investment: number | null;
    @ApiProperty()
    readonly status: Status;
    @ApiProperty()
    readonly priority: Priority;
    @ApiProperty()
    readonly category: Category;

    constructor(solution: Omit<SolutionModel, "description" | "justification" | "orchestration">) {
        this.id = solution.id;
        this.createdAt = solution.createdAt;
        this.updatedAt = solution.updatedAt;
        this.deletedAt = solution.deletedAt;
        this.name = solution.name;
        this.userInCharge = solution.userInCharge;
        this.userInChargeId = solution.userInChargeId;
        this.clientDepartment = solution.clientDepartment;
        this.benefit = solution.benefit;
        this.investment = solution.investment;
        this.status = solution.status;
        this.priority = solution.priority; 
        this.category = solution.category;
    }
}


export class SolutionPresenter extends SummarizedSolutionPresenter {
    @ApiProperty()
    readonly description: string;
    @ApiProperty()
    readonly justification: string;
    @ApiProperty()
    readonly orchestration: string;

    constructor(solution: SolutionModel) {
        super(solution);
        this.description = solution.description;
        this.justification = solution.justification;
        this.orchestration = solution.orchestration;
    }
}
