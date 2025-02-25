import { SolutionModel } from "src/domain/models/solution.model";
import { ISolutionRepository } from "src/domain/repositories/solution.repository";
import { IUsersRepository } from "src/domain/repositories/user.repository";
import { Priority } from "src/domain/types/priority.type";
import { Status } from "src/domain/types/status.type";
import { NotFoundError } from "src/infrastructure/errors/not-found.error";

interface ISolutionCreation {
    userInChargeId: string | null;
    name: string;
    clientDepartment: string;
    benefit: number | null;
    investment: number | null;
    status: Status;
    priority: Priority;
    description: string;
    justification: string;
    orchestration: string;
}

export class CreateSolutionUseCases {
    constructor(
        private readonly solutionsRepository: ISolutionRepository,
        private readonly usersRepository: IUsersRepository,
    ) {}

    async execute({
        userInChargeId,
        ...payload
    }: ISolutionCreation) {
        if(userInChargeId) {
            const user = await this.usersRepository.findById(userInChargeId);
            if(!user) throw new NotFoundError("User to be in charge was not found");
        }

        const solution = new SolutionModel();
        solution.userInChargeId = userInChargeId;
        Object.assign(solution, payload);

        return await this.solutionsRepository.create(solution);
    }
}