import { SolutionModel } from "../models/solution.model";
import { IBaseRepository } from "./base.repository";

export interface ISolutionRepository extends IBaseRepository<SolutionModel> {
    findSummarized(): Promise<Omit<SolutionModel, "description" | "justification" | "orchestration">[]>
}
