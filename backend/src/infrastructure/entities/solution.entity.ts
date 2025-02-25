import { SolutionModel } from "src/domain/models/solution.model";
import { UserModel } from "src/domain/models/user.model";
import { Priority } from "src/domain/types/priority.type";
import { Status } from "src/domain/types/status.type";
import { BaseEntity } from "./base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity("solutions")
export class Solution extends BaseEntity implements SolutionModel {

    @ManyToOne(() => User, (u) => u.solutions, { 
        cascade: true, onDelete: "SET NULL", nullable: true 
    })
    userInCharge: UserModel | null;
    
    @Column({ nullable: true })
    userInChargeId: string | null;

    @Column({ length: 50 })
    name: string;
    
    @Column({ length: 100 })
    clientDepartment: string;
    
    @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
    benefit: number | null;
    
    @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
    investment: number | null;
    
    @Column()
    status: Status;
    
    @Column()
    priority: Priority;
    
    @Column({ type: "text" })
    description: string;
    
    @Column({ type: "text" })
    justification: string;
    
    @Column({ type: "text" })
    orchestration: string;
}