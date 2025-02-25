import { ISolutionRepository } from "src/domain/repositories/solution.repository";
import { NotFoundError } from "src/infrastructure/errors/not-found.error";

export class GetSolutionUseCases {
    constructor(
        private readonly solutionsRepository: ISolutionRepository,
    ) {}

    async execute(id: string) {
        const solution = await this.solutionsRepository.findById(id);

        if(!solution) {
            throw new NotFoundError("Solution was not found");
        }
        return solution;
    }
}