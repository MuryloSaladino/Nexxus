import { ISolutionRepository } from "src/domain/repositories/solution.repository";

export class GetAllSolutionsUseCases {
    constructor(
        private readonly solutionsRepository: ISolutionRepository,
    ) {}

    async execute(page: number = 1, size: number = 10) {
        const solutions = await this.solutionsRepository.findSummarized(page, size);

        return solutions;
    }
}