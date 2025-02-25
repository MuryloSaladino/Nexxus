import { Paginated } from "../interfaces/pagination.interface";
import { SolutionModel } from "../models/solution.model";
import { IBaseRepository } from "./base.repository";

export interface ISolutionRepository extends IBaseRepository<SolutionModel> {
    findSummarized(page?: number, size?: number): 
        Promise<Paginated<Omit<SolutionModel, "description" | "justification" | "orchestration">>>
}
