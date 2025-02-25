import { ISolutionRepository } from "src/domain/repositories/solution.repository";
import { IUsersRepository } from "src/domain/repositories/user.repository";
import { Priority } from "src/domain/types/priority.type";
import { Status } from "src/domain/types/status.type";
import { NotFoundError } from "src/infrastructure/errors/not-found.error";

interface ISolutionUpdate {
    userInChargeId?: string | null;
    name?: string;
    clientDepartment?: string;
    benefit?: number | null;
    investment?: number | null;
    status?: Status;
    priority?: Priority;
    description?: string;
    justification?: string;
    orchestration?: string;
}

export class UpdateSolutionUseCases {
    constructor(
        private readonly solutionsRepository: ISolutionRepository,
        private readonly usersRepository: IUsersRepository,
    ) {}

    async execute(id: string, {
        userInChargeId,
        ...payload
    }: ISolutionUpdate) {
        const solution = await this.solutionsRepository.findById(id);

        if(!solution) {
            throw new NotFoundError("User not found");
        }
        
        if(userInChargeId) {
            const user = await this.usersRepository.findById(userInChargeId);
            if(!user) throw new NotFoundError("User to be in charge was not found");
            solution.userInChargeId = userInChargeId;
        }

        return (await this.solutionsRepository.update(id, {
            ...solution,
            ...payload
        }))!;
    }
}