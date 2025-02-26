import { BaseEntity } from "./base.interfaces";
import { User } from "./user.interfaces";


export const categoryTypes = ["AI Development", "Test Bench Development", "Smart Pairing"] as const;
export type Category = typeof categoryTypes[number];

export const priorityTypes = ["Low", "Medium", "High"] as const;
export type Priority = typeof priorityTypes[number];

export const statusTypes = ["On Going", "Completed", "Awaiting", "Idea"] as const;
export type Status = typeof statusTypes[number];


export interface SummarizedSolution extends BaseEntity {
    userInCharge: User | null;
    userInChargeId: string | null;
    name: string;
    clientDepartment: string;
    benefit: number | null;
    investment: number | null;
    category: Category;
    status: Status;
    priority: Priority;
}

export interface Solution extends SummarizedSolution {
    description: string;
    justification: string;
    orchestration: string;
}

export type SolutionCreation = Omit<Solution, keyof BaseEntity | "userInCharge">;