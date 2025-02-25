import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserModel } from "src/domain/models/user.model";
import { Solution } from "./solution.entity";

@Entity("users")
export class User extends BaseEntity implements UserModel {

    @Column({ type: "varchar", length: 20 })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @OneToMany(() => Solution, (s) => s.userInCharge)
    solutions: Solution[];
}
