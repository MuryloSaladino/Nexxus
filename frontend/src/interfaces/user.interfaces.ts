import { BaseEntity } from "./base.interfaces"

export interface ILoginPayload {
    email: string
    password: string
}

export interface User extends BaseEntity {
	username: string
}