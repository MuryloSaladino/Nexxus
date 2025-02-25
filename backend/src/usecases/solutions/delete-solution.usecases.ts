import { ISolutionRepository } from "src/domain/repositories/solution.repository";

export class DeleteSolutionUseCases {
    constructor(
        private readonly solutionsRepository: ISolutionRepository,
    ) {}

    async execute(id: string) {
        await this.solutionsRepository.delete(id);
    }
}
