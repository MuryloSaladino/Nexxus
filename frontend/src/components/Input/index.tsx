import { v4 as uuid } from "uuid"
import { IInputProps, IInputType } from "./interfaces"
import InputDate from "./InputDate"
import InputText from "./InputText"
import InputPassword from "./InputPassword"
import { ElementType, forwardRef } from "react"
import InputSelect from "./InputSelect"

const InputComponents: Record<IInputType, ElementType> = {
    date: InputDate,
    text: InputText,
    email: InputText,
    password: InputPassword,
    select: InputSelect
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
    ({type = "text", id = uuid(), ...props }, ref) => {

    const Component = InputComponents[type]

    return (
        <Component ref={ref} id={id} type={type} {...props}/>
    )
})

export default Input
