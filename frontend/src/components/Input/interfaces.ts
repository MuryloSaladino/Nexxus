import { IInputDateProps } from "./InputDate"
import { IInputTextProps } from "./InputText"
import { IInputContainerProps } from "./InputContainer"
import { IInputPasswordProps } from "./InputPassword"
import { ComponentPropsWithoutRef } from "react"
import { IInputSelectProps } from "./InputSelect"

export type IInputType = "text" | "password" | "date" | "email" | "select"

export interface IRootInputProps extends IInputContainerProps, ComponentPropsWithoutRef<'input'> {
    id?: string
    type?: IInputType
    error?: boolean
    fieldName?: string
}

export type IInputProps = IInputDateProps | IInputTextProps | IInputPasswordProps | IInputSelectProps
