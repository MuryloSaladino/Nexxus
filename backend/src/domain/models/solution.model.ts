import { Priority } from "../types/priority.type";
import { Status } from "../types/status.type";
import { BaseModel } from "./base.model";
import { UserModel } from "./user.model";

export class SolutionModel extends BaseModel {
    userInCharge: UserModel | null;
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